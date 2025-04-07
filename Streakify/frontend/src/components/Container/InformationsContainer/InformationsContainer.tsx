import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store"; // Pfad anpassen, falls nötig
import Streak from "../../Streak/Streak";
import { Container, UserInfo, Username, JoinedDate, StreakContainer } from './InformationsContainer.styles'; // Importieren Sie die Styles
import UserServices, { UserResponse } from "../../../ApiServices/UserServices";

const InformationsContainer: React.FC = () => {
    // Zugriff auf den Benutzernamen und das Beitrittsdatum aus dem Redux-Store
    const userId = useSelector((state: RootState) => state.user.id);
    const [user, setUser] = useState<UserResponse | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                console.error("Benutzer nicht gefunden");
                return;
            }
            const fetchedUser = await UserServices.getUser(userId);
            setUser(fetchedUser);
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        if (user?.createdAt) {
            const date = new Date(user.createdAt); // Umwandlung in ein Date-Objekt
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            setFormattedDate(`${day}.${month}.${year}`);
        }
    }, [user]);

    if (!userId) {
        console.error("Benutzer nicht gefunden");
        return null;
    }

    return (
        <Container>
            <StreakContainer>
                <Streak />
            </StreakContainer>
            <UserInfo>
                <Username>{user ? user.userName : "Benutzername"}</Username>
                <JoinedDate>{user ? `Beigetreten am: ${formattedDate}` : "Beitrittsdatum"}</JoinedDate>
            </UserInfo>
        </Container>
    );
};

export default InformationsContainer;