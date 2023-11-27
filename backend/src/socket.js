const socketio = require('socket.io')
const { validatetoken }  = require('./auth/middlewares')
const ConnectionEvent = require('./events/connection')

function Socket(app){
    const io = socketio(app, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.use(async (socket, next) => {
        try {
            socket.user = validatetoken(socket.handshake.auth.token)
            next()
        } catch (error) {
            socket.disconnect()
        }
    })
    
    ConnectionEvent(io)

    return io
}

module.exports =  Socket