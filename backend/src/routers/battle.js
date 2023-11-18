const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const BattleController = require('../controllers/battle')

const BattleRouter = Router()
/**
 * @swagger
 * /user/battle/:
 *  get:
 *      description: Endpoint to get a list of battles
 *      tags:
 *          - user/battle
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
 *              description: A list of battles is sent
 *          
 */
BattleRouter.get('/', audit('Battle-list'), _catch(BattleController.list))

/**
 * @swagger
 * /user/battle/{name}:
 *  get:
 *      description: Endpoint to get a single ability
 *      tags:
 *          - user/battle
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
 *              description: A single battle is sent
 *          
 */
BattleRouter.get('/:name', audit('Battle-get'), _catch(BattleController.get))

/**
 * @swagger
 * /user/battle/:
 *  post:
 *      description: Endpoint to create a battle
 *      tags:
 *          - user/battle
 *      parameters:
 *          - in: body
 *            name: battle
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "overgrow"
 *                  team:
 *                      type: string
 *                      example: "team_id"
 *                  rival:
 *                      type: string
 *                      example: "rival_id"
 *              required:
 *                  - name
 *                  - team
 *                  - rival
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: name or team or rival not provided, or team or rival are invalid Team ids
 *          200:
 *              description: Battle created
 *          
 */
BattleRouter.post('/', audit('Battle-create'), _catch(BattleController.create))

/**
 * @swagger
 * /user/battle/add-log/:
 *  post:
 *      description: Endpoint to attach a BattleLog to a Battle
 *      tags:
 *          - user/battle
 *      parameters:
 *          - in: body
 *            name: battle-log
 *            schema:
 *              type: object
 *              properties:
 *                  battle:
 *                      type: string
 *                      example: "battle_id"
 *                  move:
 *                      type: string
 *                      example: "move_id"
 *                  target:
 *                      type: string
 *                      example: "slot_id"
 *                  initiator:
 *                      type: string
 *                      example: "slot_id"
 *                  outcome:
 *                      type: string
 *                      example: "death"
 *              required:
 *                  - move
 *                  - initiator
 *                  - target
 *                  - outcome
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: move or battle or target or initiator or outcome not provided, or battle is invalid Battle id, or move is invalid Move id, or initiator or target are ivalid Team Slot ids
 *          200:
 *              description: BattleLog attached
 *          
 */
BattleRouter.post('/add-log', audit('Battle-add-log'), _catch(BattleController.addLog))

module.exports = BattleRouter