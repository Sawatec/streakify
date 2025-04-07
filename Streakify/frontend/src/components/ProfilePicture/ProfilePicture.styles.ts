// ProfilePicture.styles.ts
import styled from 'styled-components';

export const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

export const ModalButton = styled.button`
  background-color: #FF8800;
  color: white;
  border: none;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #e67e22;
  }
`;

export const ModalCloseButton = styled.button`
  background-color: #ccc;
  color: black;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #bdc3c7;
  }
`;
