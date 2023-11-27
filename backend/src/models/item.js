const {Schema, model} = require("mongoose")
const { isUrl } = require("../utils/formats")
const ItemSchema = new Schema({
    name: { 
        type: String, 
        unique: true,
        required: true
    },
    description: { 
        type: String, 
        required: true,
    },
    image: { 
        type: String, 
        required: true,
        validate: { validator: isUrl }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Item = new model('Item', ItemSchema)

module.exports = require('./_model')(Item)