require("dotenv").config();

const express = require("express");
const app = express();
const passport = require("passport");

// Passport Google Strategy Setup
require("./passport");

// DB Connection
const dbConnection = require("./config/db");

// Routes
const indexRoute = require("./routes/index");
const loginRoute = require("./routes/login");
const authRoute = require("./routes/auth/auth");
const profileRoute = require("./routes/profile");
const logoutRoute = require("./routes/logout");
const error404Route = require("./routes/erroro404");

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
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/logout", logoutRoute);
app.use("*", error404Route);

// DB Connection
dbConnection();

// Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listnening on Port: ${port}`);
});
