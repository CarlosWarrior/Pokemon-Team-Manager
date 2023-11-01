const mongoose = require("mongoose")
const endpoint = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@${process.env.db_host}?retryWrites=true&w=majority`;
const connection = new Promise((resolve, reject) => mongoose.connect(endpoint).then(resolve).catch(reject))
const session = async(transaction) =>{
    const db = await connection
    const session = await db.startSession()
    await session.startTransaction()
    await transaction()
    await session.commitTransaction()
    await session.endSession()
}
module.exports = { connection, session }