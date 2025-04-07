const User = require("../models/UserModel");
const ShopItem = require("../models/ShopItemModel");
const { checkProgress } = require("../services/UserMissionService");

// get all users
async function getAllUsers() {
  try {
    const users = await User.find();
    console.log("All users: ", users);
    return users;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id).populate("inventory.itemId").populate("habits");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
}

// get user by Email
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.error("Error finding user by email: ", error);
    throw error;
  }
}

// get user by UserName
async function getUserByUserName(userName) {
  try {
    const user = await User.findOne({ userName: userName }).populate("inventory.itemId");
    return user;
  } catch (error) {
    console.error("Error finding user by username: ", error);
    throw error;
  }
}

// get specific item from user's inventory
async function getUserItemByName(userName, itemName) {
  try {
    const user = await getUserByUserName(userName);
    if (!user) throw new Error("User not found");

    const item = user.inventory.find((ownedItem) => ownedItem.itemId.name === itemName);
    if (!item) throw new Error(`Item "${itemName}" not found in user's inventory`);

    return item;
  } catch (err) {
    console.error("Error retrieving user item:", err.message);
    throw err;
  }
}

// create a new user
async function createUser(userContent) {
  try {
    const newUser = await User.create(userContent);
    console.log("User created: ", newUser);
    return newUser;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
}

// update a user by ID
async function updateUserById(id, userContent) {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, userContent, { new: true });
    if (!updatedUser) {
      console.log("User not found");
      return null;
    }
    console.log("User updated: ", updatedUser);
    return updatedUser;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
}

// delete a user by Email
async function deleteUserByID(email) {
  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      console.log("User not found");
      return null;
    }
    console.log("User deleted: ", deletedUser);
    return deletedUser;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
}

// update XP and level

async function updateUserLevelAndXP(email, xpToAdd) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return null;
    }

    user.xp += xpToAdd;

    let level = 1;
    let requiredXP = 1;
    let totalXP = user.xp;

    while (totalXP >= requiredXP) {
      totalXP -= requiredXP;
      level++;
      requiredXP += 2;
    }

    user.level = level;

    const updatedUser = await user.save();

    // Fortschritt für XP-Missionen prüfen
    const missionResult = await checkProgress(user._id, "xp", xpToAdd);

    console.log("User level and XP updated: ", updatedUser);
    return { updatedUser, missionResult };
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
}


async function getAllUsernames() {
  try {
    const users = await User.find({}, "userName");
    const usernames = users.map((user) => user.userName);
    console.log("All usernames: ", usernames);
    return usernames;
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error("Fehler beim Abrufen der Benutzernamen.");
  }
}

async function searchUserByUsername(userName) {
  try {
    const user = await User.findOne({ userName }).populate("inventory.itemId");
    if (!user) {
      throw new Error(`Benutzer mit dem Benutzernamen "${userName}" nicht gefunden.`);
    }
    return user;
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error("Fehler beim Suchen des Benutzers.");
  }
}


async function getCurrentUser(id) {
  try {
    // Benutze die vorhandene Funktion, um den Benutzer anhand der ID zu finden
    const user = await getUserById(id);
    if (!user) {
      throw new Error("Benutzer nicht gefunden");
    }
    return user;
  } catch (error) {
    console.error("Error retrieving current user:", error.message);
    throw error;
  }
}
// Add an item to user's inventory
async function addItemToInventory(userId, itemId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the item already exists in the inventory
    const existingItem = user.inventory.find((inventoryItem) => inventoryItem.itemId.toString() === itemId);
    if (existingItem) {
      throw new Error("Item is already in the inventory");
    }

    // Add the new item
    user.inventory.push({ itemId });
    const updatedUser = await user.save();

    console.log(`Item ${itemId} added to inventory for user ${userId}`);
    return updatedUser;
  } catch (error) {
    console.error("Error adding item to inventory:", error.message);
    throw error;
  }
}

// Get all items in user's inventory
async function getInventoryItems(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    console.log(`Inventory for user ${userId}:`, user.inventory);
    return user.inventory; // Kein populate nötig
  } catch (error) {
    console.error("Error retrieving inventory items:", error.message);
    throw error;
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUserName,
  getUserItemByName,
  createUser,
  updateUserById,
  deleteUserByID,
  updateUserLevelAndXP,
  getAllUsernames,
  searchUserByUsername,
  getCurrentUser,
  getInventoryItems,
  addItemToInventory
};
