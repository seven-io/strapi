'use strict';

const fetch = require('node-fetch');
const Sms77Client = require('sms77-client');

if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}

module.exports = {
    toLocaleTimestamp(dateTime, locale = 'de-DE') {
        return (new Date(new Date(dateTime).toLocaleString(locale)).valueOf()) / 1000;
    },

    async getRoles() {
        const roles = [];
        let total = 0;

        for (const {id, name} of await strapi.query('role', 'users-permissions')
            .find({_limit: -1})) {
            const count = await strapi.query('user', 'users-permissions')
                .count({role: [id]});

            if (0 !== count) {
                total += count;

                roles.push({
                    label: `${name} (${count})`,
                    value: id,
                });
            }
        }

        roles.unshift({label: `All (${total})`, value: 0});

        return {roles};
    },

    async findUsersByRoles(role) {
        return await strapi.query('user', 'users-permissions').find({_limit: -1, role});
    },

    initSms77Client(apiKey) {
        return new Sms77Client(apiKey, 'strapi');
    }
};