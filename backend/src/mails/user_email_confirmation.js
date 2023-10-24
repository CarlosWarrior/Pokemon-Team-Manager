const UserEmailConfirmationEmail = require('./user_email_confirmation.email')
const AdminRegisterTokenEmail = ({token, ToAddresses, CcAddresses = [], BccAddresses=[] }) =>({ // SendEmailRequest
    Source: `${process.env.email}`,
    Destination: {
        ToAddresses,
        CcAddresses,
        BccAddresses,
    },
    Message: {
        Subject: {
            Data: "Email verification link",
        },
        Body: {
            Text: {
                Data: `Follow this link to verify your email address: ${process.env.ui_url}/auth/confirm?token=${token}`,
            },
            Html: {
                Data: UserEmailConfirmationEmail({action: `${process.env.ui_url}/auth/confirm?token=${token}`}),
            },
        },
    }
});

module.exports = AdminRegisterTokenEmail