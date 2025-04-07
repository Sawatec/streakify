export type ItemType = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  owned?: boolean;
  description: string; // Beschreibung hinzufügen
};

  
  export type InventoryItemType = {
    _id: number;
    name: string;
    quantity: number;
  };
  
  export interface ShopItemResponse {
    _id: any;
    type: any;
    id: string; // Eindeutige ID des Items
    name: string; // Name des Items
    price: number; // Preis des Items
    imageUrl: string; // Bild-URL des Items
    isAvailable: boolean; // Verfügbarkeit des Items im Shop
  }