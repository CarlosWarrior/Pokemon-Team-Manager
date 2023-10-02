const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const NatureController = require('../controllers/nature')

const NatureRouter = Router()
NatureRouter.get('/', audit('Nature-list'), _catch(NatureController.list))
NatureRouter.get('/:name', audit('Nature-get'), _catch(NatureController.get))
NatureRouter.post('/', audit('Nature-create'), _catch(NatureController.create))

module.exports = NatureRouter