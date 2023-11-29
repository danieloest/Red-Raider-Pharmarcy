const express = require("express");
const bodyParser = require("body-parser");
const { initLiquibase } = require("./database.js");
const UserRoutes = require("./routes/UserRoutes.js");
const PatientRoutes = require("./routes/PatientRoutes.js");
const UserModel = require("./models/User");
const PatientModel = require("./models/Patient");
const { Sequelize } = require("sequelize");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 8080;

app.use(express.json());

const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

// Initialising the Models on sequelize
UserModel.initialise(sequelize);
PatientModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that already exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Routes to the app.
    app.use("/user", UserRoutes);
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
/*

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/doctors', (req, res) => {
  conn.query('SELECT * FROM Doctor', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err)
  })
});

app.get('/patients', (req, res) => {
conn.query('SELECT * FROM Patient', (err, rows, fields) => {
  if (!err)
    res.send(rows);
  else
    console.log(err)
})
});


app.get('/insurance', (req, res) => {
  conn.query('SELECT * FROM Insurance', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})

app.get('/patient/doctors', (req, res) => {
  conn.query('SELECT * FROM PatientDoctor', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})

app.get('/prescriptions', (req, res) => {
  conn.query('SELECT * FROM Prescription', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})

app.get('/patient/prescriptions', (req, res) => {
  conn.query('SELECT * FROM PatientPrescription', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})
 */
