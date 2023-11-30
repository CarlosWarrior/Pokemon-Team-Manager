const { raise } = require("../middlewares/errors")
const Pokemon = require('../models/pokemon')
const Ability = require("../models/ability")
const Move = require("../models/move")
const Type = require("../models/type")
const StatSchema = require("../models/schemas/stats")
const { isStats } = require("../utils/formats")
const pokemon = require("../models/pokemon")

const validMoves = async(moves)=>{
    let valid = moves?true:false
    if(moves)
        for (let index = 0; index < moves.length; index++) {
            const move = moves[index];
            valid = valid && await Move.count({ name: move }) > 0
        }
    return valid
}
const validAbilities = async(abilities)=>{
    let valid = abilities?true:false
    if(abilities)
        for (let index = 0; index < abilities.length; index++) {
            const ability = abilities[index];
            valid = valid && await Ability.count({ name: ability }) > 0
        }
    return valid
}
const PokemonController = {
    list: async(req, res) => {
        const pokemons = await Pokemon.find({})
        res.send(pokemons)
    },
    get: async(req, res) => {
        res.send('pokemon get')
    },
    create: async(req, res) => {
        if(!req.body.name || !req.body.image || !req.body.type1 || !req.body.moves || !req.body.abilities || !req.body.stats)
            return raise({ status:422, message: "Malformed body" })
        if(!await validAbilities(req.body.abilities))
            return raise({ status:422, message:"Invalid abilities" })
        if(!await validMoves(req.body.moves))
            return raise({ status:422, message:"Invalid moves" })
        if(await Type.count({ name: req.body.type1 }) <= 0)
            return raise({ status: 422, message: "Type1 does not exists" })
        if(req.body.type2 && await Type.count({ name: req.body.type2 }) <= 0)
            return raise({ status: 422, message: "Type2 does not exists" })
        if(!isStats(req.body.stats))
            return raise({ status: 422, message: "Invalid stats" })
        
        const name = req.body.name
        const image = req.body.image
        const type1 = req.body.type1
        const type2 = req.body.type2
        const moves = req.body.moves
        const abilities = req.body.abilities
        const stats = req.body.stats

        let pokemon
        try {
            pokemon = await Pokemon.create({
                name,
                image,
                type1,
                type2,
                moves,
                abilities,
                stats,
            })
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error })
        }

        res.send(pokemon)
    },
    update: async(req, res) => {
        if(!req.body._id || !await Pokemon.count({ _id: req.body._id }))
            return raise({ status: 404, message: "Not found" })
        if(!req.body.name && !req.body.image && !req.body.type1 && !req.body.moves && !req.body.abilities && !req.body.stats)
            return raise({ status:422, message: "Malformed body" })
        if(req.body.abilities && !await validAbilities(req.body.abilities))
            return raise({ status:422, message:"Invalid abilities" })
        if(req.body.moves && !await validMoves(req.body.moves))
            return raise({ status:422, message:"Invalid moves" })
        if(req.body.type1 && await Type.count({ name: req.body.type1 }) <= 0)
            return raise({ status: 422, message: "Type1 does not exists" })
        if(req.body.type2 && await Type.count({ name: req.body.type2 }) <= 0)
            return raise({ status: 422, message: "Type2 does not exists" })
        if(req.body.stats && !isStats(req.body.stats))
            return raise({ status: 422, message: "Invalid stats" })
        
        const id = req.body._id
        let pokemon
        try {
            pokemon = await Pokemon.findById(id)
        } catch (error) {
            return raise({ status: 404, message:"Not found", errors: error})
        }
        if(!pokemon)
            return raise({ status: 404 })

        const name = req.body.name
        if(name)
            pokemon.name = name
        const image = req.body.image
        if(image)
            pokemon.image = image
        const type1 = req.body.type1
        if(type1)
            pokemon.type1 = type1
        const type2 = req.body.type2
        if(type2)
            pokemon.type2 = type2
        const moves = req.body.moves
        if(moves)
            pokemon.moves = moves
        const abilities = req.body.abilities
        if(abilities)
            pokemon.abilities = abilities
        const stats = req.body.stats
        if(stats)
            pokemon.stats = stats

        try {
            await pokemon.save()
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error })
        }

        res.send(pokemon)
    },
    delete: async(req, res) => {
        res.send('pokemon delete')
    }
}

module.exports = PokemonController