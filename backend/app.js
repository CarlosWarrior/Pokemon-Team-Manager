require('dotenv').config()
const express = require("express")
const app = express()
app.use(express.json())

if(!process.env.production<1){
    const swagger = require('swagger-ui-express')
    const swaggerConfig = require('swagger-jsdoc')( require('./swagger.config') )
    app.use('/docs', swagger.serve, swagger.setup(swaggerConfig) )
}

app.use('/', require("./src/routes"))


function init(){
    console.log("listening on port: ", process.env.port)
}
function mount(){
    app.listen(process.env.port,init)
}
require('./src/db').then(mount).catch(console.log)