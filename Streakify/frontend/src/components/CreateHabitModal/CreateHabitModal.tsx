import React, { useEffect, useCallback, useReducer } from "react";
import ReactDOM from "react-dom";
import infoIcon from "../../assets/images/Info.png";
import {
  Backdrop,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputContainer,
  Input,
  TextArea,
  Button,
  InfoIcon,
  FrequencyButton,
  FrequencyContainer,
  Select,
  DurationInputContainer,
  DurationInput,
  DurationText,
  ErrorText,
} from "./CreateHabitModal.style";
import { HabitProps } from "../../pages/DashboardPage/DashboardPage"; // Import HabitProps

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: any) => void;
  existingHabits: HabitProps[]; // Liste der bestehenden Habit-Objekte
}

interface HabitState {
  habitName: string;
  habitDescription: string;
  category: string;
  time: string;
  duration: string;
  durationType: "hours" | "minutes";
  frequency: string[];
  isFrequencyExpanded: boolean;
  nameError: boolean;
  timeError: boolean;
  categoryError: boolean;
  duplicateError: boolean; // Fehler für duplizierte Habit-Namen
}

const initialState: HabitState = {
  habitName: "",
  habitDescription: "",
  category: "",
  time: "",
  duration: "",
  durationType: "hours",
  frequency: ["Täglich"],
  isFrequencyExpanded: false,
  nameError: false,
  timeError: false,
  categoryError: false,
  duplicateError: false, // Initialisieren Sie den Fehler für duplizierte Habit-Namen
};

type Action =
  | { type: "SET_FIELD"; field: string; value: any }
  | { type: "SET_ERROR"; field: string; value: boolean }
  | { type: "RESET" };

