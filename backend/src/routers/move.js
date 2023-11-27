const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const MoveController = require('../controllers/move')

const MoveRouter = Router()

/**
 * @swagger
 * /admin/move/:
 *  get:
 *      description: Endpoint to get a list of moves
 *      tags:
 *          - admin/move
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
 *              description: A list of moves is sent
 *          
 */
MoveRouter.get('/', audit('Move-list'), _catch(MoveController.list))
/**
 * @swagger
 * /admin/move/{name}:
 *  get:
 *      description: Endpoint to get a single move
 *      tags:
 *          - admin/move
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
 *              description: A single move is sent
 *          
 */
MoveRouter.get('/:name', audit('Move-get'), _catch(MoveController.get))
/**
 * @swagger
 * /admin/move/:
 *  post:
 *      description: Endpoint to create an move
 *      tags:
 *          - admin/move
 *      parameters:
 *          - in: body
 *            name: move
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "Karate Chop"
 *                  accuracy:
 *                      type: int
 *                      example: "100%"
 *                  damage_class:
 *                      type: string
 *                      example: "Physical"
 *                  power:
 *                      type: string
 *                      example: "50"
 *                  pp:
 *                      type: string
 *                      example: " 25 (max. 40)"
 *                  type:
 *                      type: string
 *                      example: "Fighting"
 *              required:
 *                  - name
 *                  - accuracy
 *                  - damage_class
 *                  - power
 *                  - pp
 *                  - type
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
 *              description: Move created
 *          
 */
MoveRouter.post('/', audit('Move-create'), _catch(MoveController.create))
/**
 * @swagger
 * /admin/move/:
 *  put:
 *      description: Endpoint to create an move
 *      tags:
 *          - admin/move
 *      parameters:
 *          - in: body
 *            name: move
 *            schema:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: "id"
 *                  name:
 *                      type: string
 *                      example: "Karate Chop"
 *                  accuracy:
 *                      type: int
 *                      example: "100%"
 *                  damage_class:
 *                      type: string
 *                      example: "Physical"
 *                  power:
 *                      type: string
 *                      example: "50"
 *                  pp:
 *                      type: string
 *                      example: " 25 (max. 40)"
 *                  type:
 *                      type: string
 *                      example: "Fighting"
 *              required:
 *                  - _id
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: Move updated
 *          
 */
MoveRouter.put('/', audit('Move-update'), _catch(MoveController.update))
/**
 * @swagger
 * /admin/move/:
 *  delete:
 *      description: Endpoint to remove a single move
 *      tags:
 *          - admin/move
 *      parameters:
 *          - in: body
 *            moves: array
 *            items:
 *              type: string
 *            example: ["id1", "id2"]
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: Move is assigned to a Pokémon
 *          200:
 *              description: A single move is removed
 *          
 */
MoveRouter.delete('/', audit('Move-delete'), _catch(MoveController.delete))

module.exports = MoveRouter