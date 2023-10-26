const {Router} = require('express')
const {_catch} = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const { admin } = require('../auth/middlewares')
const AuthController = require('../auth/controller')

const AuthRouter = Router()
/**
 * @swagger
 * /auth/google/:
 *  post:
 *      description: Endpoint to login or register with google
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: google credentials
 *            schema:
 *              type: object
 *              properties:
 *                  credential:
 *                      type: string
 *                      example: ""
 *                  select_by:
 *                      type: string
 *                      example: ""
 *              required:
 *                  - credential
 *                  - select_by
 *      responses:
 *          400:
 *              description: credential or selected_by not provided or invalid credential or payload

 *          200:
 *              description: Logged in with google and token provided
 *          
 */
AuthRouter.post('/google', audit('Auth-google'), _catch(AuthController.google))

/**
 * @swagger
 * /auth/login/:
 *  post:
 *      description: Endpoint to login with email and password
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: credentials
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      example: "example@example.com"
 *                  password:
 *                      type: string
 *                      example: "Password123"
 *              required:
 *                  - email
 *                  - password

 *      responses:
 *          400:
 *              description: email or password not provided
 *          401:
 *              description: user invalid or attempt failed
 *          200:
 *              description: Logged in and token provided
 *          
 */
AuthRouter.post('/login', audit('Auth-login'), _catch(AuthController.login))

/**
 * @swagger
 * /auth/confirm/:
 *  post:
 *      description: Endpoint to confirm an email
 *      tags:
 *          - auth
 *      parameters:
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: confirmation token not provided or expired or invalid
 *          200:
 *              description: Ability created
 *          
 */
AuthRouter.post('/confirm', audit('Auth-confirm'), _catch(AuthController.confirm))

/**
 * @swagger
 * /auth/register/:
 *  post:
 *      description: Endpoint to register
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: registration
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "Name"
 *                  email:
 *                      type: string
 *                      example: "example@example.com"
 *                  password:
 *                      type: string
 *                      example: "Password123"
 *              required:
 *                  - name
 *                  - email
 *                  - password
 *      responses:
 *          400:
 *              description: name or email or password not provided or account exists
 *          200:
 *              description: Confirmation email sent
 *          
 */
AuthRouter.post('/register', audit('Auth-register'), _catch(AuthController.register))

/**
 * @swagger
 * /auth/admin_register_token/:
 *  post:
 *      description: Endpoint to create a token to register an admin
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: ability
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      example: "example@example.com"
 *              required:
 *                  - email
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided or email is linked to an admin
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: Admin register token created an sent vie email
 *          
 */
AuthRouter.post('/admin_register_token', admin, audit('Auth-admin_register_token'), _catch(AuthController.admin_register_token))

/**
 * @swagger
 * /auth/admin_register/:
 *  post:
 *      description: Endpoint to register as an admin
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: registration
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "Name"
 *                  password:
 *                      type: string
 *                      example: "example@example.com"
 *              required:
 *                  - name
 *                  - password
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin register token or name or password not provided or token is expired
 *          200:
 *              description: Admin registered
 *          
 */
AuthRouter.post('/admin_register', audit('Auth-admin_register'), _catch(AuthController.admin_register))

/**
 * @swagger
 * /auth/admin_login/:
 *  post:
 *      description: Endpoint to login with email and password as an admin
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: credentials
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      example: "example@example.com"
 *                  password:
 *                      type: string
 *                      example: "Password123"
 *              required:
 *                  - email
 *                  - password

 *      responses:
 *          400:
 *              description: email or password not provided
 *          401:
 *              description: admin invalid or attempt failed
 *          200:
 *              description: Logged in and token provided
 *          
 */
AuthRouter.post('/admin_login', audit('Auth-admin_login'), _catch(AuthController.admin_login))

/**
 * @swagger
 * /auth/password_reset_token/:
 *  post:
 *      description: Endpoint to create a password reset token
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: reset request
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      example: "example@example.com"
 *              required:
 *                  - email
 *      responses:
 *          400:
 *              description: email not provided or user exists
 *          200:
 *              description: Password reset token created and sent via email
 *          
 */
AuthRouter.post('/password_reset_token', audit('Auth-password_reset_token'), _catch(AuthController.password_reset_token))

/**
 * @swagger
 * /auth/password_reset/:
 *  post:
 *      description: Endpoint to reset a password
 *      tags:
 *          - auth
 *      parameters:
 *          - in: body
 *            name: password reset
 *            schema:
 *              type: object
 *              properties:
 *                  password:
 *                      type: string
 *                      example: "Password123"
 *              required:
 *                  - password
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: password reset token or password not provided or expired token
 *          200:
 *              description: Password reset
 *          
 */
AuthRouter.post('/password_reset', audit('Auth-password_reset'), _catch(AuthController.password_reset))

module.exports = AuthRouter