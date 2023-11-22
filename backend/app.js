if(process.env.build){
	console.log(require("fs").existsSync("../.env"))
	console.log(require("fs").existsSync("/etc/secrets/.env"))
	console.log("Using build configuration file")
	require('dotenv').config({path: "../.env"})
}
else{
	console.log("Using development configuration file")
	require('dotenv').config()
}

const express = require("express")
const { readFileSync, existsSync } = require('fs')
const app = express()
app.use(express.json())
app.use(require('helmet')({
	contentSecurityPolicy:{
		directives: {
			defaultSrc: ["'self'", 'data:', 'blob:',],
			
			fontSrc: ["'self'", 'https:', 'data:', "'unsafe-inline'"],
			
			scriptSrc: ["'self'",'https:', "'unsafe-inline'"],
			
			scriptSrcElem: ["'self'",'https:','https:', "'unsafe-inline'"],
			
			styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
			
			connectSrc: ["'self'", 'data','https:']
		},
	}
}))
app.use(require('cors')({origin:'*'}))  

if(process.env.production!=1){
	const swagger = require('swagger-ui-express')
	const swaggerConfig = require('swagger-jsdoc')( require('./swagger.config') )
	app.use('/docs', swagger.serve, swagger.setup(swaggerConfig) )
}

app.use('/', require("./src/routes"))


function init(){
	console.log("listening on port: ", process.env.PORT)
	const { createInitialAdmin } = require('./src/startup')
	createInitialAdmin()
}
function mount(){
	if(process.env.production != 1)
		return app.listen(process.env.PORT, init)
	else if(existsSync("./storage/keys/private.key") && existsSync("./storage/keys/public.crt")){
		let ssl = {
			key: readFileSync("./storage/keys/private.key"),
			cert: readFileSync("./storage/keys/public.crt"),
		}
		return require('https')
			.createServer(ssl, app)
			.listen(process.env.PORT, init)
	}
	else{
		console.log("SSL files do not exists")
		process.exit()
	}
}
require('./src/db').connection.then(mount).catch(console.log)