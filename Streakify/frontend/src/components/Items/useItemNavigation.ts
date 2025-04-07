import { useState } from "react"; // Importiere useState aus React

export const useItemNavigation = (itemsLength: number) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigate = (direction: "left" | "right") => {
    setCurrentIndex((prevIndex: number) =>
      direction === "left"
        ? (prevIndex - 1 + itemsLength) % itemsLength
        : (prevIndex + 1) % itemsLength
    );
  };

  const getPosition = (index: number): "center" | "left" | "right" | "hidden" => {
    const relativeIndex = (index - currentIndex + itemsLength) % itemsLength;
    if (relativeIndex === 0) return "center";
    if (relativeIndex === 1) return "right";
    if (relativeIndex === itemsLength - 1) return "left";
    return "hidden";
  };

  return { navigate, getPosition };
};
