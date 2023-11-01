const AdminRegisterTokenEmailHtml = require('./admin_register_token.email')
const AdminRegisterTokenEmail = ({token, ToAddresses, CcAddresses = [], BccAddresses=[] }) =>({ // SendEmailRequest
    Source: `${process.env.email}`,
    Destination: {
        ToAddresses,
        CcAddresses,
        BccAddresses,
    },
    Message: {
        Subject: {
            Data: "Admin registration link",
        },
        Body: {
            Text: {
                Data: `Follow this link to create a Pokemon Team Manager Admin Account: ${process.env.ui_url}/admin_register?token=${token}`,
            },
            Html: {
                Data: AdminRegisterTokenEmailHtml({action: `${process.env.ui_url}/admin_register?token=${token}`}),
            },
        },  
    }
});

module.exports = AdminRegisterTokenEmail