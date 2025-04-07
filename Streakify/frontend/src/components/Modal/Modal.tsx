import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Backdrop, ModalContent, CloseButton, ActionButton } from "./Modal.style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }

  return ReactDOM.createPortal(
    <Backdrop onClick={handleClose} isClosing={isClosing} role="dialog" aria-modal="true">
      <ModalContent onClick={(e) => e.stopPropagation()} isClosing={isClosing}>
        {children}
        <CloseButton onClick={handleClose} aria-label="Close modal">×</CloseButton>
      </ModalContent>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;