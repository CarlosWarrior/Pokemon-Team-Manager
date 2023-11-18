module.exports = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            title: "ToDos API",
            description: "ToDos API to keep track of todos.",
            version: "0.0.1",
            servers: [
                `localhost:${process.env.port}`
            ]
        }
    },
    apis: [ 'src/routers/**/*.js', ]
}