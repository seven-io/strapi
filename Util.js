'use strict'

const fetch = require('node-fetch')
const SevenCLient = require('sms77-client')
const {phoneAttribute} = require('./constants')

if (!globalThis.fetch) globalThis.fetch = fetch

module.exports = class Util {
    static async sendMessage(ctx, method, strapi) {
        const messages = []
        const client = await Util.initSevenClient(strapi)
        const params = {...await Util.findUserPhonesByRoles(ctx, strapi), json: true}
        const isToArray = Array.isArray(params.to)
        const requests = []

        if ('sms' === method) {
            if (isToArray) params.to = params.to.join(',')
            requests.push(params)
        } else {
            for (const to of isToArray ? params.to : params.to.split(','))
                requests.push({...params, to})
        }

        for (const request of requests) {
            try {
                const res = await client[method](request)
                messages.push(JSON.stringify(res, null, 2))
            } catch (e) {
                messages.push(e.message)
            }
        }

        ctx.send({message: messages.join('\n')})
    }

    static async getApiKey(strapi) {
        return (await strapi.plugin('seven').service('store').getStoreKey()).apiKey
    }

    static async findUserPhonesByRoles(ctx, strapi) {
        const {filters, params} = ctx.request.body

        if ('' === params.to) {
            const to = []

            for (const user of await Util.findUsersByRole(filters.role, strapi)) {

                if ('' === (user[phoneAttribute] || '')) continue

                to.push(user[phoneAttribute])
            }

            params.to = to
        }

        return params
    }

    static toLocaleTimestamp(dateTime, locale = 'de-DE') {
        return (new Date(new Date(dateTime).toLocaleString(locale)).valueOf()) / 1000
    }

    static async getRoles(strapi) {
        const values = []
        let total = 0

        for (const {id, name} of await strapi.documents('plugin::users-permissions.role')
            .findMany()) {
            const count = await strapi.documents('plugin::users-permissions.user')
                .count({filters: {role: {id: id}}})

            if (0 !== count) {
                total += count

                values.push({label: `${name} (${count})`, value: id})
            }
        }

        return values
    }

    static async findUsersByRole(role, strapi) {
        return await strapi.documents('plugin::users-permissions.user')
            .findMany(role ? {filters: {role: {id: role}}} : {})
    }

    static async initSevenClient(strapi) {
        return new SevenCLient(await Util.getApiKey(strapi), 'strapi')
    }
}
