const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { initLiquibase } = require("./database");
const UserRoutes = require("./routes/UserRoutes");
const DoctorRoutes = require("./routes/DoctorRoutes");
const InsuranceRoutes = require("./routes/InsuranceRoutes");
const PrescriptionRoutes = require("./routes/PrescriptionRoutes");
const PatientRoutes = require("./routes/PatientRoutes");
const UserModel = require("./models/User");
const DoctorModel = require("./models/Doctor");
const InsuranceModel = require("./models/Insurance");
const PrescriptionModel = require("./models/Prescription");
const PatientModel = require("./models/Patient");
const { Sequelize } = require("sequelize");
const PatientDoctorModel = require("./models/PatientDoctor");
const PatientPrescriptionModel = require("./models/PatientPrescription");
const authRouter = require("./auth");
const router = express.Router();
const { auth, requiresAuth } = require("express-openid-connect");

const app = express();
app.set("view engine", "ejs");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080;
app.use(express.json());

/****************************************
 * Session configuration
 ****************************************/
const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

/****************************************
 * Passport configuration
 ****************************************/
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
);

// Initialising Sequelize ORM
const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  logQueryParameters: true,
});

// Initialising the Models on sequelize ORM
UserModel.initialise(sequelize);
DoctorModel.initialise(sequelize);
InsuranceModel.initialise(sequelize);
PrescriptionModel.initialise(sequelize);
PatientModel.initialise(sequelize);
PrescriptionModel.associate(sequelize);
PatientModel.associate(sequelize);
PatientDoctorModel.initialise(sequelize);
PatientPrescriptionModel.initialise(sequelize);

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Routes to the app.
    app.use("/user", UserRoutes);
    app.use("/doctor", DoctorRoutes);
    app.use("/insurance", InsuranceRoutes);
    app.use("/prescription", PrescriptionRoutes);
    app.use("/patient", PatientRoutes);
    app.listen(port, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });

// app.get("/", (req, res) => {
//   res.render("signup.ejs");
// });

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

app.get("/status", (req, res) => {
  const status = {
    Status: "Running",
  };
  res.send(status);
});
// app.get("/login", (req, res) => {
//   // res.render("login.ejs");
// });
// Creating custom middleware with Express
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.get("/patients", (req, res) => {
  res.render("patients.ejs");
});
// app.get("/createPatient", (req, res) => {
//   var insurances_promise = InsuranceModel.getAll();
//   insurances_promise.then((insurances) => {
//     res.render("createPatient.ejs", { insurances });
//   });
// })

app.get("/createPatient", secured, (req, res) => {
  var insurances_promise = InsuranceModel.getAll();
  insurances_promise.then((insurances) => {
    res.render("createPatient.ejs", { insurances });
  });
});

app.get("/newPatientConfirmation", (req, res) => {
  res.render("newPatientConfirmation.ejs");
});

app.get("/errorPage", (req, res) => {
  res.render("errorPage.ejs", { errorMessage: "An unkown error has occured." });
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.use(express.static("public"));
