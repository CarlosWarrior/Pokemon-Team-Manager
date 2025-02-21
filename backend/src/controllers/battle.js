const { raise } = require("../middlewares/errors")
const Battle = require('../models/battle')
const BattleController = {
    list: async(req, res) => {
        res.send('battle list')
    },
    get: async(req, res) => {
        res.send('battle get')
    },
    create: async(req, res) => {
        res.send('battle create')
    },
    delete: async(req, res) => {
        res.send('battle delete')
    },
    addLog: async(req, res) => {
        res.send('battle add log')
    }
}

module.exports = BattleController