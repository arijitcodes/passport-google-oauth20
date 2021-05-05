const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Models
const User = require("./models/User");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Find or Create User
      // return done(null, user)
      //   console.log(profile._json);
      User.findOne({ googleID: profile._json.sub }, async (err, user) => {
        if (!err && user) {
          // User Already Exists in DB
          return done(null, user);
        } else {
          const newUser = new User({
            googleID: profile._json.sub,
            displayName: profile._json.name,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile._json.email,
            emailVerified: profile._json.email_verified,
            picture: profile._json.picture,
          });
          //   const savedUser = await newUser.save();
          //   return done(null, savedUser);
          newUser.save((err, user) => {
            if (err) {
              return done(err, user);
            } else {
              return done(null, user);
            }
          });
        }
      });
      //   return done(null, profile);
    }
  )
);
