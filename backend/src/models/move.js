const {Schema, model} = require("mongoose")
const MoveCategories = require("./enums/MoveCategory")
const MoveTargets = require("./enums/MoveTarget")
const Type = require("./type")
const { isNumber } = require("../utils/formats")
const isMovecategory = (value) => {
    return MoveCategories.includes(value)
}
const isMovetarget = (value) => {
    return MoveTargets.includes(value)
}
const typeExists = async(type) => {
    return await Type.count({ name: type }) > 0
}
const isPriority = async(priority) => {
    return isNumber(priority) && priority >= -7 && priority <= 6
}
const MoveSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        validate: { validator: async(value) => typeExists(value) },
    },
    category: {
        type: String,
        required: true,
        validate: { validator: isMovecategory }
    },
    target: {
        type: String,
        required: true,
        validate: { validator: isMovetarget }
    },
    power: {
        type: Number,
        required: true,
        default: 0
    },
    accuracy: {
        type: Number,
        required: true,
        default: 0
    },
    pp: {
        type: Number,
        required: true,
    },
    effect: {
        type: String,
        required: false,
    },
    effect_chance: {
        type: String,
        required: false,
    },
    priority: {
        type: Number,
        required: true,
        validate: { validator: isPriority },
        default: 0,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Move = new model('Move', MoveSchema)

module.exports = require('./_model')(Move)