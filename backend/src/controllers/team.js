const TeamsRanking = require("../events/states/TeamsRanking")
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

        const state = await TeamsRanking()
        global.io.timeout(5000).emit('client-RankingUpdated', state)
        res.send(team)
    },
    update: async(req, res) => {
        const state = await TeamsRanking()
        global.io.timeout(5000).emit('client-RankingUpdated', state)
        res.send({message: 'team update'})
    },
    delete: async(req, res) => {
        if(!req.body.teams || !req.body.teams.length)
            return raise({ status: 422, message: "Body malformed"})
        const teams = req.body.teams
        const _teams = []
        for (let ti = 0; ti < teams.length; ti++) {
            await Team.count({ _id: teams[ti]}) && _teams.push(teams[ti])
            await Team.delete(teams[ti]);
        }
        res.send(_teams)
        const state = await TeamsRanking()
        global.io.timeout(5000).emit('client-RankingUpdated', state)
    }
}

module.exports = TeamController