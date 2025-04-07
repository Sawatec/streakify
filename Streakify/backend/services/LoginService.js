const jwt = require("jsonwebtoken");
const userService = require("../services/UserService");
const config = require('config');

async function createSessionToken(props) {
  console.log(config);
  console.log("authenticationService: create token");

  if (!props) {
    throw new Error("json body missing");
  }
  try {
    console.log(
      `attempting to authenticate userID: ${props.email}, password: ${props.password}`
    );

    const user = await userService.getUserByEmail(props.email);

    if (!user) {
      throw new Error("user not found");
    }

    const isMatch = await user.validatePassword(props.password);
    if (!isMatch) {
      throw new Error("password is invalid");
    }

    const issuedAt = new Date().getTime();
    const expirationTime = config.get("session.timeout");
    const expiresAt = issuedAt + expirationTime * 1000;
    const privateKey = config.get("session.tokenKey");
    const token = jwt.sign(
      {
        user: {
          id: user._id.toString(), 
          email: user.email,
          isAdmin: user.isAdmin,
          userName: user.userName,
          name: user.name,
          dateOfBirth: user.dateOfBirth,
        },
      },
      privateKey,
      {
        expiresIn: expirationTime,
      }
    );
    console.log("-------------------------user ID: ", user.id);
    console.log("token created: ", token);
    return { token, user };
  } catch (error) {
    console.error("error while trying to create token: ", error);
    throw new Error("authentication failed");
  }
}

module.exports = { createSessionToken };