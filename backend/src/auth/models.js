const {Schema, model} = require("mongoose")
const bcrypt = require('bcrypt')

const validEmail = value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)
const emailType = {
    type: String,
    unique: true,
    required: true,
    validate: { validator: validEmail },
}
const passwordType = {
    type: String,
    required: true,
    min: 6,
    max: 32,
}

const UserSchema = new Schema({
    name: String,
    email: emailType,
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
const User = new model('User', containsPassword(UserSchema))

const AdminSchema = new Schema({
    name: String,
    email: emailType,
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

exports.User = require('../models/_model')(User)
exports.Admin = require('../models/_model')(Admin)

function containsPassword (Model){
    Model.pre('save', function(next) {
        console.log('pre save')
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