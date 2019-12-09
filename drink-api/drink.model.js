const Ingredient = require( "./ingredient.model");

class Drink {

    constructor(name, ingredients, howTo, recipient ){
        this.name = name;
        this.ingredients = ingredients;
        this.howTo = howTo;
        this.recipient = recipient;
    }

    isValid({name, ingredients, howTo, recipient}){

    }
}

module.exports.DrinkModel = Drink;