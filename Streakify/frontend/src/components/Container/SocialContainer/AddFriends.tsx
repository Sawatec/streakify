import React, { useState } from 'react';
import { AddFriendsContainer, AddFriendsTitle, InputField, SearchButton, InputContainer } from './AddFriends.styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import FriendServices from '../../../ApiServices/FriendServices';

const AddFriends: React.FC = () => {
    const [userName, setUserName] = useState(
        {
            receiverName: ""
        }
    );
    const token = useSelector((state: RootState) => state.user.token);
    const senderName = useSelector((state: RootState) => state.user.name);

    const handleAddFriend = async () => {
        if (userName && token && senderName) {
            try {
                const response = await FriendServices.addFriend(userName, senderName, token); // API-Service zum Hinzufügen eines Freundes
                alert(response)
                setUserName({ receiverName: "" });
            } catch (error) {
                console.error('Fehler beim Hinzufügen des Freundes:', error);
            }
        } else {
            console.warn('Bitte geben Sie einen Benutzernamen ein.');
        }
    };

    return (
        <AddFriendsContainer>
            <AddFriendsTitle>Add Friends</AddFriendsTitle>
            <InputContainer>
                <InputField
                    type="text"
                    placeholder="Freund hinzufügen"
                    value={userName.receiverName}
                    onChange={(e) => setUserName({ receiverName: e.target.value })} // Aktualisieren des Benutzernamens
                />
                <SearchButton onClick={handleAddFriend}>
                    Suchen
                </SearchButton>
            </InputContainer>
        </AddFriendsContainer>
    );
};

export default AddFriends;