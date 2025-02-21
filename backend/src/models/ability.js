const {Schema, model} = require("mongoose")
const AbilitySchema = new Schema({
    name: { 
        type: String, 
        unique: true,
        required: true
    },
    effect: { 
        type: String, 
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Ability = new model('Ability', AbilitySchema)

module.exports = require('./_model')(Ability)