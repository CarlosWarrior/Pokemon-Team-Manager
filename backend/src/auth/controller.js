const { raise } = require("../middlewares/errors")
const { User } = require("./models")
const { isExpired } = require('../utils/dates')
const { tokenize, decode, compareHash, randomString } = require("./crypto")
const { ses } = require('../services/aws')
const user_email_confirmation_email = require('../mails/user_email_confirmation')

const AuthController = {
    google: async(req, res)=>{
        if(!req.body.credential || !req.body.select_by)
            return raise({ status: 400 })
        
        const gtoken = req.body.credential
        let decoded;
        try {
            decoded = decode(gtoken)
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

        const token = tokenize({ ...user.toJSON(), date: new Date().toISOString() })
        return res.send({ token })
    },
    login: async(req, res)=>{
        if(!req.body.password || !req.body.email)
            return raise({status: 400})

        const email = req.body.email
        const password = req.body.password
        
        const user = await User.findOne({ filter:{ email } })
        if(!user)
            return raise({ status:401, message: "User does not exists" })
        
        const attempt = compareHash(password, user.password)
        if(!attempt)
            return raise({ status:401, message: "Invalid credentials" })

        const token = tokenize({ ...user.toJSON(), date: new Date().toISOString() })
        return res.send({ token })
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

        const token = tokenize({ ...user.toJSON(), date: new Date().toISOString() })
        return res.send({ token })
    },
    register: async(req, res)=>{
        if(!req.body.password || !req.body.email || !req.body.name)
            return raise({status: 400})
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        
        let user = await User.findOne({filter:{ email }})
        if(user)
            return raise({status:400})

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
        res.send('auth register token')
    },
    admin_register: async(req, res)=>{
        res.send('auth register')
    },
    password_reset_token: async(req, res)=>{
        res.send('auth password reset token')
    },
    password_reset: async(req, res)=>{
        res.send('auth password reset')
    },
}

module.exports = AuthController