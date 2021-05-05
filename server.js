require("dotenv").config();

const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");

// Passport Google Strategy Setup
require("./passport");

// Middlewares
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("cookie-parser")());
app.use(
  require("express-session")({
    secret: "SomeRandomSecretHehehe",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // => Indicates 7 days
    },
  })
);

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.send(
    "Hello World!<br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
  );
});

app.get("/login", (req, res) => {
  res.send(
    "Login With: <a href='/auth/google'>Google</a> | <a href='/auth/github'>GitHub</a> | <a href='/auth/facebook'>Facebook</a><br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
  );
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successfull Authentication.
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(
      "Secret Data<br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
    );
  } else {
    return res.send(
      "Unauthorized request!<br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
    );
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.status(404).send("Error 404! Page Not Found!");
});

// DB Connection
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      console.log("Error occured while connecting to MongoDB!");
    } else {
      console.log("MongoDB Connected...");
    }
  }
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listnening on Port: ${port}`);
});
