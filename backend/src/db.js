const mongoose = require("mongoose")
const endpoint = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@${process.env.db_host}?retryWrites=true&w=majority`;
const Client = new Promise((resolve, reject) => mongoose.connect(endpoint).then(resolve).catch(reject))
module.exports = Client