const Team = require("../../models/team")
const Type = require("../../models/type")
const Types = require("../../models/type")


function getAttackAdvantage(pokemon, type, modifiers){
    let count = 0
    if(modifiers[pokemon.type1].attackAdvantage.includes(type))
        count += 1
    if(pokemon.type2 && modifiers[pokemon.type2].attackAdvantage.includes(type))
        count += 1
    return count
}
function getDefenseAdvantage(pokemon, type, modifiers){
    let count = 0
    if(modifiers[pokemon.type1].defenseAdvantage.includes(type))
        count += 1
    if(pokemon.type2 && modifiers[pokemon.type2].defenseAdvantage.includes(type))
        count += 1
    return count
}
function getDefenseWeakness(pokemon, type, modifiers){
    let count = 0
    if(modifiers[pokemon.type1].defenseWeakness.includes(type))
        count += 1
    if(pokemon.type2 && modifiers[pokemon.type2].defenseWeakness.includes(type))
        count += 1
    return count
}

function rank(team, types, modifiers){
    const attackAdvantage = {}
    const defenseAdvantage = {}
    const defenseWeakness = {}
    types.forEach(type => {
        attackAdvantage[type] = 0
        defenseAdvantage[type] = 0
        defenseWeakness[type] = 0
    })
    team.slots.forEach(slot => {
        types.forEach(type => {
            attackAdvantage[type] += getAttackAdvantage(slot.pokemon, type, modifiers)
            defenseAdvantage[type] += getDefenseAdvantage(slot.pokemon, type, modifiers)
            defenseWeakness[type] += getDefenseWeakness(slot.pokemon, type, modifiers)
        })
    })
    let coverage = 0
    let defense = 0
    types.forEach(type => {
        coverage += attackAdvantage[type] = 0
        defense += defenseAdvantage[type] = 0
        defense += defenseWeakness[type] = 0
    })
    return {coverage, defense}
}

async function TeamsRanking(){
    const teams = await Team.find({})
    const types = (await Type.find({})).map(type => type.name)
    const modifiers = {}
    types.forEach(type => {
        modifiers[type.name] = {
            attackAdvantage: type.attackAdvantage,
            defenseAdvantage: type.defenseAdvantage,
            defenseWeakness: type.defenseWeakness,
        }
    })
    const teamsCoverage = {}
    const teamsDefense = {}
    teams.forEach(team => {
        const {coverage, defense} = rank(team, types)
        teamsCoverage[team._id] = coverage
        teamsDefense[team._id] = defense
    })
    const teamsCoverageRanking = Object.keys(teamsCoverage).sort((id1, id2) => teamsCoverage[id1] < teamsCoverage[id2]? 1 : -1)
    const teamsDefenseRanking = Object.keys(teamsDefense).sort((id1, id2) => teamsDefense[id1] < teamsDefense[id2]? 1 : -1)
    return { teamsCoverageRanking, teamsDefenseRanking }
}
module.exports = TeamsRanking