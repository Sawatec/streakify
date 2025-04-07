import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalImage,
  ModalDescription,
  ModalCloseButton,
} from "./item.styles";

type DescriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  description: string;
};

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
        <ModalImage src={imageUrl} alt="Item" />
        <ModalDescription>{description}</ModalDescription>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DescriptionModal;
