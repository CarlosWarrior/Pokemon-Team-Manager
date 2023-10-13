const { raise } = require("../middlewares/errors")
const Type = require('../models/type')
const TypeController = {
    list: async(req, res) => {
        res.send('type list')
    },
    get: async(req, res) => {
        res.send('type get')
    },
    create: async(req, res) => {
        res.send('type create')
    },
    update: async(req, res) => {
        res.send('type update')
    },
    delete: async(req, res) => {
        res.send('type delete')
    },
}

module.exports = TypeController