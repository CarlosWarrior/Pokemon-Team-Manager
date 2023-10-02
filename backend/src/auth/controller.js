const { raise } = require("../middlewares/errors")
const AuthController = {
    login: async(req, res)=>{
        res.send('auth login')
    },
    register: async(req, res)=>{
        res.send('auth register')
    },
    password_reset: async(req, res)=>{
        res.send('auth password reset')
    },
}

module.exports = AuthController