const express = require('express')
const app = express()
app.set("view engine, ejs")
const port = 8080

app.get('/', (req, res) => {
  res.render("index.ejs")
})
app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})