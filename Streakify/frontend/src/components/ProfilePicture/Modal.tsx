import React from 'react';
import { ModalButton, ModalContainer, ModalContent } from './Modal.styles';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onViewProfilePic: () => void;
    // Entferne die onUploadProfilePic Prop, wenn sie nicht benötigt wird
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onViewProfilePic }) => {
    // Modal-Inhalt hier
    return (
        <ModalContainer>
            <ModalContent>
                <h3>Wählen Sie eine Option</h3>
                <ModalButton onClick={onViewProfilePic}>Profilbild anzeigen</ModalButton>
                <ModalButton onClick={() => alert("Profilbild hochladen")}>Profilbild hochladen</ModalButton>
                <ModalButton onClick={onClose}>Schließen</ModalButton>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;