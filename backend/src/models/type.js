const { Schema, model } = require("mongoose")
const { isUrl, isColor } = require("../utils/formats")
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Type = new model('Type', TypeSchema)

module.exports = require('./_model')(Type)