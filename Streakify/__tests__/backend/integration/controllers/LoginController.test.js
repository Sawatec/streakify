const request = require("supertest");
const app = require("../../../../backend/app"); // Import the app from app.js
const LoginService = require("../../../../backend/services/LoginService");

describe("LoginController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if no authorization header is provided", async () => {
    const res = await request(app).get("/api/login");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "authorization-header not found" });
  });

  it("should return 200 and a token if login is successful", async () => {
    const mockUser = {
      email: "test@example.com",
      isAdmin: false,
      userName: "Test User",
      name: "Test",
      dateOfBirth: "1990-01-01",
      comparePassword: jest.fn().mockResolvedValue(true),
    };

    jest.spyOn(LoginService, "createSessionToken").mockResolvedValue({
      token: "mockToken",
      user: mockUser,
    });

    const res = await request(app)
      .get("/api/login")
      .set(
        "Authorization",
        "Basic " + Buffer.from("testuser:password").toString("base64")
      );

    expect(res.status).toBe(200);
    expect(res.body.token).toBe("mockToken");
    expect(res.body.user).toEqual({
      email: "test@example.com",
      isAdmin: false,
      userName: "Test User",
      name: "Test",
      dateOfBirth: "1990-01-01",
    });
  });

  it("should return 401 if login fails", async () => {
    jest
      .spyOn(LoginService, "createSessionToken")
      .mockRejectedValue(new Error("wrong ID or PW!"));

    const res = await request(app)
      .get("/api/login")
      .set(
        "Authorization",
        "Basic " + Buffer.from("testuser:wrongpassword").toString("base64")
      );

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("wrong ID or PW!");
  });
});
