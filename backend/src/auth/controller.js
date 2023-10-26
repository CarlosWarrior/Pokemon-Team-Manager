const { raise } = require("../middlewares/errors")
const { User, Admin } = require("./models")
const { isExpired } = require('../utils/dates')
const { tokenize, decode, compareHash, randomString, encrypt, decrypt, jwt } = require("./crypto")
const { ses } = require('../services/aws')
const user_email_confirmation_email = require('../mails/user_email_confirmation')
const admin_register_token_email = require('../mails/admin_register_token')
const password_reset_token_email = require('../mails/password_reset_token')

const AuthController = {
    google: async(req, res)=>{
        if(!req.body.credential || !req.body.select_by)
            return raise({ status: 400 })
        const gtoken = req.body.credential
        let decoded;
        try {
            decoded = jwt(gtoken)
        } catch (error) {
            return raise({ status: 400, message: "Invalid token", error })
        }
        
        let user = await User.findOne({ filter: { email: decoded.email } })
        if(!user){
            try {
                user = await User.create({
                    name: decoded.name,
                    email: decoded.email,
                    password: decoded.sub,
                    valid: true
                })
            } catch (error) {
                return raise({ status: 400, message: "Invalid payload", error })
            }
        }
        user = user.toJSON()
        user['role'] = 'user'
        const token = tokenize({ ...user, date: new Date().toISOString() })
        return res.send({ user, token })
    },
    login: async(req, res)=>{
        if(!req.body.password || !req.body.email)
            return raise({status: 400})

        const email = req.body.email
        const password = req.body.password
        
        let user = await User.findOne({ filter:{ email } })
        if(!user)
            return raise({ status:401, message: "User does not exists" })
        
        const attempt = await compareHash(password, user.password)
        if(!attempt)
            return raise({ status:401, message: "Invalid credentials" })

        user = user.toJSON()
        user['role'] = 'user'
        const token = tokenize({ ...user, date: new Date().toISOString() })
        return res.send({ user, token })
    },
    confirm: async(req, res) => {
        if(!req.headers.token)
            return raise({status:400, message: "Token missing"})

        const confirmation_token = req.headers.token
        
        let decoded
        try {
            decoded = decode(confirmation_token)
        } catch (error) {
            return raise({ status: 400, message: "Invalid token" })
        }
        
        if(!decoded.user || !decoded.date)
            return raise({ status: 400, message: "Malformed token" })
        if(isExpired(decoded.date))
            return raise({ status: 400, message: "Token expired" })
        
        let user
        try {
            user = await User.findById(decoded.user._id)
        } catch (error) {
            return raise({ status: 400, message: "Malformed expired" })
        }
        if(!user)
            return raise({ status: 400, message: "Inexistent user" })

        user.valid = true
        await user.save()

        user = user.toJSON()
        user['role'] = 'user'
        const token = tokenize({ ...user, date: new Date().toISOString() })
        return res.send({ user, token })
    },
    register: async(req, res)=>{
        if(!req.body.password || !req.body.email || !req.body.name)
            return raise({status: 400})
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        
        let user = await User.findOne({filter:{ email }})
        if(user)
            return raise({status:400, message: "Account exists"})

        try {
           user = await User.create({ name, email, password })
        } catch (error) {
            return raise({status: 400, message: "Invalid user body", error})
        }

        const token = tokenize({ user:user.toJSON(), date: new Date().toISOString(), random: randomString(16) })

        ses.sendEmail(user_email_confirmation_email({ token, ToAddresses:[email] }))
            .then(() => res.sendStatus(200))
            .catch((error) => raise({status:500, message:"Email failed", error}))
        
    },
    admin_register_token: async(req, res)=>{
        if(!req.body.email)
            return raise({status: 400})
        const email = req.body.email
        let admin = await Admin.findOne({filter:{ email }})
        if(admin)
            return raise({status:400, message: "Admin already exists"})  
        const tokenData = { email, date: new Date().toISOString(), random: randomString(16)}
        const stringTokenData = JSON.stringify(tokenData)
        const token = encrypt(stringTokenData)
        ses.sendEmail(admin_register_token_email({ token, ToAddresses:[email] }))
            .then(() => res.sendStatus(200))
            .catch((error) => raise({status:500, message:"Email failed", error}))
    },
    admin_register: async(req, res)=>{
        if(!req.body.password || !req.body.name)
            return raise({status: 400})
        if(!req.headers.token)
            return raise({status:400, message: "Token missing"})
        const register_token = req.headers.token
        console.log(register_token)
        let decrypted
        try {
            decrypted = JSON.parse(decrypt(register_token))
        } catch (error) {
            return raise({status:400, message: "Invalid token", error})
        }
        if(!decrypted.email || !decrypted.date || !decrypted.random)
            return raise({status:400, message: "Malformed token"})
        if(isExpired(decrypted.date))
            return raise({status:400, message: "Token expired"})
        const email = decrypted.email
        let admin = await Admin.findOne({filter:{ email}})
        if(admin)
            return raise({status:400, message: "Admin already exists"})
        const name = req.body.name
        const password = req.body.password
        try {
            admin = await Admin.create({ name, email, password })
        } catch (error) {
            return raise({status: 400, message: "Invalid admin body", error})
        }
        const token = tokenize({...admin.toJSON(), date: new Date().toISOString() })
        return res.send({ token })

    },
    admin_login: async(req, res)=>{
        if(!req.body.password || !req.body.email)
            return raise({status: 400})

        const email = req.body.email
        const password = req.body.password
        
        let admin = await Admin.findOne({ filter:{ email } })
        if(!admin)
            return raise({ status:401, message: "Admin does not exists" })
        
        const attempt = await compareHash(password, admin.password)
        if(!attempt)
            return raise({ status:401, message: "Invalid credentials" })

        admin = admin.toJSON()
        admin['role'] = 'admin'
        const token = tokenize({ ...admin, date: new Date().toISOString() })
        return res.send({ user: admin, token })
    },
    password_reset_token: async(req, res)=>{
        if(!req.body.email)
            return raise({status: 400, message: "Email missing"})
        const email = req.body.email
        const user = await User.findOne({filter:{ email }})
        if(!user)
            return raise({status:400, message: "User does not exists"})
        const tokenData = { email, date: new Date().toISOString(), random: randomString(16)}
        const stringTokenData = JSON.stringify(tokenData)
        const token = encrypt(stringTokenData)
        ses.sendEmail(password_reset_token_email({ token, ToAddresses:[email] }))
            .then(() => res.sendStatus(200))
            .catch((error) => raise({status:500, message:"Email failed", error}))
    },
    password_reset: async(req, res)=>{
        if(!req.headers.token)
            return raise({status:400, message: "Token missing"})
        if(!req.body.password)
            return raise({status:400, message: "Password missing"})
        
        const token = req.headers.token
        let decrypted 
        try {
            decrypted = JSON.parse(decrypt(token))
        } catch (error) {
            return raise({status:400, message: "Invalid token", error})
        }
        if( !decrypted.email || !decrypted.date || !decrypted.random)
            return raise({status:400, message: "Malformed token"})
        if(isExpired(decrypted.date))
            return raise({status:400, message: "Token expired"})
        const email = decrypted.email
        const user = await User.findOne({filter:{ email }})
        if(!user)
            return raise({status:400, message: "User does not exists"})

        const password = req.body.password
        user.password = password
        await user.save()
        res.sendStatus(200)

    },
}

module.exports = AuthController