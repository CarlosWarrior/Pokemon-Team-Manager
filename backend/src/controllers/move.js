const { raise } = require("../middlewares/errors")
const Move = require('../models/move')
const Type = require('../models/type')
const MoveCategories = require('../models/enums/MoveCategory')
const { isNumber } = require("../utils/formats")

const MoveController = {
    list: async(req, res) => {
        const moves = await Move.find({})
        res.send(moves)
    },
    get: async(req, res) => {
        res.send('move get')
    },
    create: async(req, res) => {
        if(!req.body.name || !req.body.type || !req.body.category || !req.body.power || !req.body.accuracy || !req.body.pp || !req.body.effect)
            return raise({ status: 422, message: "Malformed body" })
        if(!isNumber(req.body.accuracy) || !isNumber(req.body.pp))
            return raise({ status: 422, message: "Malformed body" })
        if(await Type.count({ name: req.body.type}) <= 0)
            return raise({ status: 422, message: "Type does not exists" })
        if(!MoveCategories.includes(req.body.category))
            return raise({ status: 422, message: "Category does not exists" })
        
        const name = req.body.name
        const type = req.body.type
        const category = req.body.category
        const power = req.body.power
        const accuracy = req.body.accuracy
        const pp = req.body.pp
        const effect = req.body.effect

        let move
        try {
            move = await Move.create({
                name,
                type,
                category,
                power,
                accuracy,
                pp,
                effect,
            })
        } catch (error) {
            return raise({ status:500, message: "Move creation failed", errors: error})
        }

        return res.send(move)
    },
    update: async(req, res) => {
        if(!req.body._id || await Move.count({_id: req.body._id}) < 1)
            return raise({ status: 404, message: "Not found" })
        if(!req.body.name && !req.body.type && !req.body.category && !req.body.power && !req.body.accuracy && !req.body.pp && !req.body.effect)
            return raise({ status: 422, message: "Malformed body" })
        if( (req.body.accuracy && !isNumber(req.body.accuracy))  ||  (req.body.pp && !isNumber(req.body.pp)) )
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
        const power = req.body.power
        if(power)
            move.power = power
        const accuracy = req.body.accuracy
        if(accuracy)
            move.accuracy = accuracy
        const pp = req.body.pp
        if(pp)
            move.pp = pp
        const effect = req.body.effect
        if(effect)
            move.effect = effect

        try {
            await move.save()
            
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error})
        }
        res.send(move)
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