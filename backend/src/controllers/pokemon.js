const { readFileSync } = require("fs")
const { raise } = require("../middlewares/errors")
const Pokemon = require('../models/pokemon')
const Ability = require("../models/ability")
const Move = require("../models/move")
const Type = require("../models/type")
const { isStats, isNumber } = require("../utils/formats")

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
        if(!req.body.number || !req.body.name || !req.body.image || !req.body.type1 || !req.body.moves || !req.body.abilities || !req.body.stats)
            return raise({ status:422, message: "Malformed body" })
        if(!isNumber(req.body.number))
            return raise({ status:422, message:"Invalid number" })
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
        
        const number = req.body.number
        const name = req.body.name
        const image = req.body.image
        const type1 = req.body.type1
        const type2 = req.body.type2
        const moves = req.body.moves
        const abilities = req.body.abilities
        const stats = req.body.stats

        let pokemon
        try {
            const pokemonData = {
                number,
                name,
                image,
                type1,
                moves,
                abilities,
                stats,
            }
            if(type2)
                pokemonData["type2"] = type2
            pokemon = await Pokemon.create(pokemonData)
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error })
        }

        res.send(pokemon)
    },
    update: async(req, res) => {
        if(!req.body._id || !await Pokemon.count({ _id: req.body._id }))
            return raise({ status: 404, message: "Not found" })
        if(!req.body.number && !req.body.name && !req.body.image && !req.body.type1 && !req.body.moves && !req.body.abilities && !req.body.stats)
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

        const number = req.body.number
        if(number)
            pokemon.number = number
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
    bulkCreate: async(req, res) => {
        if(!req.file)
            return raise({ status: 422, message: "File not present" })
        let pokemonsData, pokemonsNames
        try {
            pokemonsData = JSON.parse(readFileSync(req.file.path, 'utf8'))
            pokemonsNames = Object.keys(pokemonsData)
        } catch (error) {
            return raise({ status: 422, message: "File malformed", errors: error })
        }
        const pokemons = []
        try {
            for (let ti = 0; ti < pokemonsNames.length; ti++) {
                const pokemonData = pokemonsData[pokemonsNames[ti]];
                const pokemon = {
                    number: pokemonData.id,
                    name: pokemonsNames[ti],
                    image: pokemonData.img,
                    type1: pokemonData.type1,
                    abilities: Object.keys(pokemonData.abilities),
                    moves: Object.keys(pokemonData.moves),
                    stats:{
                        hp: pokemonData.stats["hp"].base,
                        attack: pokemonData.stats["attack"].base,
                        defense: pokemonData.stats["defense"].base,
                        specialAttack: pokemonData.stats["special-attack"].base,
                        specialDefense: pokemonData.stats["special-defense"].base,
                        speed: pokemonData.stats["speed"].base,
                    }
                }
                if(pokemonData.type2)
                    pokemon["type2"] = pokemonData.type2
                
                if(await Pokemon.count({ name: pokemonsNames[ti]}) < 1)
                    pokemons.push(await Pokemon.create(pokemon))
                console.log(ti+1, pokemonsNames[ti])
            }
        } catch (error) {
            return raise({ status: 422, message: "Pokemons Data malformed", errors: error })
        }
        
        return res.send(abilities)
    },
    delete: async(req, res) => {
        if(!req.body.pokemons || !req.body.pokemons.length)
            return raise({ status: 422, message: "Body malformed"})
        const pokemons = req.body.pokemons
        const _pokemons = []
        for (let ti = 0; ti < pokemons.length; ti++) {
            if(await Pokemon.count({ _id: pokemons[ti]})){
                await Pokemon.delete(pokemons[ti]);
                _pokemons.push(pokemons[ti])
            }
        }
        res.send(_pokemons)
    },
}

module.exports = PokemonController