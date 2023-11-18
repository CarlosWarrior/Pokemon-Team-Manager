const {SES} = require("@aws-sdk/client-ses") 
const { fromEnv } = require("@aws-sdk/credential-providers");

const SESClient = new SES({ 
    region: process.env.AWS_REGION,
    credentials: fromEnv(),
});

module.exports = {
    ses: SESClient
}