const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const TypeController = require('../controllers/type')

const TypeRouter = Router()
/**
 * @swagger
 * /admin/type/:
 *  get:
 *      description: Endpoint to get a list of abilitites
 *      tags:
 *          - admin/type
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
TypeRouter.get('/', audit('Type-list'), _catch(TypeController.list))

/**
 * @swagger
 * /admin/type/{name}:
 *  get:
 *      description: Endpoint to get a single type
 *      tags:
 *          - admin/type
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
 *              description: A single type is sent
 *          
 */
TypeRouter.get('/:name', audit('Type-get'), _catch(TypeController.get))

/**
 * @swagger
 * /admin/type/:
 *  post:
 *      description: Endpoint to create a type
 *      tags:
 *          - admin/type
 *      parameters:
 *          - in: body
 *            name: type
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "Fire"
 *                  color:
 *                      type: string
 *                      example: "#5A5A5A"
 *                  image:
 *                      type: string
 *                      example: "https://archives.bulbagarden.net/media/upload/5/5e/Fire_icon.png"
 *                  teracrystalImage:
 *                      type: string
 *                      example: "https://richi3f.github.io/pokemon-team-planner/static/img/type/fire_tera.png"
 *              required:
 *                  - name
 *                  - color
 *                  - image
 *                  - teracrystalImage
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: name or color or image or teracrystalImage not provided
 *          200:
 *              description: Type created
 *          
 */
TypeRouter.post('/', audit('Type-create'), _catch(TypeController.create))

/**
 * @swagger
 * /admin/type/:
 *  put:
 *      description: Endpoint to update an type
 *      tags:
 *          - admin/type
 *      parameters:
 *          - in: body
 *            name: type
 *            schema:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: "id"
 *                  name:
 *                      type: string
 *                      example: "Fire"
 *                  color:
 *                      type: string
 *                      example: "#5A5A5A"
 *                  image:
 *                      type: string
 *                      example: "https://archives.bulbagarden.net/media/upload/5/5e/Fire_icon.png"
 *                  teracrystalImage:
 *                      type: string
 *                      example: "https://richi3f.github.io/pokemon-team-planner/static/img/type/fire_tera.png"
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
 *              description: Type updateds
 *          
 */
TypeRouter.put('/', audit('Type-update'), _catch(TypeController.update))

/**
 * @swagger
 * /admin/type/:
 *  delete:
 *      description: Endpoint to remove a single type
 *      tags:
 *          - admin/type
 *      parameters:
 *          - in: body
 *            moves: array
 *            items:
 *              type: string
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: Type is assigned to a Pokémon
 *          200:
 *              description: A single type is removed
 *          
 */
TypeRouter.delete('/', audit('Type-delete'), _catch(TypeController.delete))

module.exports = TypeRouter