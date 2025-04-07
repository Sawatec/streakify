import React from "react";
import Item from "../../components/Items/item";
import { useItemNavigation } from "./useItemNavigation";
import { ItemType } from "./types"; // Import des korrekten Typs

type ItemCarouselProps = {
  points: number;
  items: ItemType[];
  onPurchase: (id: string, price: number, name: string) => void;
};

const ItemCarousel: React.FC<ItemCarouselProps> = ({ points, items, onPurchase }) => {
  const { navigate, getPosition } = useItemNavigation(items.length);

  console.log("ItemCarousel Items:", items); // Log: Alle Items im Carousel

  return (
    <>
      {items.map((item, index) => {
        console.log(`Prüfe Item bei Index ${index}:`, JSON.stringify(item, null, 2)); // Alle Daten des Items
        const position = getPosition(index);
  
        if (position === "hidden") return null;
  
        return (
          <Item
  key={item._id}
  item={item}
  position={position}
  isCenter={position === "center"}
  onBuy={() => {
    if (!item.owned) {
      onPurchase(item._id, item.price, item.name);
    }
  }}
  onImageClick={() =>
    position !== "center" &&
    navigate(position === "left" ? "left" : "right")
  }
  owned={item.owned} // ⚠️ Sicherstellen, dass dies existiert
/>
        );
      })}
    </>
  );
};

export default ItemCarousel;
