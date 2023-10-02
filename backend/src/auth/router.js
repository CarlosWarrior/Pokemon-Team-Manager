const {Router} = require('express')
const {_catch} = require('../middlewares/errors')
const AuthController = require('./controller')

const AuthRouter = Router()
AuthRouter.post('/login', _catch(AuthController.login))
AuthRouter.post('/register', _catch(AuthController.register))
AuthRouter.post('/password_reset', _catch(AuthController.password_reset))

module.exports = AuthRouter