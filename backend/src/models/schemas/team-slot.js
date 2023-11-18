const {Schema} = require("mongoose")
const TeamSlotSchema = new Schema({
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})


module.exports = TeamSlotSchema