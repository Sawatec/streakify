import React, { useEffect, useState } from 'react';
import Modal from '../ProfilePicModal/Modal';
import { ProfilePictureContainer, ProfileImage } from './ProfilePicture.styles';
import LargeProfilePicture from "./LargeProfilePicture";
import { uploadImage } from '../../ApiServices/PictureUploadServices';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserServices from '../../ApiServices/UserServices';
import { useProfilePicture } from './useProfilePicture';

const ProfilePicture: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLargeImageOpen, setIsLargeImageOpen] = useState(false);
    const token = useSelector((state: RootState) => state.user.token);
    const userId = useSelector((state: RootState) => state.user.id);
    const [user, setUser] = useState<any>(null);
    const [profilePicture, setProfilePicture] = useProfilePicture();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeLargeImage = () => setIsLargeImageOpen(false);

    const viewProfilePicture = () => {
        setIsLargeImageOpen(true);
        closeModal();
    };

    const handleProfilePictureChange = (newPictureUrl: string) => {
        setProfilePicture(newPictureUrl);
    };

    const uploadProfilePicture = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            try {
                const imageUrl = await uploadImage(file);

                if (!user || !token) {  // Stelle sicher, dass user und token existieren
                    console.error("Fehlende Benutzerdaten oder Token.");
                    alert("Fehler: Keine Benutzerinformationen gefunden.");
                    return;
                }

                const updatedUser = await UserServices.updateUser(token, { profilePicture: imageUrl });

                if (updatedUser) {
                    handleProfilePictureChange(imageUrl); // Profilbild-URL speichern
                    alert(`Profilbild erfolgreich hochgeladen: ${imageUrl}`);
                    closeModal();
                } else {
                    console.error("Benutzerdaten konnten nicht aktualisiert werden.");
                    alert("Fehler beim Speichern des neuen Profilbilds.");
                }

            } catch (error) {
                console.error("Fehler beim Hochladen des Profilbilds:", error);
                alert("Fehler beim Hochladen des Profilbilds.");
            }
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                try {
                    const fetchedUser = await UserServices.getUser(userId);
                    if (fetchedUser) {
                        setUser(fetchedUser);
                    }
                } catch (error) {
                    console.error('Fehler beim Laden des Benutzers:', error);
                }
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <ProfilePictureContainer>
            <ProfileImage
                src={profilePicture || "default-image.jpg"} // Optional chaining verhindert Fehler, wenn user null ist
                alt="Profilbild"
                onClick={openModal}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onViewProfilePic={viewProfilePicture}
                onUploadProfilePic={uploadProfilePicture}
            />
            {isLargeImageOpen && (
                <LargeProfilePicture
                    src={profilePicture || "default-image.jpg"}
                    onClose={closeLargeImage}
                />
            )}
        </ProfilePictureContainer>
    );
};

export default ProfilePicture;
