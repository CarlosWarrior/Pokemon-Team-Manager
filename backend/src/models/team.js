const {Schema, model} = require("mongoose")
const TeamSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Team = new model('Team', TeamSchema)

module.exports = require('./_model')(Team)