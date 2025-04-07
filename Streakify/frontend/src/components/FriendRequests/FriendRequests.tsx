import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
    FriendRequestsContainer,
    FriendRequestsTitle,
    RequestContainer,
    UserImage,
    UserName,
    ButtonsContainer,
    AcceptButton,
    RejectButton,
} from './FriendRequests.styles';
import FriendServices from '../../ApiServices/FriendServices';

interface FriendRequest {
    sender: {
        userName: string;
        profilePicture: string;
    };
    receiver: {
        id: string;
        userName: string;
    };
    status: string;
}

const FriendRequests: React.FC = () => {
    const token = useSelector((state: RootState) => state.user.token);
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleAccept = async (sender: string) => {
        if (!sender) {
            console.error('Sender ist leer');
            return;
        }

        if (!token) {
            console.error('Token ist leer');
            return;
        }

        try {
            await FriendServices.acceptFriendRequest(sender, token);
        } catch (error) {
            console.error('Error during accepting friend request:', error);
            alert('Fehler bei der Annahme der Freundschaftsanfrage');
        }
    }

    const handleDecline = async (sender: string) => {
        if (!sender) {
            console.error('Sender ist leer');
            return;
        }

        if (!token) {
            console.error('Token ist leer');
            return;
        }

        try {
            await FriendServices.declineFriendRequest(sender, token);
        } catch (error) {
            console.error('Error during declining friend request:', error);
            alert('Fehler bei der Ablehnen der Freundschaftsanfrage');
        }
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;

        const fetchFriendRequests = async () => {
            if (token) {
                try {
                    const requests = await FriendServices.getFriendRequests(token);
                    if (Array.isArray(requests)) {
                        setFriendRequests(requests as FriendRequest[]);
                    } else {
                        setError('Ungültige API-Antwort');
                    }
                } catch (error) {
                    setError('Fehler bei der API-Anfrage');
                }
            }
        };

        fetchFriendRequests();

        if (token) {
            intervalId = setInterval(fetchFriendRequests, 5000);
        }

        // Cleanup-Funktion
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [token]);

    if (error) {
        return <div></div>;
    }

    if (!friendRequests || friendRequests.length === 0) {
        return <div></div>;
    }

    return (
        <FriendRequestsContainer>
            <FriendRequestsTitle>Freundschaftsanfragen</FriendRequestsTitle>
            {friendRequests.map((request, index) => (
                <RequestContainer key={index}>
                    <UserImage src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} alt={request.sender.profilePicture} />
                    <UserName>{request.sender.userName}</UserName>
                    <ButtonsContainer>
                        <AcceptButton onClick={() => handleAccept(request.sender.userName)}>
                            Akzeptieren
                        </AcceptButton>
                        <RejectButton onClick={() => handleDecline(request.sender.userName)}>
                            Ablehnen
                        </RejectButton>
                    </ButtonsContainer>
                </RequestContainer>
            ))}
        </FriendRequestsContainer>
    );
};

export default FriendRequests;