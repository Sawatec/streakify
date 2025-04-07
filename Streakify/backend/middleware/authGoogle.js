const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../models/UserModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/google/callback", // Ensure the callback URL is correct
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user); // User found, return the user
        } else {
          // Create a new user if not found
          user = new User({
            googleId: profile.id,
            password: "12345678",
            email: profile.emails[0].value,
            name: profile.displayName,
            profilePicture: profile.photos ? profile.photos[0].value : null,
            userName: profile.displayName,
          });

          // Save the user to the database
          await user.save();
          return done(null, user); // Return the newly created user
        }
      } catch (err) {
        return done(err); // Handle errors
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user by ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Deserialize user by ID
    done(null, user); // Attach the user to the session
  } catch (err) {
    done(err, null); // Handle errors
  }
});
