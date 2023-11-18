const { Admin } = require('./auth/models')
async function createInitialAdmin(){
    if(!await Admin.count())
        if(process.env.initial_admin_email && process.env.initial_admin_password)
            await Admin.create({ email: process.env.initial_admin_email, password: process.env.initial_admin_password }) && console.log("Created initial admin")
        else
            console.error("Initial admin does not exists, missing initial_admin_email or initial_admin_password environmental varibles")
}

module.exports = {
    createInitialAdmin
}