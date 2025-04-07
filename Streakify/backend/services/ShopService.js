const ShopItem = require("../models/ShopItemModel");
const User = require("../models/UserModel");

class ShopService {
  static async getShopItems(userId) {
    try {
      const items = await ShopItem.find().sort({ price: 1 });
  
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("Benutzer nicht gefunden.");
      }
  
      const itemsWithOwnership = items.map((item) => ({
        ...item.toObject(),
        owned: user.inventory.some((invItem) => invItem.itemId.toString() === item._id.toString()),
      }));
  
      return itemsWithOwnership;
    } catch (err) {
      console.error("Fehler beim Abrufen der Shop-Items:", err);
      throw new Error("Fehler beim Abrufen der Shop-Items");
    }
  }
  
  
  static async buyShopItem(userId, itemId) {
    const item = await ShopItem.findById(itemId);
    if (!item) {
      throw new Error("Item nicht gefunden.");
    }
  
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Benutzer nicht gefunden.");
    }
  
    if (user.points < item.price) {
      throw new Error("Nicht genügend Punkte.");
    }
  
    const itemExists = user.inventory.some(
      (inventoryItem) => inventoryItem.itemId.toString() === itemId
    );
    if (itemExists) {
      throw new Error("Item befindet sich bereits im Inventar.");
    }
  
    user.points -= item.price;
  
    // Hinzufügen der vollständigen Daten zum Inventar
    const inventoryItem = {
      itemId: item._id,
      name: item.name,
      imageUrl: item.imageUrl,
    };
    user.inventory.push(inventoryItem);
  
    await user.save();
    console.log("Item hinzugefügt. Neues Inventar:", user.inventory);
  
    return {
      updatedPoints: user.points,
      updatedInventory: user.inventory,
    };
  }
  
  
  
  }
  
  


module.exports = ShopService;
