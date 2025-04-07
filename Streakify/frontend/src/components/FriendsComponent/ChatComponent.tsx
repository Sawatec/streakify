import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MessageServices from '../../ApiServices/MessageServices';
import { ChatContainer, CloseButton, Header, InputContainer, MessageBubble, Message, MessageInput, MessageList, MessageMeta, SendButton, Title } from './ChatComponent.styles';

interface ChatComponentProps {
    friendUserName: string;
    onClose: () => void;
}

interface IMessageResponse {
    _id: string,
    senderId: string;
    recipientUserName: string;
    message: string;
    read: boolean;
    timestamp?: string;
}

interface IMessage {
    senderId: string;
    recipientUserName: string;
    message: string;
    timestamp: Date;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ friendUserName, onClose }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const token = useSelector((state: RootState) => state.user.token);
    const currentUserId = useSelector((state: RootState) => state.user.id);

    useEffect(() => {
        if (!token) return;

        const loadMessages = async () => {
            try {
                const fetchedMessages = await MessageServices.getMessages(
                    { chatUserName: friendUserName },
                    token
                );
                if (!fetchedMessages) {
                    console.error("Fehler: fetchedMessages ist undefined oder null.");
                    return;
                }

                const convertedMessages = fetchedMessages.map(msg => ({
                    senderId: msg.senderId,
                    recipientUserName: msg.recipientUserName,
                    message: msg.message,
                    timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
                }));

                setNewMessagesToRead(fetchedMessages);
                setMessages(convertedMessages);
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        };

        loadMessages();

        const interval = setInterval(() => {
            loadMessages();
        }, 5000);

        return () => clearInterval(interval);
    }, [friendUserName, token]);


    const handleSendMessage = useCallback(async () => {
        if (!newMessage.trim() || !currentUserId || !token) return;

        const message: IMessage = {
            senderId: currentUserId,
            recipientUserName: friendUserName,
            message: newMessage,
            timestamp: new Date(),
        };

        try {
            await MessageServices.postMessage(message, token);
            setNewMessage('');

            const updatedMessages = await MessageServices.getMessages(
                { chatUserName: friendUserName },
                token
            );

            const convertedMessages = updatedMessages.map(msg => ({
                senderId: msg.senderId,
                recipientUserName: msg.recipientUserName,
                message: msg.message,
                timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
            }));

            setMessages(convertedMessages);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, [newMessage, currentUserId, friendUserName, token]);

    const setNewMessagesToRead = async (fetchedMessages: IMessageResponse[]) => {
        const readMessages = fetchedMessages
            .filter((message) => message.read === false)
            .map((message) => ({ _id: message._id }));

        if (readMessages.length > 0) {
            await MessageServices.setMessagesOnRead(readMessages, token!);
        } else {
            console.log("Keine Nachrichten zum Aktualisieren gefunden.");
        }
    };

    return (
        <ChatContainer>
            <Header>
                <Title>Chat with {friendUserName}</Title>
                <CloseButton onClick={onClose}>×</CloseButton>
            </Header>

            <MessageList>
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={`${index}-${msg.senderId}`}
                        isCurrentUser={msg.senderId === currentUserId}
                    >
                        <Message>{msg.message}</Message>
                        {msg.timestamp && (
                            <MessageMeta>
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </MessageMeta>
                        )}
                    </MessageBubble>
                ))}
            </MessageList>

            <InputContainer>
                <MessageInput
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <SendButton onClick={handleSendMessage}>
                    Send
                </SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default ChatComponent;
