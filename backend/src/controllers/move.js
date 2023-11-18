const { raise } = require("../middlewares/errors")
const Move = require('../models/move')
const MoveController = {
    list: async(req, res) => {
        res.send('move list')
    },
    get: async(req, res) => {
        res.send('move get')
    },
    create: async(req, res) => {
        res.send('move create')
    }
}

module.exports = MoveController