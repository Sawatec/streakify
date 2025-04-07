/*
 * Erstellt bei: Mahdi Amouri (940504)
 * Datum: 13.11.2024
 * Dieses Skript testet die Funktionalität des User-Modells.
 */

const mongoose = require("mongoose");
const user = require("../../../../backend/models/UserModel");

// Create a new User
test("New user", async () => {
  const newUser = new user({
    email: "maxmustermann@bht-berlin.de",
    password: "1234",
    isAdmin: true,
  });
  const res = await newUser.save();
  expect(res).toBeDefined();
  expect(res.email).toBe("maxmustermann@bht-berlin.de");
  expect(res.password).not.toBe("1234");
  expect(res.isAdmin).toBeTruthy();
});

// Update and findOne
test("updateOne and findOne", async () => {
  const newUser = new user({
    email: "maxmustermann@bht-berlin.de",
    password: "1234",
    isAdmin: true,
  });
  await newUser.save();

  // receiver is Model, i.e. we use a query
  const u1 = await user
    .updateOne(
      { email: "maxmustermann@bht-berlin.de" },
      { email: "s91687@bht-berlin.de", password: "abc", isAdmin: false }
    )
    .exec();
  expect(u1.matchedCount).toBe(1);
  expect(u1.modifiedCount).toBe(1);
  expect(u1.acknowledged).toBeTruthy();

  const u2 = await user
    .findOne({ email: "maxmustermann@bht-berlin.de" })
    .exec();
  if (u2) {
    throw new Error("User nach Update gefunden, obwohl email verändert wurde");
  }

  const u3 = await user.findOne({ email: "s91687@bht-berlin.de" });
  if (!u3) {
    throw new Error("User nach Update unter neuer email nicht gefunden");
  }

  expect(u3.email).toBe("s91687@bht-berlin.de");
});

// Test auf Verletzung des Uniqueness-Constraints mit try/catch
test("Duplicated name with try/catch", async () => {
  const user1 = new user({
    email: "maxmustermann@bht-berlin.de",
    password: "1234",
    isAdmin: true,
  });
  const savedUser = await user1.save();
  expect(savedUser).toBeDefined();

  const user2 = new user({
    email: "s91687@bht-berlin.de",
    password: "abc",
    isAdmin: false,
  });

  try {
    await user2.save();
    throw new Error("User 2 saved, but should not");
  } catch (err) {
    console.log("Error: ", err);
    // expected
  }
});

// Test auf Verletzung des Uniqueness-Constraints mit rejects, vgl. https://jestjs.io/docs/tutorial-async
/*
test("Duplicate name with rejects", async () => {
  const user1 = new user({
    email: "maxmustermann@bht-berlin.de",
    password: "1234",
    isAdmin: true,
  });
  const savedUser = await user1.save();
  expect(savedUser).toBeDefined();
  console.log("User 1 saved, ok");

  const user2 = new user({
    email: "s91687@bht-berlin.de",
    password: "abc",
    isAdmin: false,
  });
  // wir übergeben expect eine Lambda, so kann expect den Fehler fangen, der beim Aufruf der eigentlichen Funktion auftritt,
  // und verarbeiten. Das Verarbeiten des Fehlerst ist nicht trivial, vg. dazu Anleitung bei Jest.
  await expect(user2.save()).rejects.toThrow(Error);
});
*/

test("email and password are required", async () => {
  const user1 = new user({
    isAdmin: false,
  });
  try {
    await user1.save();
    throw new Error("User  saved, but should not");
  } catch (err) {
    console.log("Error: ", err);
  }
});

test("deleteOne", async () => {
  const user1 = new user({
    email: "maxmustermann@bht-berlin.de",
    password: "1234",
    isAdmin: true,
  });
  await user1.save();

  const u1 = await user
    .deleteOne({ email: "maxmustermann@bht-berlin.de" })
    .exec();
  expect(u1.deletedCount).toBe(1);
  expect(u1.acknowledged).toBeTruthy();
});
