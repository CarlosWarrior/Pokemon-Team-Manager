const {Router} = require('express')
const { _catch } = require('./middlewares/errors')
const log = require('./middlewares/log')
const {admin, user} = require('./auth/middlewares')
const AuthRouter = require('./auth/router')

const AdminRouter = Router().use(_catch(admin))
AdminRouter.use('/pokemon', require('./routers/pokemon'))
AdminRouter.use('/item', require('./routers/item'))
AdminRouter.use('/move', require('./routers/move'))
AdminRouter.use('/ability', require('./routers/ability'))

const UserRouter = Router().use(_catch(user))
UserRouter.use('/builder', require('./routers/builder'))
UserRouter.use('/team', require('./routers/team'))
UserRouter.use('/battle', require('./routers/battle'))
UserRouter.use('/account', require('./routers/account'))

const AppRouter = Router().use(log)
AppRouter.use('/auth', AuthRouter)
AppRouter.use('/admin', AdminRouter)
AppRouter.use('/user', UserRouter)

module.exports = AppRouter