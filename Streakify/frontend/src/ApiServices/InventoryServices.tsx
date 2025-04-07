import mongoose from 'mongoose';

const apiUrl = process.env.REACT_APP_API_URL;

export interface InventoryItemResponse {
  _id: string;
  name: string;
  type: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

class InventoryService {
  static async getInventory(token: string): Promise<InventoryItemResponse[]> {
    try {
      const response = await fetch(`${apiUrl}/api/users/inventory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Fehler beim Abrufen des Inventars: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Verarbeite das Inventar
      return data.inventory.map((item: any) => ({
        _id: item.itemId._id,
        name: item.itemId.name,
        imageUrl: item.itemId.imageUrl,
        price: item.itemId.price,
      }));
    } catch (error) {
      console.error("Fehler beim Abrufen des Inventars:", error);
      throw error;
    }
  }  
}

export default InventoryService;
