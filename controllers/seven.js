'use strict'

const Util = require('../Util')

module.exports = {
    viewSettings(ctx) {
        ctx.send({message: 'ok'})
    },

    async index(ctx) {
        ctx.send({message: 'ok'})
    },

    async bulkFilters(ctx) {
        ctx.send({roles: await Util.getRoles()})
    },

    async sendSMS(ctx) {
        await Util.sendMessage(ctx, 'sms')
    },

    async sendVoice(ctx) {
        await Util.sendMessage(ctx, 'voice')
    },

    async getSettings(ctx) {
        ctx.send(
            await strapi.plugins.seven.services.store.getStoreKey())
    },

    async setSettings(ctx) {
        await strapi.plugins.seven.services.store.setStoreKey(ctx.request.body)

        await this.getSettings(ctx)
    },
}
