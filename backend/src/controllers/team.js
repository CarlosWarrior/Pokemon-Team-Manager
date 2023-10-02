const { raise } = require("../middlewares/errors")
const Team = require('../models/team')
const TeamController = {
    list: async(req, res) => {
        res.send('team list')
    },
    get: async(req, res) => {
        res.send('team get')
    },
    create: async(req, res) => {
        res.send('team create')
    },
    update: async(req, res) => {
        res.send('team update')
    }
}

module.exports = TeamController