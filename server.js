const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')

const app = express();
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/drinks";

let db;
let drinkCollection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json("application/json"));

MongoClient.connect(uri, (err, client) => {
  if (err) throw err;

  db = client.db("drinks");
  drinkCollection = db.collection("drink");
  require("./drink-api/drink.collection")(app, drinkCollection);
});

app.listen(3000, (err, res) => {
  console.log("App running on port 3000");
});
