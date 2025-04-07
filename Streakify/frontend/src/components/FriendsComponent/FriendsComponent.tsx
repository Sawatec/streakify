import React, { useEffect, useState } from 'react';
import { Container, Image, Name, DeleteButton, MessageButton } from './FriendsComponent.styles';
import { UserName } from '../FriendRequests/FriendRequests.styles';
import FriendServices from '../../ApiServices/FriendServices';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MessageServices from '../../ApiServices/MessageServices';

interface FriendsComponentProps {
    onButtonRemove: (friendName: string) => void;
    onButtonMessage: (friendName: string) => void;
}

interface Friends {
    userName: string;
    name: string;
    profilePicture: string;
    level: number;
}

const FriendsComponent: React.FC<FriendsComponentProps> = ({ onButtonRemove, onButtonMessage }) => {
    const [friends, setFriends] = useState<Friends[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: boolean }>({});
    const token = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const friendsResponse = await FriendServices.getFriends(token!);
                if (Array.isArray(friendsResponse)) {
                    setFriends(friendsResponse);
                    checkUnreadMessages(friendsResponse);
                } else {
                    console.error('Unexpected response format:', friendsResponse);
                    setFriends([]);
                }
            } catch (error) {
                console.error('Error during fetching friends:', error);
                setFriends([]);
            }
        };

        const checkUnreadMessages = async (friendsList: Friends[]) => {
            const notifications: { [key: string]: boolean } = {};
            for (const friend of friendsList) {
                try {
                    const hasUnread = await MessageServices.getUserNotifications(friend.userName, token!);
                    notifications[friend.userName] = hasUnread;
                } catch (error) {
                    console.error(`Error fetching notifications for ${friend.userName}:`, error);
                }
            }
            setUnreadMessages(notifications);
        };

        fetchFriends();
        const interval = setInterval(fetchFriends, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [token]);

    return (
        <>
            {friends.map((friend) => (
                <Container key={friend.userName}>
                    <Image src={friend.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} alt={friend.userName} />
                    <Name>
                        {friend.name} {unreadMessages[friend.userName] && <span>🟡</span>}
                    </Name>
                    <UserName>@{friend.userName}</UserName>
                    <MessageButton onClick={() => onButtonMessage(friend.userName)}>Nachricht</MessageButton>
                    <DeleteButton onClick={() => onButtonRemove(friend.userName)}>Entfernen</DeleteButton>
                </Container>
            ))}
        </>
    );
};

export default FriendsComponent;
