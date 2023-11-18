const {Schema, model} = require("mongoose")
const StatSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = StatSchema