const { raise } = require("../middlewares/errors")
const Ability = require('../models/ability')
const AbilityController = {
    list: async(req, res) => {
        res.send('ability list')
    },
    get: async(req, res) => {
        res.send('ability get')
    },
    create: async(req, res) => {
        res.send('ability create')
    },
    update: async(req, res) => {
        res.send('ability update')
    },
    delete: async(req, res) => {
        res.send('ability delete')
    },
}

module.exports = AbilityController