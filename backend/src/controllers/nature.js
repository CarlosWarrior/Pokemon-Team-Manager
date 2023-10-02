const { raise } = require("../middlewares/errors")
const Nature = require('../models/nature')
const NatureController = {
    list: async(req, res) => {
        res.send('nature list')
    },
    get: async(req, res) => {
        res.send('nature get')
    },
    create: async(req, res) => {
        res.send('nature create')
    }
}

module.exports = NatureController