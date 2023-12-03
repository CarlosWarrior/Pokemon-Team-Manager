const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const TeamController = require('../controllers/team')

const TeamRouter = Router()
/**
 * @swagger
 * /admin/team/:
 *  get:
 *      description: Endpoint to get a list of teams
 *      tags:
 *          - admin/team
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
 *              description: A list of teams is sent
 *          
 */
TeamRouter.get('/', audit('Team-list'), _catch(TeamController.list))

/**
 * @swagger
 * /admin/team/{name}:
 *  get:
 *      description: Endpoint to get a single team
 *      tags:
 *          - admin/team
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
 *              description: A team is sent
 *          
 */
TeamRouter.get('/:name', audit('Team-get'), _catch(TeamController.get))

/**
 * @swagger
 * /admin/team/:
 *  post:
 *      description: Endpoint to create a team
 *      tags:
 *          - admin/team
 *      parameters:
 *          - in: body
 *            name: team
 *            schema:
 *              type: object
 *              properties:
 *                  slots:
 *                      type: array
 *                      items: object
 *                  name:
 *                      type: string
 *                      example: "teamTrickRoom"
 *              required:
 *                  - name
 *                  - slots
 * 
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: team created
 *          
 */
TeamRouter.post('/', audit('Team-create'), _catch(TeamController.create))

/**
 * @swagger
 * /admin/team/:
 *  put:
 *      description: Endpoint to create a team
 *      tags:
 *          - admin/team
 *      parameters:
 *          - in: body
 *            name: team
 *            schema:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: "id"
 *                  user: 
 *                      type: string
 *                      example: "user"
 *                  name:
 *                      type: string
 *                      example: "teamTrickRoom2"
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: team created
 *          
 */
TeamRouter.put('/', audit('Team-update'), _catch(TeamController.update))

/**
 * @swagger
 * /admin/team/:
 *  delete:
 *      description: Endpoint to remove a team
 *      tags:
 *          - admin/team
 *      parameters:
 *          - in: body
 *            types: array
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
 *          200:
 *              description: A team is removed
 *          
 */
TeamRouter.delete('/', audit('Team-delete'), _catch(TeamController.delete))

module.exports = TeamRouter