const reducer = (state: HabitState, action: Action): HabitState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, [`${action.field}Error`]: false };
    case "SET_ERROR":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const CreateHabitModal: React.FC<CreateHabitModalProps> = ({ isOpen, onClose, onSave, existingHabits }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClose = useCallback(() => {
    dispatch({ type: "RESET" });
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      dispatch({ type: "RESET" });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleFrequencyClick = useCallback((day: string) => {
    dispatch({
      type: "SET_FIELD",
      field: "frequency",
      value: state.frequency.includes(day)
        ? state.frequency.filter((d) => d !== day).length === 0
          ? ["Täglich"]
          : state.frequency.filter((d) => d !== day)
        : state.frequency.includes("Täglich")
          ? [day]
          : [...state.frequency, day],
    });
  }, [state.frequency]);

  const handleSave = useCallback(() => {
    let valid = true;

    if (!state.habitName) {
      dispatch({ type: "SET_ERROR", field: "nameError", value: true });
      valid = false;
    }

    if (!state.time) {
      dispatch({ type: "SET_ERROR", field: "timeError", value: true });
      valid = false;
    }

    if (!state.category) {
      dispatch({ type: "SET_ERROR", field: "categoryError", value: true });
      valid = false;
    }

    if (existingHabits.some(habit => habit.name === state.habitName)) {
      dispatch({ type: "SET_ERROR", field: "duplicateError", value: true });
      valid = false;
    }

    // Überprüfung auf Zeitüberschneidungen
    const overlappingHabit = existingHabits.find(habit => {
      const habitDays = habit.frequency;
      const commonDays = state.frequency.filter(day => habitDays.includes(day));
      return commonDays.length > 0 && habit.time === state.time;
    });

    if (overlappingHabit) {
      dispatch({ type: "SET_ERROR", field: "timeError", value: true });
      alert(`Das Habit überschneidet sich mit einem bestehenden Habit an den Tagen: ${overlappingHabit.frequency.join(', ')}`);
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Konvertieren der Dauer basierend auf der ausgewählten Einheit
    const durationInMinutes = state.durationType === "hours" ? parseInt(state.duration) * 60 : parseInt(state.duration);

    const habit = {
      name: state.habitName,
      description: state.habitDescription,
      category: state.category,
      time: state.time, // Speichern Sie die Zeit als String
      duration: durationInMinutes, // Speichern Sie die Dauer in Minuten
      durationType: state.durationType,
      frequency: state.frequency,
    };
    onSave(habit);
    handleClose();
  }, [state, onSave, handleClose, existingHabits]);

  const handleInputChange = (field: string, value: any) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Backdrop onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Neues Habit erstellen</h2>
        </ModalHeader>
        <ModalBody>
          <InputContainer>
            <Input
              value={state.habitName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("habitName", e.target.value);
                dispatch({ type: "SET_ERROR", field: "nameError", value: false });
                dispatch({ type: "SET_ERROR", field: "duplicateError", value: false });
              }}
              placeholder="Benenne dein Habit"
              $hasError={state.nameError || state.duplicateError}
            />
            {state.nameError && <ErrorText>Name ist erforderlich</ErrorText>}
            {state.duplicateError && <ErrorText>Ein Habit mit diesem Namen existiert bereits</ErrorText>}
          </InputContainer>
          <InputContainer>
            <TextArea
              value={state.habitDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange("habitDescription", e.target.value)
              }
              placeholder="Beschreibe dein Habit"
            />
          </InputContainer>
          <InputContainer>
            <Select
              value={state.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleInputChange("category", e.target.value);
                dispatch({ type: "SET_ERROR", field: "categoryError", value: false });
              }}
              $hasError={state.categoryError}
            >
              <option value="" disabled hidden>-- Wähle eine Kategorie --</option>
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
            {state.categoryError && <ErrorText>Kategorie ist erforderlich</ErrorText>}
            <InfoIcon src={infoIcon} alt="Info" title="Wähle eine Kategorie für dein Habit." />
          </InputContainer>
          <InputContainer>
            <Input
              type="time"
              value={state.time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("time", e.target.value);
                dispatch({ type: "SET_ERROR", field: "timeError", value: false });
              }}
              placeholder="Gib die Zeit an, zu der dein Habit beginnen soll"
              $hasError={state.timeError}
            />
            {state.timeError && <ErrorText>Zeit ist erforderlich</ErrorText>}
            <InfoIcon src={infoIcon} alt="Info" title="Gib die Zeit an, zu der dein Habit beginnen soll." />
          </InputContainer>
          <InputContainer>
            <DurationInputContainer>
              <DurationInput
                type="number"
                value={state.duration}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("duration", e.target.value)
                }
                placeholder="z.B. 2"
              />
              <DurationText
                onClick={() => handleInputChange("durationType", "hours")}
                $active={state.durationType === "hours"}
              >
                h
              </DurationText>
              <span>/</span>
              <DurationText
                onClick={() => handleInputChange("durationType", "minutes")}
                $active={state.durationType === "minutes"}
              >
                min
              </DurationText>
            </DurationInputContainer>
            <InfoIcon src={infoIcon} alt="Info" title="Gib die Dauer deines Habits an." />
          </InputContainer>
          <FrequencyContainer>
            <FrequencyButton
              onClick={() => handleInputChange("isFrequencyExpanded", !state.isFrequencyExpanded)}
              $active={!state.isFrequencyExpanded} // Verwenden Sie das $-Präfix für transient props
            >
              Täglich
            </FrequencyButton>
            {state.isFrequencyExpanded &&
              ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"].map(
                (day) => (
                  <FrequencyButton
                    key={day}
                    onClick={() => handleFrequencyClick(day)}
                    $active={state.frequency.includes(day)} // Verwenden Sie das $-Präfix für transient props
                  >
                    {day}
                  </FrequencyButton>
                )
              )}
          </FrequencyContainer>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Habit speichern!</Button>
        </ModalFooter>
      </ModalContainer>
    </Backdrop>,
    document.getElementById("modal-root")!
  );
};

export default CreateHabitModal;