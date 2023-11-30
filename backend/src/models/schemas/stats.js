const {Schema, model} = require("mongoose")
const StatSchema = new Schema({
    hp: Number,
    attack: Number,
    defense: Number,
    specialAttack: Number,
    specialDefense: Number,
    speed: Number,
}, {_id: false,})

module.exports = StatSchema