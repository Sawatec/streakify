const apiUrl = process.env.REACT_APP_API_URL;
// Definiere den Typ für die Habit-Antwort
export interface HabitResponse {
    _id: string;
    userId: string;
    name: string;
    description: string;
    category: string;
    time: string;
    duration: number;
    durationType: "hours" | "minutes";
    frequency: string[];
    fulfilled: boolean;
    level: number;
    xp: number;
    friends: string[];
    runtime: number;
    streak: number;
}

class HabitServices {
    // Neue Methode zum Erstellen eines Habits
    static async createHabit(habit: Record<string, any>, token: string): Promise<HabitResponse> {
        try {
            const response = await fetch(apiUrl + "/habits", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(habit),
            });

            if (!response.ok) {
                console.error(`Create habit failed with status: ${response.status}`);
                throw new Error('Create habit failed'); // Wirf einen Fehler, wenn das Erstellen des Habits fehlschlägt
            } else {
                const data: HabitResponse = await response.json(); // Typisiere die Antwort
                return data; // Gebe die Daten zurück
            }
        } catch (error) {
            console.error('Error during habit creation:', error);
            throw error;
        }
    }

    static async getHabits(token: string): Promise<HabitResponse[]> {
        try {
            const response = await fetch(apiUrl + "/habits", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error(`Get habits failed with status: ${response.status}`);
                throw new Error('Get habits failed'); // Wirf einen Fehler, wenn das Abrufen der Habits fehlschlägt
            } else {
                const data: HabitResponse[] = await response.json(); // Typisiere die Antwort
                return data; // Gebe die Daten zurück
            }
        } catch (error) {
            console.error('Error during getting habits:', error);
            throw error;
        }
    }

    static async completeHabit(id: string, token: string | null): Promise<{ xp: number; baseXP: number, durationXP: number, habitStreakBonus: number, personalStreakBonus: number, totalXP: number, level: number }> {
        try {
            const response = await fetch(apiUrl + `/habits/${id}/complete`, {
                method: 'POST', // Sicherstellen, dass die Methode POST ist
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            if (!response.ok) {
                console.error(`Complete habit failed with status: ${response.status}`);
                throw new Error('Complete habit failed');
            }
    
            const data = await response.json();
            const { xp, baseXP, durationXP, habitStreakBonus, personalStreakBonus, totalXP, level } = data;
            return { xp, baseXP, durationXP, habitStreakBonus, personalStreakBonus, totalXP, level }; // Rückgabe der aktualisierten XP
        } catch (error) {
            console.error('Error during complete habit:', error);
            throw error;
        }
    }

    static async deleteHabit(id: string, token: string | null): Promise<boolean[]> {
        console.log("id", id)
        console.log("token", token)
        try {
            const response = await fetch(apiUrl + `/habits/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.status) {
                console.error(`delete habits failed with status: ${response.status}`);
                throw new Error('delete Habit failed');
            } else {
                console.log("Habit deleted")
                return [true];
            }
        } catch (error) {
            console.error('Error during complete habit:', error);
            throw error;
        }
    }

    static async updateHabit(habit: HabitResponse, token: string | null): Promise<number> {
        console.log("habit", habit)
        console.log("token", token)
        let id = habit._id
        console.log("id", id)
        try {
            const response = await fetch(apiUrl + `/habits/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(habit),
            });
            if (!response.ok) {
                console.error(`Update habit failed with status: ${response.status}`);
                throw new Error('Update habit failed');
            }

            console.log("response", response)
            return response.status;
        } catch (error) {
            console.error('Error during update habit:', error);
            throw error;
        }
    }
}

export default HabitServices