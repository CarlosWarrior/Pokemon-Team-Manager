const { readFileSync } = require("fs")
const { raise } = require("../middlewares/errors")
const Item = require('../models/item')
const { isUrl } = require("../utils/formats")
const ItemController = {
    list: async(req, res) => {
        const items = await Item.find({})
        return res.send(items)
    },
    get: async(req, res) => {
        res.send('item get')
    },
    create: async(req, res) => {
        if(!req.body.name || !req.body.description || !req.body.image)
            return raise({status: 422, message: "Body malformed" })
        if(!isUrl(req.body.image))
            return raise({status: 422, message: "Invalid formats" })
        let item
        try {
            const name = req.body.name
            const description = req.body.description
            const image = req.body.image
            item = await Item.create({
                name,
                description,
                image,
            })
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error})
        }
        res.send(item)
    },
    update: async(req, res) => {
        if(!req.body._id || await Item.count({_id: req.body._id}) < 1)
            return raise({ status: 404, message: "Not found" })
        if(!req.body.name && ! req.body.description && !req.body.image)
            return raise({status: 422, message: "Body malformed" })
        if(( req.body.image && !isUrl(req.body.image)) )
            return raise({status: 422, message: "Body malformed" })
        const id = req.body._id
        let item
        try {
            item = await Item.findById(id)
        } catch (error) {
            return raise({ status: 404 })
        }
        if(!item)
            return raise({ status: 404 })

        const name = req.body.name
        if(name)
            item.name = name

            const description = req.body.description
        if(description)
            item.description = description

            const image = req.body.image
        if(image)
            item.image = image


        try {
            await item.save()
            
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error})
        }
        res.send(item)
    },
    bulkCreate: async(req, res) => {
        if(!req.file)
            return raise({ status: 422, message: "File not present" })
        let itemsData, itemsNames
        try {
            itemsData = JSON.parse(readFileSync(req.file.path, 'utf8'))
            itemsNames = Object.keys(itemsData)
        } catch (error) {
            return raise({ status: 422, message: "File malformed", errors: error })
        }
        const items = []
        try {
            for (let ti = 0; ti < itemsNames.length; ti++) {
                const itemData = itemsData[itemsNames[ti]];
                console.log(itemData.name, Object.keys(itemData))
                if(await Item.count({ name: itemData.name}) < 1)
                    items.push(await Item.create(itemData))
            }
        } catch (error) {
            return raise({ status: 422, message: "Items Data malformed", errors: error })
        }
        
        return res.send(items)
    },
    delete: async(req, res) => {
        if(!req.body.items || !req.body.items.length)
            return raise({ status: 422, message: "Body malformed"})
        const items = req.body.items
        const _items = []
        for (let ti = 0; ti < items.length; ti++) {
            await Item.count({ _id: items[ti]}) && _items.push(items[ti])
            await Item.delete(items[ti]);
        }
        res.send(_items)
    },
}

module.exports = ItemController