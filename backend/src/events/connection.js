const { TeamsRanking } = require("./states/TeamsRanking")

function ConnectionEvent(io){
    io.on('connection', async (socket) => {
        const state = await TeamsRanking()
        socket.emit('client-RankingUpdated', state)
    })
}

module.exports = ConnectionEvent