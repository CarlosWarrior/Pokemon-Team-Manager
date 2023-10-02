const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const AccountController = require('../controllers/account')

const AccountRouter = Router()
AccountRouter.get('/', audit('Account-get'), _catch(AccountController.get))
AccountRouter.put('/', audit('Account-update'), _catch(AccountController.update))

module.exports = AccountRouter