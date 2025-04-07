const apiUrl = process.env.REACT_APP_API_URL;
export interface MissionResponse {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}
class MissionService {
    static async getMissions(token: string): Promise<MissionResponse[]> {
        try {
            const response = await fetch(`${apiUrl}/missions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Missionen");
            }

            const data: MissionResponse[] = await response.json();
            return data;
        } catch (error) {
            console.error("Fehler beim Abrufen der Missionen:", error);
            throw error;
        }
    }

    static async getActiveMissions(token: string): Promise<MissionResponse[]> {
        try {
            const response = await fetch(`${apiUrl}/missions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Missionen");
            }

            const data: MissionResponse[] = await response.json();

            // Filtere nur aktive Missionen (completed: false)
            return data.filter((mission) => !mission.completed);
        } catch (error) {
            console.error("Fehler beim Abrufen der Missionen:", error);
            throw error;
        }
    }
}

export default MissionService