const { Schema, model } = require("mongoose")
const { isUrl, isColor } = require("../utils/formats")
const typeExists = async(typeNames, model) => {
    let count = true
    for (let typeIndex = 0; typeIndex < typeNames.length; typeIndex++) {
        const typeName = typeNames[typeIndex];
        count = count && await model.countDocuments({ _id: typeName })
    }
    return count
}
const TypeSchema = new Schema({
    name: { 
        type: String, 
        unique: true,
        required: true
    },
    color: { 
        type: String, 
        required: true,
        validate: { validator: isColor }
    },
    image: { 
        type: String, 
        required: true,
        validate: { validator: isUrl }
    },
    teracrystalImage: { 
        type: String, 
        required: true,
        validate: { validator: isUrl }
    },
    attackAdvantage: {
        type: [String],
        validate: { validator: async(value) => await typeExists(value, this) },
        default: []
    },
    defenseAdvantage: {
        type: [String],
        validate: { validator: async(value) => await typeExists(value, this) },
        default: []
    },
    defenseWeakness: {
        type: [String],
        validate: { validator: async(value) => await typeExists(value, this) },
        default: []
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Type = new model('Type', TypeSchema)

module.exports = require('./_model')(Type)