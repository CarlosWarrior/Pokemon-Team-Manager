const { readFileSync } = require("fs")
const { raise } = require("../middlewares/errors")
const Type = require('../models/type')
const { isUrl, isColor } = require("../utils/formats")

const validModifiers = async(attackAdvantage, defenseAdvantage, defenseWeakness)=>{
    let valid = true
    if(attackAdvantage)
        for (let index = 0; index < attackAdvantage.length; index++) {
            const type = attackAdvantage[index];
            valid = valid && await Type.count({ name: type }) > 0
        }
    if(defenseAdvantage)
        for (let index = 0; index < defenseAdvantage.length; index++) {
            const type = defenseAdvantage[index];
            valid = valid && await Type.count({ name: type }) > 0
        }
    if(defenseWeakness)
        for (let index = 0; index < defenseWeakness.length; index++) {
            const type = defenseWeakness[index];
            valid = valid && await Type.count({ name: type }) > 0
        }
    return valid
}
const TypeController = {
    list: async(req, res) => {
        const types = await Type.find({})
        res.send(types)
    },
    get: async(req, res) => {
        res.send('type get')
    },
    create: async(req, res) => {
        if(!req.body.name || !req.body.color || !req.body.image || !req.body.teracrystalImage || !req.body.attackAdvantage || !req.body.defenseAdvantage || !req.body.defenseWeakness)
            return raise({status: 422, message: "Body malformed" })
        if(!isUrl(req.body.image) || !isUrl(req.body.teracrystalImage) || !isColor(req.body.color))
            return raise({status: 422, message: "Invalid formats" })
        if(!await validModifiers(req.body.attackAdvantage, req.body.defenseAdvantage, req.body.defenseWeakness))
            return raise({ status: 422, message: "Invalid modifiers" })
        let type
        try {
            const name = req.body.name
            const color = req.body.color
            const image = req.body.image
            const teracrystalImage = req.body.teracrystalImage
            const attackAdvantage = req.body.attackAdvantage
            const defenseAdvantage = req.body.defenseAdvantage
            const defenseWeakness = req.body.defenseWeakness
            type = await Type.create({
                name,
                color,
                image,
                teracrystalImage,
                attackAdvantage,
                defenseAdvantage,
                defenseWeakness,
            })
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error})
        }
        res.send(type)
    },
    update: async(req, res) => {
        if(!req.body._id || await Type.count({_id: req.body._id}) < 1)
            return raise({ status: 404, message: "Not found" })
        if(!req.body.name && ! req.body.color && !req.body.image && !req.body.teracrystalImage && !req.body.attackAdvantage && !req.body.defenseAdvantage && !req.body.defenseWeakness )
            return raise({status: 422, message: "Body malformed" })
        if(( req.body.image && !isUrl(req.body.image)) || ( req.body.teracrystalImage && !isUrl(req.body.teracrystalImage) )|| ( req.body.color && !isColor(req.body.color) ))
            return raise({status: 422, message: "Body malformed" })
        if(!await validModifiers(req.body.attackAdvantage, req.body.defenseAdvantage, req.body.defenseWeakness))
            return raise({ status: 422, message: "Invalid modifiers" })
        const id = req.body._id
        let type
        try {
            type = await Type.findById(id)
        } catch (error) {
            return raise({ status: 404 })
        }
        if(!type)
            return raise({ status: 404 })

        const name = req.body.name
        if(name)
            type.name = name
        const color = req.body.color
        if(color)
            type.color = color
        const image = req.body.image
        if(image)
            type.image = image
        const teracrystalImage = req.body.teracrystalImage
        if(teracrystalImage)
            type.teracrystalImage = teracrystalImage

            
        const attackAdvantage = req.body.attackAdvantage
        if(attackAdvantage)
            type.attackAdvantage = attackAdvantage
        const defenseAdvantage = req.body.defenseAdvantage
        if(defenseAdvantage)
            type.defenseAdvantage = defenseAdvantage
        const defenseWeakness = req.body.defenseWeakness
        if(defenseWeakness)
            type.defenseWeakness = defenseWeakness

        try {
            await type.save()
            
        } catch (error) {
            return raise({ status: 422, message: "Body malformed", errors: error})
        }
        res.send(type)
    },
    bulkCreate: async(req, res) => {
        if(!req.file)
            return raise({ status: 422, message: "File not present" })
        let typesData, modifiersData
        try {
            const data = JSON.parse(readFileSync(req.file.path, 'utf8'))
            typesData = data.types
            modifiersData = data.modifiers
        } catch (error) {
            return raise({ status: 422, message: "File malformed", errors: error })
        }
        const types = []
        try {
            for (let ti = 0; ti < typesData.length; ti++) {
                const typeData = typesData[ti];
                if(await Type.count({ name: typeData.name}) < 1)
                    types.push(await Type.create(typeData))
            }
        } catch (error) {
            return raise({ status: 422, message: "Types Data malformed", errors: error })
        }
        
        try {
            for (let ti = 0; ti < types.length; ti++) {
                const type = types[ti];
                const { attackAdvantage, defenseAdvantage, defenseWeakness } =  modifiersData[type.name]
                type.attackAdvantage = attackAdvantage
                type.defenseAdvantage = defenseAdvantage
                type.defenseWeakness = defenseWeakness
                await type.save()
            }
        } catch (error) {
            for (let ti = 0; ti < types.length; ti++) {
                const type = types[ti];
                Type.delete(type._id)
            }
            return raise({ status: 422, message: "Types Data malformed", errors: error })
        }

        return res.send(types)
    },
    delete: async(req, res) => {
        if(!req.body.types || !req.body.types.length)
            return raise({ status: 422, message: "Body malformed"})
        const types = req.body.types
        const _types = []
        for (let ti = 0; ti < types.length; ti++) {
            await Type.count({ _id: types[ti]}) && _types.push(types[ti])
            await Type.delete(types[ti]);
        }
        res.send(_types)
    },
}

module.exports = TypeController