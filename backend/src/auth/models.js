const {Schema, model} = require("mongoose")
const UserSchema = new Schema({

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const User = new model('User', UserSchema)

const AdminSchema = new Schema({

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Admin = new model('Admin', AdminSchema)

exports.User = require('../models/_model')(User)
exports.Admin = require('../models/_model')(Admin)