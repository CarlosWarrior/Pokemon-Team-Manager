const {Schema, model} = require("mongoose")
const PokemonSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Pokemon = new model('Pokemon', PokemonSchema)

module.exports = require('./_model')(Pokemon)