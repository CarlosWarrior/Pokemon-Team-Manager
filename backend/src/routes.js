const {Router} = require('express')
const { _catch } = require('./middlewares/errors')
const log = require('./middlewares/log')
const {admin, user} = require('./auth/middlewares')
const AuthRouter = require('./routers/auth')

const AdminRouter = Router().use(_catch(admin))
AdminRouter.use('/pokemon', require('./routers/pokemon'))
AdminRouter.use('/item', require('./routers/item'))
AdminRouter.use('/move', require('./routers/move'))
AdminRouter.use('/ability', require('./routers/ability'))
AdminRouter.use('/type', require('./routers/type'))

const UserRouter = Router().use(_catch(user))
UserRouter.use('/team', require('./routers/team'))
UserRouter.use('/battle', require('./routers/battle'))
UserRouter.use('/account', require('./routers/account'))

const AppRouter = Router().use(log)
AppRouter.get('/', (req, res) => res.sendStatus(200))
AppRouter.use('/auth', AuthRouter)
AppRouter.use('/admin', AdminRouter)
AppRouter.use('/user', UserRouter)

module.exports = AppRouter