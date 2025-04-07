import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ItemCard,
  ItemName,
  ItemImageContainer,
  ItemImage,
  ItemPrice,
  BuyButton,
  DescriptionButton,
} from "./item.styles";
import { ItemType } from "./types";
import DescriptionModal from "./DescriptionModal"; // Importiere den Modal

type ItemProps = {
  item: ItemType;
  position: "center" | "left" | "right";
  isCenter: boolean;
  onBuy: () => void;
  onImageClick?: () => void;
  owned?: boolean; // ✅ Neu hinzugefügt
};

const Item: React.FC<ItemProps> = ({
  item,
  position,
  isCenter,
  onBuy,
  onImageClick,
  owned, // ✅ Jetzt verfügbar
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getPositionStyle = (pos: "center" | "left" | "right") => {
    if (pos === "center") return { x: 0, scale: 1.2, opacity: 1 };
    if (pos === "left") return { x: -300, scale: 0.95, opacity: 0.7 };
    if (pos === "right") return { x: 300, scale: 0.95, opacity: 0.7 };
    return { x: 0, scale: 1, opacity: 1 };
  };

  return (
    <>
      <motion.div
        animate={getPositionStyle(position)}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: position === "center" ? 2 : 1,
          cursor: position === "center" ? "default" : "pointer",
        }}
        onClick={position !== "center" && onImageClick ? onImageClick : undefined}
      >
        <ItemCard>
          <ItemName>{item.name}</ItemName>
          <ItemImageContainer>
            <ItemImage src={item.imageUrl} alt={`Bild von ${item.name}`} />
          </ItemImageContainer>
          <DescriptionButton onClick={toggleModal}>
            Beschreibung anzeigen
          </DescriptionButton>
          <ItemPrice>Preis: {item.price} Punkte</ItemPrice>

          {position === "center" && (
            <BuyButton onClick={onBuy} isCenter={isCenter} owned={owned}>
            {owned ? "Bereits gekauft" : "Jetzt kaufen"}
          </BuyButton>
          )}
        </ItemCard>
      </motion.div>

      <DescriptionModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        imageUrl={item.imageUrl}
        description={item.description}
      />
    </>
  );
};

export default Item;
