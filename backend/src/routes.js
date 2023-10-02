const {Router} = require('express')
const log = require('./middlewares/log')

const AuthRouter = require('./auth/router')

const AppRouter = Router().use(log)
AppRouter.use('/auth', AuthRouter)

module.exports = AppRouter