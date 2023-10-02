const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const BattleController = require('../controllers/battle')

const BattleRouter = Router()
BattleRouter.get('/', audit('Battle-list'), _catch(BattleController.list))
BattleRouter.get('/:name', audit('Battle-get'), _catch(BattleController.get))
BattleRouter.post('/', audit('Battle-create'), _catch(BattleController.create))

module.exports = BattleRouter