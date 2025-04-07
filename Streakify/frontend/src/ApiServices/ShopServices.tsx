import { uploadImage } from "./PictureUploadServices";
import { ShopItemResponse } from "../components/Items/types"; // Typen auslagern
import { InventoryItemResponse } from "./InventoryServices";
const apiUrl = process.env.REACT_APP_API_URL;

class ShopService {
  /**
   * Generische Fetch-Methode
   */
  static async fetchApi<T>(
    endpoint: string,
    method: "GET" | "POST",
    token: string,
    body?: object
  ): Promise<T> {
    try {
      console.log(`API-Aufruf gestartet: ${method} ${endpoint}`);
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Fehler bei ${method} ${endpoint}:`, errorText);
        throw new Error(
          `API-Fehler: ${response.status} - ${
            errorText || "Unbekannter Fehler"
          }`
        );
      }

      const data: T = await response.json();
      console.log(`API-Antwort erfolgreich: ${method} ${endpoint}`, data);
      return data;
    } catch (error) {
      console.error(`Fehler bei API-Aufruf: ${method} ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Shop-Items abrufen
   */
  static async getShopItems(token: string): Promise<ShopItemResponse[]> {
    return this.fetchApi<ShopItemResponse[]>("/shop", "GET", token);
  }

  /**
   * Shop-Item kaufen
   */
  static async purchaseItem(
    itemId: string,
    token: string
  ): Promise<{ updatedPoints: number; updatedInventory: InventoryItemResponse[] }> {
    try {
      return this.fetchApi<{ updatedPoints: number; updatedInventory: InventoryItemResponse[] }>(
        "/shop/purchase",
        "POST",
        token,
        { itemId }
      );
    } catch (error: any) {
      console.error("Fehler beim Kauf eines Items:", error.message || error);
      throw new Error("Fehler beim Kauf eines Items. Bitte versuchen Sie es erneut.");
    }
  }
  

  /**
   * Neues Item erstellen
   */
  static async createItem(
    name: string,
    type: string, // Der Typ wird immer "companion" sein
    price: number,
    imageFile: File,
    description: string,
    token: string
  ): Promise<any> {
    console.log("Erstellungsdaten:", { name, type, price, description });
  
    try {
      // Bild hochladen
      const imageUrl = await uploadImage(imageFile);
      console.log("Bild erfolgreich hochgeladen. URL:", imageUrl);
  
      // API-Aufruf zum Erstellen eines neuen Items
      return this.fetchApi<any>("/shop", "POST", token, {
        name,
        type, // Typ ist immer companion
        price,
        imageUrl,
        description,
      });
    } catch (error) {
      console.error("Fehler beim Erstellen des Companions:", error);
      throw error;
    }
  }
}  

export default ShopService;
