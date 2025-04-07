import React, { useState, useEffect } from "react";
import { ModalContainer, Header, UserSection, Avatar, UserInfo, UserName, XP, FireIcon, Content, Title, Subtitle, Description, InfoRow, InfoLabel, InfoValue, Footer, CancelButton, ConfirmButton, Input, TextArea, Select } from "./TestModal.style";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import HabitServices from "../../ApiServices/HabitServices";
import { updateUserXP, updateUserLevel } from "../../userSlice"; // Importieren der Action zum Aktualisieren der XP

interface ModalProps {
  habit: {
    id: string;
    name: string;
    description: string;
    category: string;
    time: string;
    duration: number;
    frequency: string[];
    level: number;
    xp: number;
    streak: number; // Hinzufügen der Streak-Eigenschaft
    fulfilled: boolean; // Hinzufügen der Fulfilled-Eigenschaft
  };
  isExpanded: boolean;
  onClose: () => void;
  onDelete: () => void;
  showDeleteOptions: boolean;
  onDeleteSingle: () => void;
  onDeleteSeries: () => void;
  fetchHabits: () => void; // Hinzufügen der fetchHabits-Funktion
  onComplete: () => void; // Hinzufügen der onComplete-Funktion
}

const TestModal: React.FC<ModalProps> = ({ habit, isExpanded, onClose, onDelete, showDeleteOptions, onDeleteSingle, onDeleteSeries, fetchHabits, onComplete }) => {
  const companion = useSelector((state: RootState) => state.user.companion);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHabit, setEditedHabit] = useState({ ...habit, _id: habit.id, userId: "", durationType: "hours" as "hours" | "minutes", fulfilled: false, friends: [], runtime: 0 });
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const profilePicture = useSelector((state: RootState) => state.user.profilePicture);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [xpStats, setXpStats] = useState<{ baseXP: number, durationXP: number, habitStreakBonus: number, personalStreakBonus: number, totalXP: number } | null>(null);

  useEffect(() => {
    if (isExpanded) {
      const habitStartTime = new Date();
      const [hours, minutes] = habit.time.split(':').map(Number);
      habitStartTime.setHours(hours);
      habitStartTime.setMinutes(minutes);

      const habitEndTime = new Date(habitStartTime);
      habitEndTime.setMinutes(habitEndTime.getMinutes() + habit.duration);

      const currentTime = new Date();

      const timeDifferenceStart = (currentTime.getTime() - habitStartTime.getTime()) / (1000 * 60 * 60); // Zeitdifferenz in Stunden ab Startzeit
      const timeDifferenceEnd = (currentTime.getTime() - habitEndTime.getTime()) / (1000 * 60 * 60); // Zeitdifferenz in Stunden ab Endzeit

      console.log("Time difference from start:", timeDifferenceStart);
      console.log("Time difference from end:", timeDifferenceEnd);

      if (timeDifferenceStart >= 0 && timeDifferenceEnd <= 2 && !habit.fulfilled) {
        setShowCompleteButton(true);
      } else {
        setShowCompleteButton(false);
      }
    }
  }, [isExpanded, habit.time, habit.duration, habit.fulfilled]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "frequency") {
      setEditedHabit({ ...editedHabit, [name]: value.split(", ") });
    } else {
      setEditedHabit({ ...editedHabit, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      await HabitServices.updateHabit(editedHabit, token);
      fetchHabits(); // Liste nach dem Aktualisieren eines Habits aktualisieren
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleComplete = async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      console.log("Completing habit with id:", habit.id);
      const updatedUser = await HabitServices.completeHabit(habit.id, token);
      const xp = updatedUser.totalXP;
      dispatch(updateUserXP(updatedUser.xp)); // Aktualisieren der XP im Redux-Store
      dispatch(updateUserLevel(updatedUser.level));

      // Berechnung der XP-Statistiken
      const { baseXP, durationXP, habitStreakBonus, personalStreakBonus, totalXP } = updatedUser;

      setXpStats({ baseXP, durationXP, habitStreakBonus, personalStreakBonus, totalXP });
      setShowStats(true); // Statistiken anzeigen
      fetchHabits(); // Liste nach dem Aktualisieren eines Habits aktualisieren
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  return (
    <ModalContainer>
      <Header>
        <UserSection>
          <Avatar src={profilePicture || undefined} alt="Avatar" />
          <UserInfo>
            <UserName>{habit.name}</UserName>
            <XP>{habit.xp} xp</XP>
          </UserInfo>
        </UserSection>
        <FireIcon>🔥{habit.streak}</FireIcon>
      </Header>
      <Content>
        {showStats ? (
          <>
            <Title>Statistiken</Title>
            <InfoRow>
              <InfoLabel>Basis-XP:</InfoLabel>
              <InfoValue>{xpStats?.baseXP}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Dauer-XP:</InfoLabel>
              <InfoValue>{xpStats?.durationXP}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Habit-Streak Bonus:</InfoLabel>
              <InfoValue>{xpStats?.habitStreakBonus}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Persönlicher Streak Bonus:</InfoLabel>
              <InfoValue>{xpStats?.personalStreakBonus}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Gesamt-XP:</InfoLabel>
              <InfoValue>{xpStats?.totalXP}</InfoValue>
            </InfoRow>
            <Footer>
              <ConfirmButton onClick={onClose}>Schließen</ConfirmButton>
            </Footer>
          </>
        ) : (
          <>
            {!showDeleteOptions && !isEditing && (
              <>
                <Title>Habit Details</Title>
                <InfoRow>
                  <InfoLabel>Zeit:</InfoLabel>
                  <InfoValue>{habit.time}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Dauer:</InfoLabel>
                  <InfoValue>{habit.duration} min</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Kategorie:</InfoLabel>
                  <InfoValue>{habit.category}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Frequenz:</InfoLabel>
                  <InfoValue>{habit.frequency.join(', ')}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Beschreibung:</InfoLabel>
                  <InfoValue>{habit.description}</InfoValue>
                </InfoRow>
              </>
            )}
            {isEditing && (
              <>
                <Title>Habit Bearbeiten</Title>
                <InfoRow>
                  <InfoLabel>Name:</InfoLabel>
                  <Input name="name" value={editedHabit.name} onChange={handleEditChange} />
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Zeit:</InfoLabel>
                  <Input name="time" value={editedHabit.time} onChange={handleEditChange} />
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Dauer:</InfoLabel>
                  <Input name="duration" value={editedHabit.duration} onChange={handleEditChange} />
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Beschreibung:</InfoLabel>
                  <TextArea name="description" value={editedHabit.description} onChange={handleEditChange} />
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Kategorie:</InfoLabel>
                  <Select name="category" value={editedHabit.category} onChange={handleEditChange}>
                    <option value="Fitness">Fitness</option>
                    <option value="Achtsamkeit">Achtsamkeit</option>
                    <option value="Bildung">Bildung</option>
                    <option value="Einkaufen">Einkaufen</option>
                    <option value="Freunde">Freunde</option>
                    <option value="Gesundheit">Gesundheit</option>
                    <option value="Arbeit">Arbeit</option>
                    <option value="Hobbys">Hobbys</option>
                    <option value="Soziales">Soziales</option>
                    <option value="Selbstfürsorge">Selbstfürsorge</option>
                    <option value="Übung">Übung</option>
                    <option value="Lernen">Lernen</option>
                    <option value="Finanzen">Finanzen</option>
                    <option value="Produktivität">Produktivität</option>
                    <option value="Umwelt">Umwelt</option>
                  </Select>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Frequenz:</InfoLabel>
                  <Select name="frequency" value={editedHabit.frequency.join(', ')} onChange={handleEditChange}>
                    <option value="Täglich">Täglich</option>
                    <option value="Montag">Montag</option>
                    <option value="Dienstag">Dienstag</option>
                    <option value="Mittwoch">Mittwoch</option>
                    <option value="Donnerstag">Donnerstag</option>
                    <option value="Freitag">Freitag</option>
                    <option value="Samstag">Samstag</option>
                    <option value="Sonntag">Sonntag</option>
                  </Select>
                </InfoRow>
                <Footer>
                  <CancelButton onClick={() => setIsEditing(false)}>Abbrechen</CancelButton>
                  <ConfirmButton onClick={handleSave}>Speichern</ConfirmButton>
                </Footer>
              </>
            )}
            {showDeleteOptions && (
              <>
                <Subtitle>Wollen Sie die ganze Serie oder nur das gewählte Habit löschen?</Subtitle>
                <Footer>
                  <CancelButton onClick={onDeleteSingle}>Nur das eine Habit</CancelButton>
                  <ConfirmButton onClick={onDeleteSeries}>Ganze Serie</ConfirmButton>
                </Footer>
              </>
            )}
          </>
        )}
      </Content>
      {isExpanded && !showDeleteOptions && !isEditing && !showStats && (
        <Footer>
          <CancelButton onClick={onDelete}>Löschen</CancelButton>
          <CancelButton onClick={() => setIsEditing(true)}>Bearbeiten</CancelButton>
          {showCompleteButton && <ConfirmButton onClick={handleComplete}>Erledigt</ConfirmButton>}
        </Footer>
      )}
    </ModalContainer>
  );
}

export default TestModal;