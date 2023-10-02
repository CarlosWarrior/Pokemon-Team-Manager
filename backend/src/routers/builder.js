const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const BuilderController = require('../controllers/builder')

const BuilderRouter = Router()
BuilderRouter.get('/', audit('Builder-list'), _catch(BuilderController.data))

module.exports = BuilderRouter