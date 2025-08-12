'use strict';

const fetch = require('node-fetch');
const SevenClient = require('sms77-client');
const { phoneAttribute } = require('./constants');

if (!globalThis.fetch) globalThis.fetch = fetch;

module.exports = class Util {
  static async sendMessage(ctx, method, strapi) {
    const messages = [];
    const client = await Util.initSevenClient(strapi);
    const params = { ...await Util.findUserPhonesByRoles(ctx, strapi), json: true };
    const isToArray = Array.isArray(params.to);
    const requests = [];

    if ('sms' === method) {
      if (isToArray) params.to = params.to.join(',');
      requests.push(params);
    } else {
      for (const to of isToArray ? params.to : params.to.split(','))
        requests.push({ ...params, to });
    }

    for (const request of requests) {
      try {
        const res = await client[method](request);
        messages.push(JSON.stringify(res, null, 2));
      } catch (e) {
        messages.push(e.message);
      }
    }

    ctx.body = { message: messages.join('\n') };
  }

  static async getApiKey(strapi) {
    const settings = await strapi.plugin('seven').service('store').getSettings();
    return settings.apiKey;
  }

  static async findUserPhonesByRoles(ctx, strapi) {
    const { filters, params } = ctx.request.body;

    if ('' === params.to) {
      const to = [];

      for (const user of await Util.findUsersByRole(filters.role, strapi)) {
        if ('' === (user[phoneAttribute] || '')) continue;
        to.push(user[phoneAttribute]);
      }

      params.to = to;
    }

    return params;
  }

  static toLocaleTimestamp(dateTime, locale = 'de-DE') {
    return (new Date(new Date(dateTime).toLocaleString(locale)).valueOf()) / 1000;
  }

  static async getRoles(strapi) {
    const values = [];
    let total = 0;

    const roles = await strapi.entityService.findMany('plugin::users-permissions.role', {
      pagination: { limit: -1 }
    });

    for (const { id, name } of roles) {
      const count = await strapi.entityService.count('plugin::users-permissions.user', {
        filters: { role: { id } }
      });

      if (0 !== count) {
        total += count;
        values.push({ label: `${name} (${count})`, value: id });
      }
    }

    return values;
  }

  static async findUsersByRole(role, strapi) {
    const filters = role ? { role: { id: role } } : {};
    return await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters,
      pagination: { limit: -1 }
    });
  }

  static async initSevenClient(strapi) {
    const apiKey = await Util.getApiKey(strapi);
    return new SevenClient(apiKey, 'strapi');
  }
};
