const {Router} = require('express')
const {_catch} = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const AuthController = require('./controller')

const AuthRouter = Router()
AuthRouter.post('/google', audit('Auth-google'), _catch(AuthController.google))
AuthRouter.post('/login', audit('Auth-login'), _catch(AuthController.login))
AuthRouter.post('/register', audit('Auth-register'), _catch(AuthController.register))
AuthRouter.post('/confirm', audit('Auth-confirm'), _catch(AuthController.confirm))
AuthRouter.post('/password_reset', audit('Auth-password_reset'), _catch(AuthController.password_reset))
AuthRouter.post('/admin_register_token', audit('Auth-admin_register_token'), _catch(AuthController.admin_register_token))
AuthRouter.post('/admin_register', audit('Auth-admin_register'), _catch(AuthController.admin_register))

module.exports = AuthRouter