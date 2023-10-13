const {Router} = require('express')
const { _catch } = require('../middlewares/errors')
const audit = require('../middlewares/audit')
const PokemonController = require('../controllers/pokemon')

const PokemonRouter = Router()
/**
 * @swagger
 * /admin/pokemon/:
 *  get:
 *      description: Endpoint to get a list of pokemons
 *      tags:
 *          - admin/pokemon
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
 *              description: A list of pokemons is sent
 */
PokemonRouter.get('/', audit('Pokemon-list'), _catch(PokemonController.list))

/**
 * @swagger
 * /admin/pokemon/{name}:
 *  get:
 *     description: Endpoint to get a single pokemon
 *     tags:
 *        - admin/pokemon
 *     parameters:
 *        - in: path
 *          name: name
 *          required: true
 *        - in: header
 *          name: token
 *          required: true
 *     responses:
 *       400:
 *          description: admin token not provided
 *       401:
 *          description: admin token invalid
 *       200:
 *          description: A single pokemon is sent
 */
PokemonRouter.get('/:name', audit('Pokemon-get'), _catch(PokemonController.get))

/**
 * @swagger
 * /admin/pokemon/:
 *  post:
 *      description: Endpoint to create a pokemon
 *      tags:
 *          - admin/pokemon
 *      parameters:
 *          - in: body
 *            name: pokemon
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "bulbasaur"
 *                  type1:
 *                      type: string
 *                      example: "grass"
 *                  type2:
 *                      type: string
 *                      example: "poison"
 *                  img:
 *                      type: string
 *                      example: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
 *                  movesArray:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              type:
 *                                  type: string
 *                              category:
 *                                  type: string
 *                              power:
 *                                  type: integer
 *                              accuracy:
 *                                  type: integer
 *                              pp:
 *                                  type: integer
 *                              effect:
 *                                 type: string
 *                      example: [{"name": "razor-wind", "type": "normal", "category": "special", "power": 80, "accuracy": 100, "pp": 10, "effect": "Inflicts regular damage. User must recharge on the next turn and cannot attack."}, {"name": "swords-dance", "type": "normal", "category": "status", "power": null, "accuracy": null, "pp": 20, "effect": "Raises the user's Attack by two stages."}]
 *                  abilityArray:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              effect:
 *                                  type: string
 *                      example: [{"name": "overgrow", "effect": "When HP is below 1/3rd its maximum, power of Grass-type moves is increased by 50%."}, {"name": "chlorophyll", "effect": "When sunny, the Pokémon’s Speed doubles. However, Speed will not double on the turn weather becomes Clear Skies."}]
 *                  stats:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 1
 *                          hp:
 *                              type: integer
 *                              example: 45
 *                          attack:
 *                              type: integer
 *                              example: 49
 *                          defense:
 *                              type: integer
 *                              example: 49
 *                          specialAttack:
 *                              type: integer
 *                              example: 65
 *                          specialDefense:
 *                              type: integer
 *                              example: 65
 *                          speed:
 *                              type: integer
 *                              example: 45
 *              required:
 *                  - name
 *                  - type1
 *                  - type2
 *                  - img
 *                  - movesArray
 *                  - abilityArray
 *                  - stats
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
 *              description: Ability created
 *          
 */
PokemonRouter.post('/', audit('Pokemon-create'), _catch(PokemonController.create))

/**
 * @swagger
 * /admin/pokemon/:
 *  post:
 *      description: Endpoint to create a pokemon
 *      tags:
 *          - admin/pokemon
 *      parameters:
 *          - in: body
 *            name: pokemon
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: "bulbasaur"
 *                  type1:
 *                      type: string
 *                      example: "grass"
 *                  type2:
 *                      type: string
 *                      example: "poison"
 *                  img:
 *                      type: string
 *                      example: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
 *                  movesArray:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              type:
 *                                  type: string
 *                              category:
 *                                  type: string
 *                              power:
 *                                  type: integer
 *                              accuracy:
 *                                  type: integer
 *                              pp:
 *                                  type: integer
 *                              effect:
 *                                 type: string
 *                      example: [{"name": "razor-wind", "type": "normal", "category": "special", "power": 80, "accuracy": 100, "pp": 10, "effect": "Inflicts regular damage. User must recharge on the next turn and cannot attack."}, {"name": "swords-dance", "type": "normal", "category": "status", "power": null, "accuracy": null, "pp": 20, "effect": "Raises the user's Attack by two stages."}]
 *                  abilityArray:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              effect:
 *                                  type: string
 *                      example: [{"name": "overgrow", "effect": "When HP is below 1/3rd its maximum, power of Grass-type moves is increased by 50%."}, {"name": "chlorophyll", "effect": "When sunny, the Pokémon’s Speed doubles. However, Speed will not double on the turn weather becomes Clear Skies."}]
 *                  stats:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 1
 *                          hp:
 *                              type: integer
 *                              example: 45
 *                          attack:
 *                              type: integer
 *                              example: 49
 *                          defense:
 *                              type: integer
 *                              example: 49
 *                          specialAttack:
 *                              type: integer
 *                              example: 65
 *                          specialDefense:
 *                              type: integer
 *                              example: 65
 *                          speed:
 *                              type: integer
 *                              example: 45
 *          - in: header
 *            name: token
 *            required: true
 *      responses:
 *          400:
 *              description: admin token not provided
 *          401:
 *              description: admin token invalid
 *          200:
 *              description: Ability created
 *          
 */
PokemonRouter.put('/', audit('Pokemon-update'), _catch(PokemonController.update))

/**
 * @swagger
 * /admin/pokemon/{name}:
 *  delete:
 *      description: Endpoint to remove a pokemon
 *      tags:
 *          - admin/pokemon
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
 *              description: A pokemon is removed
 *          
 */
PokemonRouter.delete('/:name', audit('Pokemon-delete'), _catch(PokemonController.delete))

module.exports = PokemonRouter