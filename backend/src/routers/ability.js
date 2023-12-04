const multer = require('multer')
const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const storage = require('../middlewares/storage')
const AbilityController = require('../controllers/ability')

const AbilityRouter = Router()
/**
 * @swagger
 * /admin/ability/:
 *  get:
 *      description: Endpoint to get a list of abilitites
 *      tags:
 *          - admin/ability
 *      parameters:
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: A list of abilitites is sent
 *          
 */
AbilityRouter.get('/', audit('Ability-list'), _catch(AbilityController.list))

/**
 * @swagger
 * /admin/ability/{name}:
 *  get:
 *      description: Endpoint to get a single ability
 *      tags:
 *          - admin/ability
 *      parameters:
 *          - in: path
 *            name: name
 *            required: true
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: A single ability is sent
 *          
 */
AbilityRouter.get('/:name', audit('Ability-get'), _catch(AbilityController.get))

/**
 * @swagger
 * /admin/ability/:
 *  post:
 *      description: Endpoint to create an ability
 *      tags:
 *          - admin/ability
 *      parameters:
 *          - in: body
 *            name: ability
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "overgrow"
 *                  effect:
 *                      type: string
 *                      example: "Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less."
 *              required:
 *                  - name
 *                  - effect
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: name or effect not provided
 *          200:
 *              description: Ability created
 *          
 */
AbilityRouter.post('/', audit('Ability-create'), _catch(AbilityController.create))

/**
 * @swagger
 * /admin/ability/:
 *  put:
 *      description: Endpoint to update an ability
 *      tags:
 *          - admin/ability
 *      parameters:
 *          - in: body
 *            name: ability
 *            schema:
 *              type: object
  *              properties:
 *                  _id:
 *                      type: string
 *                      example: "id"
 *                  name:
 *                      type: string
 *                      example: "overgrow"
 *                  effect:
 *                      type: string
 *                      example: "Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less."
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: Ability updated
 *          
 */
AbilityRouter.put('/', audit('Ability-update'), _catch(AbilityController.update))

/**
 * @swagger
 * /admin/ability/bulk:
 *  post:
 *      description: Endpoint to create abilities in bulk
 *      tags:
 *          - admin/ability
 *      parameters:
 *          - in: body
 *            name: ability
 *            schema:
 *              abilityData: object
 *              properties:
 *                  file:
 *                      type: file
 *              required:
 *                  - file
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: invalid file
 *          200:
 *              description: Abilitis created
 *          
 */
AbilityRouter.post('/bulk', audit('Ability-bulk-create'), storage.abilitiesCleanup, multer({ storage: storage.abilitiesStorage }).single('file'), _catch(AbilityController.bulkCreate))


/**
 * @swagger
 * /admin/ability/:
 *  delete:
 *      description: Endpoint to remove a single ability
 *      tags:
 *          - admin/ability
 *      parameters:
 *          - in: body
 *            abilitites: array
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: Ability is assigned to a Pokémon
 *          200:
 *              description: A single ability is removed
 *          
 */
AbilityRouter.delete('/', audit('Ability-delete'), _catch(AbilityController.delete))

module.exports = AbilityRouter