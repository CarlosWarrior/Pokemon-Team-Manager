const { readFileSync } = require("fs")
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
        if(!req.body._id || await Ability.count({_id: req.body._id}) < 1)
            return raise({ status: 404, message: "Not found" })
        if(!req.body.name && ! req.body.effect )
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
    bulkCreate: async(req, res) => {
        if(!req.file)
            return raise({ status: 422, message: "File not present" })
        let abilitiesData, abilitiesNames
        try {
            abilitiesData = JSON.parse(readFileSync(req.file.path, 'utf8'))
            abilitiesNames = Object.keys(abilitiesData)
        } catch (error) {
            return raise({ status: 422, message: "File malformed", errors: error })
        }
        const abilities = []
        try {
            for (let ti = 0; ti < abilitiesNames.length; ti++) {
                const abilityData = abilitiesData[abilitiesNames[ti]];
                if(await Ability.count({ name: abilityData.name}) < 1)
                    abilities.push(await Ability.create(abilityData))
            }
        } catch (error) {
            return raise({ status: 422, message: "Abilities Data malformed", errors: error })
        }
        
        return res.send(abilities)
    },
    delete: async(req, res) => {
        if(!req.body.abilities || !req.body.abilities.length)
            return raise({status: 422, message: "Body malformed" })
        const abilities = req.body.abilities
        const _abilities = []
        for (let ab = 0; ab < abilities.length; ab++) {
            if(await Ability.count({ _id: abilities[ab]})){
                await Ability.delete(abilities[ab]);
                _abilities.push(abilities[ab])
            }
  
        }
        res.send(_abilities)
    },
}

module.exports = AbilityController