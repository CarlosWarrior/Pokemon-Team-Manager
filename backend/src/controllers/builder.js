const { raise } = require("../middlewares/errors")
const Builder = require("../models/builder")
const BuilderController = {
    data: async(req, res) => {
        res.send('builder data')
    },
}

module.exports = BuilderController