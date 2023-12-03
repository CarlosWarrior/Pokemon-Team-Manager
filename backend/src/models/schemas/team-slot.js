const {Schema} = require("mongoose")
const StatSchema = require("./stats")
const Move = require("../move")
const Pokemon = require("../pokemon")
const Ability = require("../ability")
const Type = require("../type")
const Item = require("../item")
const pokemonExists = async(pokemonName) => {
    return await Pokemon.count({ name: pokemonName }) > 0
}
const itemExists = async(itemName) => {
    return await Item.count({ name: itemName }) > 0
}
const abilitiyExists = async(ablityName) => {
    return await Ability.count({ name: ablityName }) > 0
}
const typeExists = async(typeName) => {
    return await Type.count({ name: typeName }) > 0
}
const movesExists = async(moves) => {
    let count = true
    for (let moveIndex = 0; moveIndex < moves.length; moveIndex++) {
        const moveName = moves[moveIndex];
        count = count && await Move.count({ name: moveName }) > 0
    }
    return count
}
const genders = ["male", "female", "none"]
const validGender = (value) => genders.includes(value)

const TeamSlotSchema = new Schema({
    gender:{
        type: String,
        required: true,
        validate: { validator: validGender },
    },
    level:{ 
        type: Number, 
        min: 1, 
        max: 100,
        required: true,
    },
    order:{ 
        type: Number, 
        min: 1, 
        max: 6,
        required: true,
    },
    pokemon: {
        type: String,
        required: true,
        validate: { validator: async(value) => await pokemonExists(value) },
    },
    moves: {
        type: [String],
        required: true,
        validate: { validator: async(value) => await movesExists(value) },
    },
    ability: {
        type: String,
        required: true,
        validate: { validator: async(value) => await abilitiyExists(value) },
    },
    tera_type: {
        type: String,
        required: true,
        validate: { validator: async(value) => await typeExists(value) },
    },
    item: {
        type: String,
        required: false,
        validate: { validator: async(value) => await itemExists(value) },
    },
    evs: {
        type: StatSchema,
        required: true,
    },
    ivs: {
        type: StatSchema,
        required: true,
    },
}, { _id: false })


module.exports = TeamSlotSchema