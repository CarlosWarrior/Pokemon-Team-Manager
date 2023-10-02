const { raise } = require("../middlewares/errors")
const AccountController = {
    get: async(req, res) => {
        res.send('account get')
    },
    update: async(req, res) => {
        res.send('account update')
    }
}

module.exports = AccountController