import styled from 'styled-components';
import {
  darkBackgroundGreen,
  mediumGreen,
  highlightGreen,
  brightAccentGreen,
  primaryOrange,
  darkOrange,
  brightGrey
} from '../../styles/Colors';

export const ChatContainer = styled.div`
  margin: 20px;
  border-radius: 8px; 
  border: 2px solid ${highlightGreen};
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  /* Breite */
  width: calc(100% - 40px); 
  max-width: 40vw; 

  /* Höhe */
  max-height: 50vh; 
  height: auto; 

  /* Positionierung */
  position: fixed;
  bottom: 30px;
  right: 30px;
  overflow-y: auto; 
`;


export const Header = styled.div`
  padding: 14px;
  background: ${darkBackgroundGreen};
  border-bottom: 2px solid ${highlightGreen};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${brightGrey};
`;

export const CloseButton = styled.button`
  background: ${primaryOrange};
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${darkOrange};
    transform: scale(1.1);
  }
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background: ${darkBackgroundGreen};
`;

export const MessageBubble = styled.div.attrs<{ isCurrentUser: boolean }>(
  (props) => ({
    className: props.isCurrentUser ? "current-user" : "other-user",
  })
)`
  background: ${({ isCurrentUser }) =>
    isCurrentUser ? primaryOrange : highlightGreen};
  color: white;
  border-radius: 15px;
  padding: 10px 15px;
  margin-bottom: 12px;
  max-width: 50%;
  align-self: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
  word-break: break-word;
  animation: fadeIn 0.3s ease-in;

  margin-left: ${({ isCurrentUser }) => (isCurrentUser ? "auto" : "0")};
  margin-right: ${({ isCurrentUser }) => (isCurrentUser ? "0" : "auto")};
`;

export const Message = styled.div`
  font-size: 0.95rem;
  line-height: 1.4;
`;

export const MessageMeta = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  margin-top: 6px;
  text-align: right;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  background: ${mediumGreen};
  border-top: 2px solid ${highlightGreen};
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 2px solid ${highlightGreen};
  border-radius: 25px;
  margin-right: 10px;
  background: ${brightGrey};
  color: ${darkBackgroundGreen};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${brightAccentGreen};
    box-shadow: 0 0 5px ${brightAccentGreen};
  }
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  background: ${primaryOrange};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${darkOrange};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;