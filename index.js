const express = require("express");
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

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080;

app.use(express.json());

// Initialising Sequelize ORM
const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
    logQueryParameters: true
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

app.get("/", (req, res) => {
  res.render("signup.ejs");
});
app.get("/status", (req, res) => {
  const status = {
    Status: "Running",
  };
  res.send(status);
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.use(express.static("public"));
