const { TeamsRanking } = require("../events/states/TeamsRanking")
const { raise } = require("../middlewares/errors")
const Pokemon = require("../models/pokemon")
const Team = require('../models/team')
const TeamController = {
    list: async(req, res) => {
        const _teams = await Team.find({ user: req.locals._id })
        const teams = []
        for (let ti = 0; ti < _teams.length; ti++) {
            const team = _teams[ti].toJSON();
            for (let si = 0; si < team.slots.length; si++) {
                const slot = team.slots[si];
                slot["pokemon"] = await Pokemon.findOne({ filter: {name: slot.pokemon} })
            }
            teams.push(team)
        }
        res.send(teams)
    },
    get: async(req, res) => {
        res.send('team get')
    },
    create: async(req, res) => {
        if(!req.body.name || !req.body.slots || !req.body.slots.length)
            return raise({ status: 422, message: "Malformed body" })
        let team
        try {
            team = await Team.create({
                user: req.locals._id,
                name: req.body.name,
                slots: req.body.slots.map((slot) => {
                    const slotData = {
                        gender: slot.gender,
                        level: slot.level,
                        order: slot.order,
                        pokemon: slot.pokemon.name,
                        moves: slot.moves,
                        ability: slot.ability,
                        tera_type: slot.tera_type,
                        evs: slot.evs,
                        ivs: slot.ivs,
                    }
                    if(slot.item && slot.item != "")
                        slot["item"] = slot.item
                    return slotData
                })
            })
        } catch (error) {
            return raise({ message: 422, message: "Invalid data", errors: error})
        }

        try {    
            const state = await TeamsRanking()
            global.io.timeout(5000).emit('client-RankingUpdated', state)
        } catch (error) {
            console.log(error)
        }
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