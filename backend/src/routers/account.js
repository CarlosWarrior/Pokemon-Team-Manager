const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const AccountController = require('../controllers/account')

const AccountRouter = Router()
/**
 * @swagger
 * /user/account/:
 *  get:
 *      description: Endpoint to get the current user's account
 *      tags:
 *          - user/account
 *      parameters:
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: user token not provided
 *          401:
 *              description: user token invalid
 *          200:
 *              description: Current user's account sent
 *          
 */
AccountRouter.get('/', audit('Account-get'), _catch(AccountController.get))

/**
 * @swagger
 * /user/account/:
 *  put:
 *      description: Endpoint to update the current user's account
 *      tags:
 *          - user/account
 *      parameters:
 *          - in: body
 *            name: credentials
 *            schema:
 *              type: object
 *              properties:
 *                  password:
 *                      type: string
 *                      example: "pass"
 *                  new_password:
 *                      type: string
 *                      example: "pass2"
 *                  new_password_confirmation:
 *                      type: string
 *                      example: "pass2"
 *              required:
 *                  - password
 *                  - new_password
 *                  - new_password_confirmation
 *      responses:
 *          400:
 *              description: user token not provided
 *          401:
 *              description: admin token invalid
 *          422:
 *              description: password or new_password or new_password_confirmation not provided, or new_password and new_password_confirmation do not match
 *          200:
 *              description: Account updated
 *          
 */
AccountRouter.put('/', audit('Account-update'), _catch(AccountController.update))

module.exports = AccountRouter