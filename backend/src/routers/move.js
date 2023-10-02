const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const MoveController = require('../controllers/move')

const MoveRouter = Router()
MoveRouter.get('/', audit('Move-list'), _catch(MoveController.list))
MoveRouter.get('/:name', audit('Move-get'), _catch(MoveController.get))
MoveRouter.post('/', audit('Move-create'), _catch(MoveController.create))

module.exports = MoveRouter