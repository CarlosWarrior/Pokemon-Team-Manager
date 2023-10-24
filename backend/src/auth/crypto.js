const { genSaltSync, hashSync, compare } = require('bcrypt')
const { sign, verify } = require('jsonwebtoken')
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


const encrypt = (message) => {
  const cipher = createCipheriv(algorithm, key, iv);
  return `${cipher.update(message, "utf-8", "hex")}${cipher.final("hex")}`;
};

const decrypt = (message) => {
  const decipher = createDecipheriv(algorithm, key, iv);
  return `${decipher.update(message, "hex", "utf-8")}${decipher.final(
    "utf-8"
  )}`;
};


module.exports = {
    randomString,
    hash,
    compareHash,
    tokenize,
    decode,
    encrypt,
    decrypt
}