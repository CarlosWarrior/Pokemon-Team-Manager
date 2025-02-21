const { genSaltSync, hashSync, compare } = require('bcrypt')
const { sign, verify, decode:decode_raw } = require('jsonwebtoken')
const { createCipheriv,  createDecipheriv, randomBytes } = require('crypto') 
const secretkey = process.env.cipher_key
const ivkey = process.env.iv_key
const algorithm = 'aes-256-cbc'
const key = Buffer.from(secretkey, 'utf-8');
const iv = Buffer.from(ivkey, 'utf-8');

const randomString = (length) => {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let result = ''
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
	return result
}

const hash = text => hashSync(text, genSaltSync(16), null)
const compareHash = (text, pass) => new Promise(resolve => compare(text, pass, (b,attempt) => resolve(attempt)))

const tokenize = value => sign(value, process.env.key)
const decode = value => verify(value, process.env.key)
const jwt = value => decode_raw(value)


const encrypt = (message) => {
  const cipher = createCipheriv(algorithm, key, iv)
  let content = cipher.update(message, "utf-8", "hex")
  content += cipher.final("hex")
  return content
}

const decrypt = (message) => {
  const decipher = createDecipheriv(algorithm, key, iv)
  let content = decipher.update(message, "hex", "utf-8")
  content += decipher.final("utf-8")
  return content;
}


module.exports = {
    randomString,
    hash,
    compareHash,
    tokenize,
    decode,
    jwt,
    encrypt,
    decrypt
}