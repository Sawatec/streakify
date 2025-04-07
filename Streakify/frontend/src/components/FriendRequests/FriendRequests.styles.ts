import styled from 'styled-components';
import { brightGrey, mediumGreen } from '../../styles/Colors';

export const FriendRequestsContainer = styled.div`
  margin: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: ${mediumGreen};
  display: flex;
  flex-direction: column;
`;

export const FriendRequestsTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 20px;
  color: ${brightGrey};
  text-align: center;
`;

export const RequestContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${mediumGreen};
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
`;

export const UserName = styled.span`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const AcceptButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 8px;
`;

export const RejectButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #F44336;
  color: white;
  border: none;
  cursor: pointer
  `;