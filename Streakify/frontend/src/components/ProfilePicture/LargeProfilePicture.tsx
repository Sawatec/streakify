// LargeProfilePicture.tsx
import React from 'react';
import styled from 'styled-components';

const LargeImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LargeImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const LargeProfilePicture: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => {
  return (
    <LargeImageContainer onClick={onClose}>
      <LargeImage src={src} alt="Großes Profilbild" />
    </LargeImageContainer>
  );
};

export default LargeProfilePicture;