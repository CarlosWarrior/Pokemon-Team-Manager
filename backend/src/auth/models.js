const {Schema, model} = require("mongoose")
const bcrypt = require('bcrypt')

const validEmail = value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)
const emailType = (unique) => ({
    type: String,
    unique,
    required: true,
    validate: { validator: validEmail },
})
const passwordType = {
    type: String,
    required: true,
    min: 6,
    max: 32,
}

const UserSchema = new Schema({
    name: String,
    email: emailType(true),
    password: passwordType,
    valid: { type: Boolean, default: false, },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    },
})
const User = new model('User', containsPassword(UserSchema))

const AdminSchema = new Schema({
    name: String,
    email: emailType(true),
    password: passwordType,

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    },
})
const Admin = new model('Admin', containsPassword(AdminSchema))

const TokenSchema = new Schema({
    email: emailType(false),
    token: String,
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})
const Token = new model('Token ', TokenSchema)

exports.User = require('../models/_model')(User)
exports.Admin = require('../models/_model')(Admin)
exports.Token = require('../models/_model')(Token)

function containsPassword (Model){
    Model.pre('save', function(next) {
        var hashable = this
        if (!hashable.isModified('password')) return next()
        
        bcrypt.genSalt(16, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(hashable.password, salt, function(err, hash) {
                if (err) return next(err)
                hashable.password = hash
                next()
            })
        })
    })
    return Model
}