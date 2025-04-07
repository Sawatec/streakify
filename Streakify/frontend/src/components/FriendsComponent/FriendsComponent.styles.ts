import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  max-width: 100%;
  margin: 10px auto;
  flex-wrap: wrap; // Ermöglicht das Umfließen bei kleinen Bildschirmen
`;

export const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
`;

export const Name = styled.div`
  flex-grow: 1;
  font-size: 1.2em;
  margin-right: 16px;
`;

export const NameText = styled.span`
  color: #333;
`;

export const NameUsername = styled.span`
  color: #666;
  font-size: 14px;
`;

export const DeleteButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #F44336;
  color: white;
  border: none;
  cursor: pointer
  `;

export const MessageButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 8px;
`;