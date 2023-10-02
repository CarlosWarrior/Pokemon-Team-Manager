const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const ItemController = require('../controllers/item')

const ItemRouter = Router()
ItemRouter.get('/', audit('Item-list'), _catch(ItemController.list))
ItemRouter.get('/:name', audit('Item-get'), _catch(ItemController.get))
ItemRouter.post('/', audit('Item-create'), _catch(ItemController.create))

module.exports = ItemRouter