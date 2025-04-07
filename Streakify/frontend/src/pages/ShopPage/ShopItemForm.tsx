import React, { useState } from "react";
import styled from "styled-components";
import ShopService from "../../ApiServices/ShopServices";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom"; // Importiere useNavigate

// Stile für die gesamte Seite
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Füllt die gesamte Seite */
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef); /* Dezentes Farbverlauf-Hintergrund */
`;

// Stil für das Formular
const FormWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 600px; /* Maximalbreite des Formulars */
  position: relative; /* Ermöglicht Positionierung des Zurück-Buttons */
`;

const BackButton = styled.button`
  position: absolute;
  top: -50px; /* Positioniere den Button oberhalb des Formulars */
  left: 0;
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const FormTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ isError: boolean }>`
  color: ${(props) => (props.isError ? "red" : "green")};
  font-weight: bold;
  text-align: center;
`;

const ShopItemForm: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const token = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate(); // React Router's useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!imageFile) {
      setMessage({ text: "Bitte ein Bild auswählen!", isError: true });
      return;
    }

    try {
      const newItem = await ShopService.createItem(
        name,
        "companion",
        price,
        imageFile,
        description,
        token!
      );

      setMessage({ text: "Companion erfolgreich erstellt!", isError: false });
      console.log("Neuer Companion:", newItem);

      // Formular zurücksetzen
      setName("");
      setPrice(0);
      setDescription("");
      setImageFile(null);
    } catch (error) {
      console.error("Fehler beim Erstellen des Companions:", error);
      setMessage({ text: "Fehler beim Erstellen des Companions.", isError: true });
    }
  };

  return (
    <PageContainer>
      <FormWrapper>
        <BackButton onClick={() => navigate(-1)}>Zurück</BackButton> {/* Zurück-Button */}
        <FormTitle>Neuen Companion erstellen</FormTitle>
        {message && <Message isError={message.isError}>{message.text}</Message>}
        <Form onSubmit={handleSubmit}>
          <Label>Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Label>Preis (in Punkten):</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <Label>Beschreibung:</Label>
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Label>Bild hochladen:</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            required
          />

          <Button type="submit">Companion erstellen</Button>
        </Form>
      </FormWrapper>
    </PageContainer>
  );
};

export default ShopItemForm;
