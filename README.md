![Sms77.io Logo](https://www.sms77.io/wp-content/uploads/2019/07/sms77-Logo-400x79.png "Sms77.io Logo")

# Official package for [strapi](https://strapi.io/)

Send SMS and make Text-to-Speech calls

## Prerequisites
- An API key from Sms77.io - [get one for free](https://app.sms77.io/anmelden)
- [Roles & Permissions plugin](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html)
- Field `mobile_phone` on collection `users-permissions_user` (see [screenshots](/._screenshots)) (can be changed by setting process.env.SMS77_STRAPI_PHONE_ATTRIBUTE)

### Installation via NPM

`cd path/to/the/strapi/root/directory`

`npm i @sms77.io/strapi`

#### Support

Need help? Feel free to [contact us](https://www.sms77.io/en/company/contact/).

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
