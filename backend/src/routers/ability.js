const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const AbilityController = require('../controllers/ability')

const AbilityRouter = Router()
AbilityRouter.get('/', audit('Ability-list'), _catch(AbilityController.list))
AbilityRouter.get('/:name', audit('Ability-get'), _catch(AbilityController.get))
AbilityRouter.post('/', audit('Ability-create'), _catch(AbilityController.create))

module.exports = AbilityRouter