'use strict';

const {findUsersByRoles, getRoles, initSms77Client} = require('../utils');
const {phoneAttribute} = require('../constants');

module.exports = {
    viewSettings(ctx) {
        ctx.send({message: 'ok'});
    },

    async index(ctx) {
        ctx.send({message: 'ok'});
    },

    async bulkFilters(ctx) {
        ctx.send(await getRoles());
    },

    async sendSMS(ctx) {
        const {filters, params} = ctx.request.body;
        let message;

        if ('' === params.to) {
            const to = [];

            for (const user of await findUsersByRoles(filters.roles)) {

                if ('' === (user[phoneAttribute] || '')) {
                    continue;
                }

                to.push(user[phoneAttribute]);
            }

            params.to = to.join(',');
        }

        try {
            const {apiKey} =
                await strapi.plugins.sms77.services.store.getStoreKey();

            message = await initSms77Client(apiKey).sms({...params, json: true,});
        } catch (e) {
            message = e.message;
        }

        ctx.send({message});
    },

    async getSettings(ctx) {
        ctx.send(
            await strapi.plugins.sms77.services.store.getStoreKey());
    },

    async setSettings(ctx) {
        await strapi.plugins.sms77.services.store.setStoreKey(ctx.request.body);

        await this.getSettings(ctx);
    },
};
