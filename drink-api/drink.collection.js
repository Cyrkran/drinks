const DrinkModel = require("./drink.model");

DrinkApi = (app, drinkCollection) => {
  module.exports = app.get("/drink/:name", (req, res) => {
    const name = req.params.name;
    const promise = drinkCollection.findOne({ name }, { recipient: 0 });

    promise
      .then(document => {
        if (!document) {
          res.statusMessage = `${name} não encontrado`;
          res.status(400).end();

          return;
        }

        res.send(document);
      })
      .catch(err => {
        res.status(500).end();
      });
  });

  module.exports = app.get("/drinks", (req, res) => {
    const query = req.body;
    const allDrinks = drinkCollection
      .find({ ...query }, { recipient: 0 })
      .toArray();

    allDrinks
      .then(collection => {
        if (!collection) {
          res.statusMessage = "A sua busca não retornou resultados";
          res.status(400).end();

          return;
        }

        res.send(collection);
      })
      .catch(err => {
        res.status(500).end();
      });
  });

  module.exports = app.post("/drink/add", (req, res) => {
    drinkCollection
      .findOne(
        { name: req.body.name },
        { recipient: 0, ingredients: 0, _id: 0, howTo: 0 }
      )
      .then(document => {
        if (document) {
          res.statusMessage = "A drink with this name is already created";
          res.status(404).end();

          return;
        }

        drinkCollection
          .insertOne({
            name: req.body.name,
            ingredients: req.body.ingredients,
            howTo: req.body.howTo,
            recipient: req.body.recipient
          })
          .then(({result, ops, insertedId}) => {
            res.send({result, ops, insertedId});
          })
          .catch(res.send(err));
      })
      .catch(err => {
        console.log(err);
      });
  });

  module.exports = app.delete("/drink/remove/:name", (req, res) => {
    const name = req.params.name;
    drinkCollection.findOneAndDelete({name}).then(success => {
      res.send(success);
    })
  });

  module.exports = app.post("/drink/update/:name", (req, res) => {
    const name = req.params.name;
    const item = req.body;
    
    drinkCollection.findOneAndUpdate({name}, {$set: item}).then(success => {
      res.send(success)
    })
  });
};

module.exports = DrinkApi;
