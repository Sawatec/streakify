import React, { useState } from 'react';
import { ManageFriendsContainer, ManageFriendsTitle } from './ManageFriends.styles';
import FriendsComponent from '../../FriendsComponent/FriendsComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import FriendServices from '../../../ApiServices/FriendServices';
import ChatComponent from '../../FriendsComponent/ChatComponent';

const ManageFriends: React.FC = () => {
    const token = useSelector((state: RootState) => state.user.token);
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

    const handleRemoveFriend = async (friendName: string) => {
        try {
            await FriendServices.deleteFriend(friendName, token!);
            console.log(`${friendName} wurde erfolgreich entfernt.`);
            alert("Freund erfolgreich entfernt");
        } catch (error) {
            console.error(`Fehler beim Entfernen von ${friendName}:`, error);
        }
    };

    const handleButtonMessage = (friendName: string) => {
        // Setzt den ausgewählten Freund, um den Chat anzuzeigen
        setSelectedFriend(friendName);
    };

    const closeChat = () => {
        setSelectedFriend(null); // Schließt den Chat, wenn auf "Schließen" geklickt wird
    };

    return (
        <ManageFriendsContainer>
            <ManageFriendsTitle>Freunde verwalten</ManageFriendsTitle>
            <table>
                <thead>
                    <tr>
                        <th>Freunde</th>
                    </tr>
                </thead>
                <tbody>
                    <FriendsComponent
                        onButtonRemove={handleRemoveFriend}
                        onButtonMessage={handleButtonMessage}
                    />
                </tbody>
            </table>

            {selectedFriend && (
                <ChatComponent friendUserName={selectedFriend} onClose={closeChat} />
            )}
        </ManageFriendsContainer>
    );
};

export default ManageFriends;
