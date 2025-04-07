import { useSelector } from "react-redux";
import { RootState } from "../store";

const apiUrl = process.env.REACT_APP_API_URL;

interface FriendRequest {
    sender: {
        userName: string;
        profilePicture: string;
    };
    receiver: {
        id: string;
        userName: string;
    };
    status: string;
}

interface Friends {
    userName: string,
    name: string,
    profilePicture: string,
    level: number
}

interface FriendsResponse {
    friends: Friends[];
}

interface FriendRequestResponse {
    requests: FriendRequest[]
}

class FriendServices {
    static async addFriend(receiverName: Record<string, any>, senderName: string, token: string): Promise<string> {
        try {
            if (receiverName.receiverName === senderName) {
                return "You can't add yourself as a friend";
            }

            const response = await fetch(`${apiUrl}/friend-requests/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Token im Header hinzufügen
                },
                body: JSON.stringify(receiverName), // Benutzername im Body der Anfrage
            });

            if (!response.ok) {
                return "Add Friend failed";
            }
            return "Friend request sent";
        } catch (error) {
            console.error('Error during adding friend:', error);
            return "An unexpected error occurred"; // Fallback bei Fehlern
        }
    }


    static async acceptFriendRequest(senderName: string, token: string): Promise<FriendRequest[]> {
        try {
            const response = await fetch(`${apiUrl}/friend-requests/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ senderName: senderName }),
            });

            if (!response.ok) {
                console.error(`accept FriendRequests failed with status: ${response.status}`);
                throw new Error('accept FriendRequests failed');
            } else {
                alert("Freundschagftsanfrage aktualisiert")
            }
            const friendRequestsResponse: FriendRequestResponse = await response.json();
            return friendRequestsResponse.requests;
        } catch (error) {
            console.error('Error during accept FriendRequests:', error);
            throw error;
        }
    }

    static async declineFriendRequest(senderName: string, token: string): Promise<FriendRequest[]> {
        try {
            const response = await fetch(`${apiUrl}/friend-requests/decline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ senderName: senderName }),
            });

            if (!response.ok) {
                console.error(`accept FriendRequests failed with status: ${response.status}`);
                throw new Error('accept FriendRequests failed');
            } else {
                alert("Freundschagftsanfrage aktualisiert")
            }
            const friendRequestsResponse: FriendRequestResponse = await response.json();
            return friendRequestsResponse.requests;
        } catch (error) {
            console.error('Error during accept FriendRequests:', error);
            throw error;
        }
    }

    static async getFriendRequests(token: string): Promise<FriendRequest[]> {
        try {
            const response = await fetch(`${apiUrl}/friend-requests/pending`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                console.error(`get FriendRequests failed with status: ${response.status}`);
                throw new Error('get FriendRequests failed');
            }
            const friendRequestsResponse: FriendRequestResponse = await response.json();
            return friendRequestsResponse.requests;
        } catch (error) {
            console.error('Error during get FriendRequests:', error);
            throw error;
        }
    }

    static async getFriends(token: string): Promise<Friends[]> {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/friends`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                console.error(`get Friends failed with status: ${response.status}`);
                throw new Error('get Friends failed');
            }
            return await response.json();
        } catch (error) {
            console.error('Error during get FriendRequests:', error);
            throw error;
        }
    }

    static async deleteFriend(friendName: string, token: string): Promise<Friends[]> {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/friend-requests/${friendName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                console.error(`delete Friend failed with status: ${response.status}`);
                throw new Error('delete Friend failed');
            }
            return await response.json();
        } catch (error) {
            console.error('Error during delete Friend:', error);
            throw error;
        }
    }






}

export default FriendServices;