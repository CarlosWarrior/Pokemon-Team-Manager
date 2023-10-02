const { genSaltSync, hashSync, compare } = require('bcrypt')
const { sign, verify } = require('jsonwebtoken')

const hash = text => hashSync(text, genSaltSync(16), null)
const compareHash = (text, pass) => new Promise(resolve => compare(text, pass, (b,attempt) => resolve(attempt)))

const tokenize = value => sign(value, process.env.key)
const decode = value => verify(value, process.env.key)

module.exports = {
    hash,
    compareHash,
    tokenize,
    decode
}