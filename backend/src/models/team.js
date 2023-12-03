const {Schema, model} = require("mongoose")
const TeamSlotSchema = require("./schemas/team-slot")

const TeamSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    slots: {
        type: [ TeamSlotSchema ],
        required: true
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Team = new model('Team', TeamSchema)

module.exports = require('./_model')(Team)