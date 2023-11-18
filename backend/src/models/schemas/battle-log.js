const {Schema} = require("mongoose")
const BattleLogSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})


module.exports = BattleLogSchema