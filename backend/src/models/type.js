const {Schema, model} = require("mongoose")
const TypeSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Type = new model('Type', TypeSchema)

module.exports = require('./_model')(Type)