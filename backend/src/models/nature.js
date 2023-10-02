const {Schema, model} = require("mongoose")
const NatureSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Nature = new model('Nature', NatureSchema)

module.exports = require('./_model')(Nature)