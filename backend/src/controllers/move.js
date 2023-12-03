const { readFileSync } = require("fs")
const { raise } = require("../middlewares/errors")
const Move = require('../models/move')
const Type = require('../models/type')
const MoveCategories = require('../models/enums/MoveCategory')
const { existsNumber } = require("../utils/formats")

const MoveController = {
    list: async(req, res) => {
        const moves = await Move.find({})
        res.send(moves)
    },
    get: async(req, res) => {
        res.send('move get')
    },
    create: async(req, res) => {
        if(!req.body.name || !req.body.type || !req.body.category || !req.body.target || !existsNumber(req.body.power) || !existsNumber(req.body.accuracy) || !existsNumber(req.body.pp))
            return raise({ status: 422, message: "Malformed body" })
        if(existsNumber(req.body.priority) && ( req.body.priority < -7 || req.body.priority > 6))
            return raise({ status: 422, message: "Malformed body" })
        if(await Type.count({ name: req.body.type}) <= 0)
            return raise({ status: 422, message: "Type does not exists" })
        if(!MoveCategories.includes(req.body.category))
            return raise({ status: 422, message: "Category does not exists" })
        
        const name = req.body.name
        const type = req.body.type
        const category = req.body.category
        const target = req.body.target
        const power = req.body.power
        const accuracy = req.body.accuracy
        const pp = req.body.pp
        const effect = req.body.effect
        const effect_chance = req.body.effect_chance
        const priority = req.body.priority

        let move
        try {
            move = await Move.create({
                name,
                type,
                category,
                target,
                power,
                accuracy,
                pp,
                effect,
                effect_chance,
                priority,
            })
        } catch (error) {
            return raise({ status:500, message: "Move creation failed", errors: error})
        }

        return res.send(move)
    },
    update: async(req, res) => {
        if(!req.body._id || await Move.count({_id: req.body._id}) < 1)
            return raise({ status: 404, message: "Not found" })
        if(!req.body.name && !req.body.type && !req.body.category && !req.body.target && !existsNumber(req.body.power) && !existsNumber(req.body.accuracy) && !existsNumber(req.body.pp) && !req.body.effect && !req.body.effect_chance && !existsNumber(req.body.priority))
            return raise({ status: 422, message: "Malformed body" })
        if(existsNumber(req.body.priority) && ( req.body.priority < -7 || req.body.priority > 6))
            return raise({ status: 422, message: "Malformed body" })
        if(req.body.type && await Type.count({ name: req.body.type}) <= 0)
            return raise({ status: 422, message: "Type does not exists" })
        if(req.body.category && !MoveCategories.includes(req.body.category))
            return raise({ status: 422, message: "Category does not exists" })
        
        const move = await Move.findById(req.body._id)
        const name = req.body.name
        if(name)
            move.name = name
        const type = req.body.type
        if(type)
            move.type = type
        const category = req.body.category
        if(category)
            move.category = category
        const target = req.body.target
        if(target)
            move.target = target
        const power = req.body.power
        if(power)
            move.power = power
        const accuracy = req.body.accuracy
        if(accuracy)
            move.accuracy = accuracy
        const pp = req.body.pp
        if(pp)
            move.pp = pp
        const priority = req.body.priority
        if(priority)
            move.priority = priority
        const effect = req.body.effect
        if(effect)
            move.effect = effect
        const effect_chance = req.body.effect_chance
        if(effect_chance)
            move.effect_chance = effect_chance

        try {
            await move.save()
            
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error})
        }
        res.send(move)
    },
    bulkCreate: async(req, res) => {
        if(!req.file)
            return raise({ status: 422, message: "File not present" })
        let movesData, movesNames
        try {
            movesData = JSON.parse(readFileSync(req.file.path, 'utf8'))
            movesNames = Object.keys(movesData)
        } catch (error) {
            return raise({ status: 422, message: "File malformed", errors: error })
        }
        const moves = []
        try {
            for (let ti = 0; ti < movesNames.length; ti++) {
                const moveData = movesData[movesNames[ti]];
                if(await Move.count({ name: moveData.name}) < 1)
                    moves.push(await Move.create(moveData))
            }
        } catch (error) {
            return raise({ status: 422, message: "Moves Data malformed", errors: error })
        }
        
        return res.send(moves)
    },
    delete: async(req, res) => {
        if(!req.body.moves || !req.body.moves.length)
            return raise({ status: 422, message: "Body malformed"})
        const moves = req.body.moves
        const _moves = []
        for (let ti = 0; ti < moves.length; ti++) {
            await Move.count({ _id: moves[ti]}) && _moves.push(moves[ti])
            await Move.delete(moves[ti]);
        }
        res.send(_moves)
    },
}

module.exports = MoveController