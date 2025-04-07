import UserServices from "./UserServices";

const apiUrl = process.env.REACT_APP_API_URL;

export interface IMessage {
    senderId: string;
    recipientUserName: string;
    message: string;
}

interface IMessageResponse {
    _id: string;
    senderId: string;
    recipientUserName: string;
    message: string;
    read: boolean;
    timestamp?: string;
}

export interface UserResponse {
    id: string;
    email: string;
    isAdmin: boolean;
    userName: string;
    name: string;
    dateOfBirth: string;
    createdAt: Date;
    profilePicture: string;
    friends: string[];
    companion: string;
}

class MessageServices {

    static async checkNotifications(token: string): Promise<void> {
        try {
            const response = await fetch(`${apiUrl}/messages/notifications`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch Notifications: ${response.status}`);
            } else {
                const notifications = await response.json();
                return notifications;
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async getMessages(params: { chatUserName: string }, token: string): Promise<IMessageResponse[]> {
        try {
            const response = await fetch(`${apiUrl}/messages/${params.chatUserName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch messages: ${response.status}`);
            }

            const data: IMessageResponse[] = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    }

    //gibt true zurück, wenn ungelesene Nachrichten vom spezifischen user vorliegen
    static async getUserNotifications(chatUserName: string, token: string): Promise<boolean> {
        try {
            const messages = await this.getMessages({ chatUserName }, token);

            for (const msg of messages) {
                if (!msg.read) {
                    const userResponse = await UserServices.getUser(msg.senderId);
                    if (userResponse && userResponse.userName === chatUserName) {
                        console.log("Ungelesene Nachricht von:", chatUserName);
                        return true;
                    }
                }
            }

            console.log("Keine ungelesenen Nachrichten für:", chatUserName);
            return false;
        } catch (error) {
            console.error("Error fetching notifications:", error);
            return false;
        }
    }


    static async postMessage(message: IMessage, token: string): Promise<void> {
        try {
            const response = await fetch(`${apiUrl}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(message)
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch Messages: ${response.status}`);
            } else {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async setMessagesOnRead(messages: { _id: string }[], token: string): Promise<void> {
        try {
            const response = await fetch(`${apiUrl}/messages/read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(messages)
            });
            if (!response.ok) {
                throw new Error(`Failed to set Messages on read: ${response.status}`);
            } else {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error(error);
        }
    }



}

export default MessageServices;