const LoginService = require("../services/LoginService");
const { decodeBase64 } = require("../utils/base64");
const User = require("../services/UserService");
const config = require("config");
const jwt = require("jsonwebtoken");
const { Stream } = require("stream");

exports.login = async (req, res) => {
  console.log("want to create token");
  const headerAut = req.headers.authorization;
  if (!headerAut) {
    return res.status(401).json({ error: "authorization-header not found" });
  }

  const login = headerAut.split(" ")[1];
  const baseLogin = decodeBase64(login);
  const [email, password] = baseLogin.split(":");

  try {
    const verifiedUser = await User.getUserByEmail(email);
    if (!verifiedUser) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!verifiedUser.isVerified) {
      const token = jwt.sign({ id: verifiedUser._id.toString(), email }, config.get("session.tokenKey"), { expiresIn: '10m' });
      return res.status(403).json({ error: "Email not verified", redirect: "/verify", token });
    }

    const { token, user } = await LoginService.createSessionToken({
      email,
      password,
    });

    console.log("LoginConbtroller streak: ", user.streak);

    const userResponse = {
      id: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin,
      userName: user.userName,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      profilePicture: user.profilePicture,
      companion: user.companion,
      streak: user.streak,
      xp: user.xp,
      level: user.level,
    };

    console.log("check token in controller: ", token);
    res.header("Authorization", `Bearer ${token}`).status(200).json({
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("error while trying to create token: ", error);
    res.status(401).json({ error: "wrong ID or PW!" });
  }
};
