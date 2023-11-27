const {Schema, model} = require("mongoose")
const MoveCategories = require("./enums/MoveCategory")
const isMovecategory = (value) => {
    return MoveCategories.includes(value)
}
const MoveSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        validate: { validator: isMovecategory }
    },
    power: {
        type: Number,
        required: true,
    },
    accuracy: {
        type: Number,
        required: true,
    },
    pp: {
        type: Number,
        required: true,
    },
    effect: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Move = new model('Move', MoveSchema)

module.exports = require('./_model')(Move)