const PasswordResetTokenEmailHtml = require('./password_reset_token.email')
const PasswordResetTokenEmail = ({token, ToAddresses, CcAddresses = [], BccAddresses=[] }) =>({ // SendEmailRequest
    Source: `${process.env.email}`,
    Destination: {
        ToAddresses,
        CcAddresses,
        BccAddresses,
    },
    Message: {
        Subject: {
            Data: "Password Reset Link",
        },
        Body: {
            Text: {
                Data: `Follow this link to reset your password: ${process.env.ui_url}/auth/password_reset?token=${token}`,
            },
            Html: {
                Data: PasswordResetTokenEmailHtml({action: `${process.env.ui_url}/auth/password_reset?token=${token}`}),
            },
        },
    }
});

module.exports = PasswordResetTokenEmail