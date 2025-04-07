const request = require("supertest");
const app = require('../../../../backend/app'); // Achte darauf, dass du den richtigen Pfad zu deiner app.js verwendest
const User = require("../../../../backend/models/UserModel");

describe("POST /register with additional tests", () => {
  it("should return an error if the email is already in use", async () => {
    const existingUser = new User({
      email: "existinguser@example.com",
      password: "password123",
    });
    await existingUser.save();

    const newUser = {
      email: "existinguser@example.com", // Gleiche E-Mail wie die des bereits existierenden Nutzers
      password: "password123",
    };

    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400); // Erwarte, dass der Statuscode 400 ist
    expect(response.body.message).toBe("Es existiert bereits ein User mit dieser Email");
  });

  it("should successfully register a new user", async () => {
    const newUser = {
      email: "newuser@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201); // Erwarte, dass der Statuscode 201 ist
    expect(response.body.user.email).toBe(newUser.email);
  });
});


describe("POST /register", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should return an error if the email is already in use", async () => {
    const existingUser = new User({
      email: "existinguser@example.com",
      password: "password123",
    });
    await existingUser.save();

    const newUser = {
      email: "existinguser@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Es existiert bereits ein User mit dieser Email");
  });

  it("should successfully register a new user", async () => {
    const newUser = {
      email: "newuser@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe(newUser.email);
  });

  it("should return an error if email is missing", async () => {
    const newUser = {
      password: "password123",
    };

    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email und Passwort sind erforderlich");
  });

  it("should return an error if password is missing", async () => {
    const newUser = {
      email: "newuser@example.com",
    };

    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email und Passwort sind erforderlich");
  });

  it("should register a user with optional fields", async () => {
    const newUser = {
      email: "newuser@example.com",
      password: "password123",
      isAdmin: true,
      userName: "newuser",
      name: "New User",
      dateOfBirth: "1990-01-01",
      profilePicture: "profile.jpg"
    };

    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe(newUser.email);
    expect(response.body.user.isAdmin).toBe(newUser.isAdmin);
    expect(response.body.user.userName).toBe(newUser.userName);
    expect(response.body.user.name).toBe(newUser.name);
    expect(response.body.user.dateOfBirth).toBe(newUser.dateOfBirth);
    expect(response.body.user.profilePicture).toBe(newUser.profilePicture);
  });
});
