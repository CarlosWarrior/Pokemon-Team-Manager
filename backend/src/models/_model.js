module.exports = (Model) => ({
    find: async({filter={}, fields=[], limit = 0, skip = 0, lean=false})=>{
        let query = Model.find(filter)
        if(fields.length)
            query = query.select(fields)
        if(limit)
            query = query.limit(limit)
        if(skip)
            query = query.skip(skip)
        if(lean)
            query = query.lean()
        return await query
    },
    findById: async(id) => {
        if(!id.match(/^[0-9a-fA-F]{24}$/))
            return null
        const model = await Model.findById(id)
        return model
    },
    findOne: async({filter={}, fields=[]})=>{
        const model = await Model.findOne(filter).select(fields)
        return model
    },
    create: async(body)=>{
        const model = new Model(body)
        await model.save()
        return model
    },
    update: async(filter, body)=>{

    },
    delete: async(filter)=>{

    },
})