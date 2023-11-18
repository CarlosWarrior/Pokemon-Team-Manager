const {Schema, model} = require("mongoose")
const ItemSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Item = new model('Item', ItemSchema)

module.exports = require('./_model')(Item)