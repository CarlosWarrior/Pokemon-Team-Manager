const { raise } = require("../middlewares/errors")
const Item = require('../models/item')
const ItemController = {
    list: async(req, res) => {
        res.send('item list')
    },
    get: async(req, res) => {
        res.send('item get')
    },
    create: async(req, res) => {
        res.send('item create')
    }
}

module.exports = ItemController