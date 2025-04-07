import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  ShopPageContainer,
  Header,
  Title,
  Stats,
  ContentContainer,
  CompanionWrapper,
  InventoryButton,
} from "./ShopPage.styles";
import ItemCarousel from "../../components/Items/ItemCarousel";
import Inventory from "../../components/Inventory/inventory";
import Companion from "../../components/Companion/Companion";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import ShopServices from "../../ApiServices/ShopServices";
import ConfirmationModal from "../../components/Items/ConfirmationModal"; // Importiere das Modal

const ShopPage: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [items, setItems] = useState<Array<any>>([]);
  const [inventoryItems, setInventoryItems] = useState<Array<any>>([]);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<{ id: string; price: number; name: string } | null>(null); // Für das Modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal-Status

  const jwt = useSelector((state: RootState) => state.user.token);

  const toggleInventory = () => {
    setIsInventoryOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!jwt) {
      window.location.href = "/login";
      return;
    }

    const fetchItems = async () => {
      try {
        const shopItems = await ShopServices.getShopItems(jwt);
        setItems(shopItems);
      } catch (error) {
        console.error("Fehler beim Abrufen der Shop-Items:", error);
        setError("Fehler beim Abrufen der Shop-Items.");
      }
    };

    const fetchInventory = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/inventory",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen des Inventars");
        }

        const data = await response.json();
        setInventoryItems(data.inventory || []);
      } catch (error) {
        console.error("Fehler beim Abrufen des Inventars:", error);
        setError("Fehler beim Abrufen des Inventars.");
      }
    };

    const fetchPoints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/points", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Punkte");
        }

        const data = await response.json();
        setPoints(data.points);
      } catch (error) {
        console.error("Fehler beim Abrufen der Punkte:", error);
        setError("Fehler beim Abrufen der Punkte.");
      }
    };

    fetchItems();
    fetchInventory();
    fetchPoints();
  }, [jwt]);

  // 🛒 **Diese Funktion öffnet das Modal vor dem Kauf**
  const confirmPurchase = (id: string, price: number, name: string) => {
    setSelectedItem({ id, price, name });
    setIsModalOpen(true);
  };

  // ✅ **Wenn der Nutzer bestätigt, wird der Kauf ausgeführt**
  const handlePurchase = async () => {
    if (!selectedItem) return;

    const { id, price, name } = selectedItem;

    if (points < price) {
      alert("Nicht genügend Punkte!");
      setIsModalOpen(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/shop/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ itemId: id }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Kauf des Items");
      }

      const data = await response.json();

      setPoints(data.updatedPoints);
      setInventoryItems(data.updatedInventory);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, owned: true } : item
        )
      );

      alert(`${name} erfolgreich gekauft!`);
    } catch (error) {
      console.error("Fehler beim Kauf des Items:", error);
      alert("Fehler beim Kauf des Items.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <ShopPageContainer>
      <Navbar />
      <Header>
        <Title>Shop</Title>
        <Link
          to="/create-item"
          style={{ textDecoration: "none", color: "blue" }}
        >
          Neues Item erstellen
        </Link>
        <Stats>Guthaben: {points} Punkte</Stats>
      </Header>
      <ContentContainer>
        <ItemCarousel
          points={points}
          items={items}
          onPurchase={confirmPurchase} // ✅ Modal vor dem Kauf öffnen
        />
      </ContentContainer>
      <InventoryButton onClick={toggleInventory}>Inventar öffnen</InventoryButton>
      {isInventoryOpen && (
        <Inventory items={inventoryItems} onClose={toggleInventory} />
      )}
      <CompanionWrapper>
        <Companion />
      </CompanionWrapper>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🛒 **Das Modal wird hier gerendert** */}
      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Möchtest du wirklich "${selectedItem?.name}" für ${selectedItem?.price} Punkte kaufen?`}
        onConfirm={handlePurchase} // ✅ Kauf erst nach Bestätigung durchführen
        onCancel={() => setIsModalOpen(false)} // ❌ Modal schließen, wenn abgebrochen wird
      />
    </ShopPageContainer>
  );
};

export default ShopPage;
