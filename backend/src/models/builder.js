const {Schema, model} = require("mongoose")
const BuilderSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Builder = new model('Builder', BuilderSchema)

module.exports = require('./_model')(Builder)