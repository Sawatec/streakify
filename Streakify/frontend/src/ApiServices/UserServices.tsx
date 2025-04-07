const apiUrl = process.env.REACT_APP_API_URL;

export interface VerificationResponse {
    success?: boolean;
    message?: string;
    status: number;
    verificationCodeExpires?: number;
    token?: string; // Fügen Sie das token-Feld hinzu
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
    streak: number; // Hinzufügen der Streak-Eigenschaft
    xp: number; // Hinzufügen der XP-Eigenschaft
    level: number; // Hinzufügen der Level-Eigenschaft
}

export interface RegisterResponse {
    status: number;
    message?: string;
    token?: string;
    verificationCodeExpires?: number;
}

export interface LoginResponse {
    token: string;
    user: UserResponse;
}

class UserServices {
    static async updateUser(token: string, user: Record<string, any>): Promise<any> {
        try {
            const response = await fetch(`${apiUrl}/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                console.error(`Update user failed with status: ${response.status}`);
                return null;
            } else {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Error during updating user:', error);
            throw error;
        }
    }

    static async getUser(userId: string): Promise<UserResponse> {
        try {
          const response = await fetch(`${apiUrl}/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error(`Get user failed with status: ${response.status}`);
          } else {
            const data: UserResponse = await response.json();
            return data;
          }
        } catch (error) {
          console.error('Error during fetching user:', error);
          throw error;
        }
      }

    static async registerUser(user: Record<string, any>): Promise<RegisterResponse> {
        try {
            const response = await fetch(apiUrl + "/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                console.error(`Create user failed with status: ${response.status}`);
                const data = await response.json(); // Hole die Fehlerdaten
                return { status: response.status, message: data.message };
            } else {
                const data = await response.json();
                console.log('verificationCodeExpires:', data.verificationCodeExpires);
                localStorage.setItem("verificationToken", data.token);
                localStorage.setItem("verificationCodeExpires", data.verificationCodeExpires.toString());
                return { status: response.status, message: data.message, token: data.token, verificationCodeExpires: data.verificationCodeExpires };
            }
        } catch (error) {
            console.error('Fehler bei der Datenbankkommunikation', error);
            throw error;
        }
    }

    static async loginUser(email: string, password: string): Promise<LoginResponse> {
        try {
            const authHeader = 'Basic ' + btoa(`${email}:${password}`);

            const response = await fetch(`${apiUrl}/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw { response: { status: response.status, data: errorData } };
            }

            const data: LoginResponse = await response.json();
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    static async verifyUser(token: string): Promise<VerificationResponse> {
        try {
            const response = await fetch(`${apiUrl}/verify/${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error(`Verification failed with status: ${response.status}`);
                throw new Error('Verification failed');
            } else {
                const data: VerificationResponse = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Error during verification:', error);
            throw error;
        }
    }

    static async verifyUserWithCode(token: string, verificationCode: string): Promise<VerificationResponse> {
        try {
            console.log('send token and verification code to router in userService:', token + ' ' + verificationCode);
            const response = await fetch(`${apiUrl}/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, verificationCode }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { status: response.status, message: errorData.message };
            } else {
                return { status: response.status, success: true };
            }
        } catch (error) {
            console.error('Error during verification:', error);
            throw error;
        }
    }

    static async resendVerificationCode(token: string): Promise<VerificationResponse> {
        try {
            const response = await fetch(`${apiUrl}/resend-verification-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { status: response.status, message: data.message };
            } else {
                return { status: response.status, success: true, verificationCodeExpires: data.verificationCodeExpires, token: data.token };
            }
        } catch (error) {
            console.error('Error during resending verification code:', error);
            throw error;
        }
    }

    static async changeCompanion(token: string, companion: string) {
        try {
            const response = await UserServices.updateUser(token, { companion });
            return response;
        } catch (error) {
            console.error("Error changing companion:", error);
            throw error;
        }
    }
    
}

export default UserServices;