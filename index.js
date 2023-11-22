import express from "express";
import bodyParser from "body-parser";
import {conn, initLiquibase} from "./database.js"
const app = express()
app.set("view engine, ejs")
app.use(bodyParser.json());
const port = 8080

initLiquibase().then(r => conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySql DB");
}));

app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get('/signin', (req, res) => {
  res.render("signin.ejs")
})

app.use(express.static("public"));
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