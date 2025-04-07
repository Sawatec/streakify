import React from "react";
import ReactDOM from "react-dom";
import { ModalContainer, ModalContent, CloseButton } from "./ImageModal.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalContainer onClick={onClose}> {/* Klick auf Hintergrund schließt Modal */}
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* Verhindert, dass Klicks auf das Bild das Modal schließen */}
        <CloseButton onClick={onClose} aria-label="Close modal">
          &times;
        </CloseButton>
        <img
          src={image}
          alt="Vergrößertes Bild"
          style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "8px" }}
        />
      </ModalContent>
    </ModalContainer>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
