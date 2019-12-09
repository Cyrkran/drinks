const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/drinks";

let db;
let drinkCollection;

MongoClient.connect(uri, (err, client) => {
  if (err) throw err;

  db = client.db("drinks");
  drinkCollection = db.collection("drink");
  require('./drink-api/drink.collection')(app, drinkCollection);

/*   app.get('/drink/:name', drinkApi.getDrink);
 */});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json("application/json"));

app.listen(3000, (err, res) => {
  
})

