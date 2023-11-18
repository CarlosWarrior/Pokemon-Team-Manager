const {Schema, model} = require("mongoose")
const BattleSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Battle = new model('Battle', BattleSchema)

module.exports = require('./_model')(Battle)