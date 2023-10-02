const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const TeamController = require('../controllers/team')

const TeamRouter = Router()
TeamRouter.get('/', audit('Team-list'), _catch(TeamController.list))
TeamRouter.get('/:name', audit('Team-get'), _catch(TeamController.get))
TeamRouter.post('/', audit('Team-create'), _catch(TeamController.create))
TeamRouter.put('/', audit('Team-update'), _catch(TeamController.update))

module.exports = TeamRouter