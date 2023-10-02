const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const PokemonController = require('../controllers/pokemon')

const PokemonRouter = Router()
PokemonRouter.get('/', audit('Pokemon-list'), _catch(PokemonController.list))
PokemonRouter.get('/:name', audit('Pokemon-get'), _catch(PokemonController.get))
PokemonRouter.post('/', audit('Pokemon-create'), _catch(PokemonController.create))

module.exports = PokemonRouter