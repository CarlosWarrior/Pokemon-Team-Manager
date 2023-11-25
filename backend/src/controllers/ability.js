const { raise } = require("../middlewares/errors")
const Ability = require('../models/ability')
const AbilityController = {
    list: async(req, res) => {
        const abilities = await Ability.find({})
        res.send(abilities)
    },
    get: async(req, res) => {
        res.send('ability get')
    },
    create: async(req, res) => {
        if(!req.body.name || !req.body.effect)
            return raise({status: 422, message: "Body malformed" })
        let ability

        try {
            const name = req.body.name
            const effect = req.body.effect
            ability = await Ability.create({
                name,
                effect,
            })
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error})
        }
        res.send(ability)
    },
    update: async(req, res) => {
        if(!req.body._id || (!req.body.name && ! req.body.effect) )
            return raise({status: 422, message: "Body malformed" })
        const id = req.body._id
        let ability
        try {
            ability = await Ability.findById(id)
        } catch (error) {
            return raise({ status: 404 })
        }
        if(!ability)
            return raise({ status: 404 })

        const name = req.body.name
        if(name)
            ability.name = name
        const effect = req.body.effect
        if(effect)
            ability.effect = effect
        try {
            await ability.save()
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error})
        }
        res.send(ability)
    },
    delete: async(req, res) => {
        if(!req.body.name || !req.body.abilities.length)
            return raise({status: 422, message: "Body malformed" })
        const abilities = req.body.abilities
        const _abilities = []
        for (let ab = 0; ab < abilities.length; ab++) {
            await Ability.count({ _id: abilities[ab]}) && _abilities.push(abilities[ab])
            await Ability.delete(abilities[ab]);
  
        }
        res.send(_abilities)
    },
}

module.exports = AbilityController