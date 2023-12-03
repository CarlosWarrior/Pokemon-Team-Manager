const path = require('path')
const {readdir, unlink, existsSync, mkdirSync } = require('fs')
const multer = require('multer')


if(!existsSync("./storage"))
	mkdirSync("./storage")
const types = './storage/types/'
if(!existsSync(types))
  mkdirSync(types)
const abilities = './storage/abilities/'
if(!existsSync(abilities))
  mkdirSync(abilities)
const moves = './storage/moves/'
if(!existsSync(moves))
  mkdirSync(moves)
const items = './storage/items/'
if(!existsSync(items))
  mkdirSync(items)
const pokemons = './storage/pokemons/'
if(!existsSync(pokemons))
  mkdirSync(pokemons)


const CleanUpMiddleware = (location) => (req, res, next) => {
	return new Promise((resolve, reject) => {
		return readdir(location, async(err, files) =>{
			if(!files.length) return resolve()
			else return await Promise.all(
				files.map(file => {
					return new Promise((_resolve, reject) => {
						unlink(path.join(location, file), _resolve)
					})
				})
			).then(resolve)
		})
	}).then(r => {
		next()
	})
}

const StorageMiddleware = (location) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, location),
  filename: (req, file, cb) => cb(null, file.originalname)
})

const typesCleanup = CleanUpMiddleware(types)
const typesStorage = StorageMiddleware(types)
const abilitiesCleanup = CleanUpMiddleware(abilities)
const abilitiesStorage = StorageMiddleware(abilities)
const movesCleanup = CleanUpMiddleware(moves)
const movesStorage = StorageMiddleware(moves)
const itemsCleanup = CleanUpMiddleware(items)
const itemsStorage = StorageMiddleware(items)
const pokemonsCleanup = CleanUpMiddleware(pokemons)
const pokemonsStorage = StorageMiddleware(pokemons)

const AppStorageMiddlewares = {
  typesCleanup,
  typesStorage,  
  abilitiesCleanup,
  abilitiesStorage,  
  movesCleanup,
  movesStorage,  
  itemsCleanup,
  itemsStorage,  
  pokemonsCleanup,
  pokemonsStorage,  
}
module.exports = AppStorageMiddlewares