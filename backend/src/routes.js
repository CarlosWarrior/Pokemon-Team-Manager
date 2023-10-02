const {Router} = require('express')
const { _catch } = require('./middlewares/errors')
const log = require('./middlewares/log')
const {admin} = require('./auth/middlewares')
const AuthRouter = require('./auth/router')

const AdminRouter = Router().use(_catch(admin))
AdminRouter.use('/pokemon', require('./routers/pokemon'))
AdminRouter.use('/item', require('./routers/item'))
AdminRouter.use('/move', require('./routers/move'))
AdminRouter.use('/nature', require('./routers/nature'))
AdminRouter.use('/ability', require('./routers/ability'))

const AppRouter = Router().use(log)
AppRouter.use('/auth', AuthRouter)
AppRouter.use('/admin', AdminRouter)

module.exports = AppRouter