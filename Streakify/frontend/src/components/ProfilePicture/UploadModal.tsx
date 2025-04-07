import React, { useState } from 'react';
import { ModalButton, ModalContainer, ModalContent } from './Modal.styles';
import { uploadProfilePicture } from './ProfilePictureService';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    token: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, userId, token }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(true);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file && userId) {
            setUploading(true);
            try {
                const response = await uploadProfilePicture(file, userId, token);
                console.log(response);
            } catch (error) {
                console.error('Fehler beim Hochladen des Profilbilds:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <h3>Profilbild hochladen</h3>
                <input type="file" onChange={handleFileChange} title="Profilbild hochladen" />
                <ModalButton onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Hochladen...' : 'Hochladen'}
                </ModalButton>
                <ModalButton onClick={onClose}>Schließen</ModalButton>
            </ModalContent>
        </ModalContainer>
    );
};

export default UploadModal;