<p align="center">
  <img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" alt="seven logo" />
</p>

<h1 align="center">seven SMS for Strapi</h1>

<p align="center">
  Send SMS and place text-to-speech calls to your <a href="https://strapi.io/">Strapi</a> users via the seven gateway.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="MIT License" /></a>
  <a href="https://www.npmjs.com/package/@seven.io/strapi"><img src="https://img.shields.io/npm/v/@seven.io/strapi" alt="npm" /></a>
  <img src="https://img.shields.io/badge/Strapi-3.x-blue" alt="Strapi 3.x" />
  <img src="https://img.shields.io/badge/Node.js-10--14-brightgreen" alt="Node.js 10-14" />
</p>

---

## Features

- **Native Strapi Plugin** - Lives next to your other Strapi plugins under *Plugins*
- **SMS & Voice** - Single or bulk SMS plus text-to-speech calls
- **Configurable Phone Field** - Defaults to `mobile_phone` on `users-permissions_user`, override via `SEVEN_STRAPI_PHONE_ATTRIBUTE`

## Prerequisites

- [Strapi](https://strapi.io/) 3.x (legacy line)
- The bundled [Roles & Permissions plugin](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html)
- A `mobile_phone` text field on the `users-permissions_user` collection (see [`_screenshots/`](./._screenshots) for setup) - or set `SEVEN_STRAPI_PHONE_ATTRIBUTE` to a different attribute name
- A [seven account](https://www.seven.io/) with API key ([How to get your API key](https://help.seven.io/en/developer/where-do-i-find-my-api-key))

## Installation

```bash
cd path/to/strapi/root
npm install @seven.io/strapi
```

Restart Strapi so the new plugin is registered.

## Configuration

Open the seven plugin page in the Strapi admin and paste your seven API key.

To target a different user attribute than `mobile_phone`:

```bash
export SEVEN_STRAPI_PHONE_ATTRIBUTE=phone
```

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/) or [open an issue](https://github.com/seven-io/strapi/issues).

## License

[MIT](LICENSE)
