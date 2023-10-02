const { raise } = require("../middlewares/errors")
const Pokemon = require('../models/pokemon')
const PokemonController = {
    list: async(req, res) => {
        res.send('pokemon list')
    },
    get: async(req, res) => {
        res.send('pokemon get')
    },
    create: async(req, res) => {
        res.send('pokemon create')
    }
}

module.exports = PokemonController