const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const ItemController = require('../controllers/item')

const ItemRouter = Router()
/**
 * @swagger
 * /admin/item/:
 *  get:
 *      description: Endpoint to get a list of items
 *      tags:
 *          - admin/item
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
 *              description: A list of items is sent
 *      
 */
ItemRouter.get('/', audit('Item-list'), _catch(ItemController.list))
/**
 * @swagger
 * /admin/item/{name}:
 *  get:
 *      description: Endpoint to get a single item
 *      tags:
 *          - admin/item
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
 *              description: A single item is sent
 *          
 */
ItemRouter.get('/:name', audit('Item-get'), _catch(ItemController.get))

/**
 * @swagger
 * /admin/item/:
 *  post:
 *      description: Endpoint to create an item
 *      tags:
 *          - admin/item
 *      parameters:
 *          - in: body
 *            name: item
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "Assault Vest"
 *                  effect:
 *                      type: string
 *                      example: "The Assault Vest increases its Special Defense by 50%, but it doesn't allow the selection of status moves."
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
 *              description: item created
 *          
 */
ItemRouter.post('/', audit('Item-create'), _catch(ItemController.create))

/**
 * @swagger
 * /admin/item/:
 *  put:
 *      description: Endpoint to update an item
 *      tags:
 *          - admin/item
 *      parameters:
 *          - in: body
 *            name: item
 *            schema:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: "id"
 *                  name:
 *                      type: string
 *                      example: "Assault Vest"
 *                  effect:
 *                      type: string
 *                      example: "The Assault Vest increases its Special Defense by 50%, but it doesn't allow the selection of status moves."
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: item updated
 *          
 */
ItemRouter.put('/', audit('Item-update'), _catch(ItemController.update))

/**
 * @swagger
 * /admin/item/:
 *  delete:
 *      description: Endpoint to remove a single item
 *      tags:
 *          - admin/item
 *      parameters:
 *          - in: body
 *            items: items
 *            schema:
 *              type: array
 *              items:
 *                  type: string
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
 *              description: item is assigned to a Pokémon
 *          200:
 *              description: A single item is removed
 *          
 */
ItemRouter.delete('/', audit('Item-delete'), _catch(ItemController.delete))


module.exports = ItemRouter



