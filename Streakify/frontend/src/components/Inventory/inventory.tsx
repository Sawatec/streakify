import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import UserServices from "../../ApiServices/UserServices";
import { RootState } from "../../store";
import { updateCompanion } from "../../userSlice";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Dunkler und transparenter Hintergrund */
  z-index: 100;
`;


const ItemImage = styled.img`
  width: 120px; /* Größerer Bildbereich */
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 2px solid #ddd; /* Leichte Umrandung */
`;

const ItemName = styled.p`
  font-size: 18px; /* Größerer Text */
  font-weight: bold;
  text-align: center;
  color: #222; /* Dunklere Textfarbe für besseren Kontrast */
  margin: 0;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%; /* Breiter für ein schöneres Layout */
  background-color: #ffffff; /* Heller Hintergrund */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4); /* Dunklere Schatten für Kontrast */
  z-index: 101;
  overflow-y: auto; /* Scrollbar aktivieren */
  border: 2px solid #333; /* Dunkler Rahmen für besseren Kontrast */
`;

const InventoryTitle = styled.h3`
  margin-bottom: 10px;
  text-align: center;
`;

const InventoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); /* Mehr Platz für jedes Item */
  gap: 20px; /* Größerer Abstand zwischen Items */
  padding: 0;
  list-style: none;
  margin: 0;
`;

const InventoryItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5; /* Leichter grauer Hintergrund */
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Schatten für Tiefe */
`;


const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

type InventoryProps = {
  items: Array<{
    _id: string;
    name: string;
    imageUrl: string;
  }>;
  onClose: () => void;
};

const Inventory: React.FC<InventoryProps> = ({ items, onClose }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const handleChangeCompanion = async (item: { _id: string; name: string; imageUrl: string }) => {
    if (token) {
      try {
        await UserServices.changeCompanion(token, item.imageUrl);
        dispatch(updateCompanion(item.imageUrl)); // Companion im Redux-Store aktualisieren
        alert(`Companion "${item.name}" wurde erfolgreich gewechselt!`);
      } catch (error) {
        console.error("Fehler beim Companion-Wechsel:", error);
        alert("Es gab ein Problem beim Wechsel des Companions. Bitte versuche es erneut.");
      }
    } else {
      alert("Kein gültiger Token gefunden. Bitte erneut einloggen.");
    }
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <CloseButton onClick={onClose}>Schließen</CloseButton>
        <InventoryTitle>Dein Inventar</InventoryTitle>
        <InventoryList>
          {items.length > 0 ? (
            items.map((item) => (
              <InventoryItem key={item._id}>
                <ItemImage src={item.imageUrl} alt={item.name} />
                <ItemName>{item.name}</ItemName>
                <button onClick={() => handleChangeCompanion(item)}>
                  Companion wechseln
                </button>
              </InventoryItem>
            ))
          ) : (
            <InventoryItem>Keine gekauften Items</InventoryItem>
          )}
        </InventoryList>
      </ModalContainer>
    </>
  );
};

export default Inventory;
