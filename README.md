<img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" />

# Official package for [strapi](https://strapi.io/)

Send SMS and make Text-to-Speech calls

## Prerequisites
- An [API key](https://help.seven.io/en/api-key-access) from [seven](https://www.seven.io)
- [Roles & Permissions plugin](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html)
- Field `mobile_phone` on collection `users-permissions_user` (see [screenshots](/._screenshots)) (can be changed by setting process.env.SEVEN_STRAPI_PHONE_ATTRIBUTE)

### Installation via NPM

`cd path/to/the/strapi/root/directory`

`npm i @seven.io/strapi`

#### Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/).

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
