const {Schema, model} = require("mongoose")
const { isUrl } = require("../utils/formats")
const Type = require("./type")
const Move = require("./move")
const Ability = require("./ability")
const StatSchema = require("./schemas/stats")
const movesExists = async(moves) => {
    let count = true
    for (let moveIndex = 0; moveIndex < moves.length; moveIndex++) {
        const moveName = moves[moveIndex];
        count = count && await Move.count({ name: moveName }) > 0
    }
    return count
}
const abilititesExists = async(abilitites) => {
    let count = true
    for (let ablityIndex = 0; ablityIndex < abilitites.length; ablityIndex++) {
        const ablityName = abilitites[ablityIndex];
        count = count && await Ability.count({ name: ablityName }) > 0
    }
    return count
}
const typeExists = async(type) => {
    return await Type.count({ name: type }) > 0
}
const PokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: { validator: isUrl },
    },
    type1: {
        type: String,
        required: true,
        validate: { validator: async(value) => typeExists(value) },
    },
    type2: {
        type: String,
        required: true,
        validate: { validator: async(value) => typeExists(value) },
    },
    moves: {
        type: [String],
        required: true,
        validate: { validator: async(value) => await movesExists(value) },
    },
    abilities: {
        type: [String],
        required: true,
        validate: { validator: async(value) => await abilititesExists(value) },
    },
    stats: {
        type: StatSchema,
        required: true,
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Pokemon = new model('Pokemon', PokemonSchema)

module.exports = require('./_model')(Pokemon)