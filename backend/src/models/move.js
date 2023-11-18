const {Schema, model} = require("mongoose")
const MoveSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Move = new model('Move', MoveSchema)

module.exports = require('./_model')(Move)