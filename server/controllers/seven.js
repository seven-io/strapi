'use strict';

const Util = require('../../Util');

module.exports = ({ strapi }) => ({
  viewSettings(ctx) {
    ctx.send({ message: 'ok' });
  },

  async index(ctx) {
    ctx.send({ message: 'ok' });
  },

  async bulkFilters(ctx) {
    ctx.send({ roles: await Util.getRoles(strapi) });
  },

  async sendSMS(ctx) {
    await Util.sendMessage(ctx, 'sms', strapi);
  },

  async sendVoice(ctx) {
    await Util.sendMessage(ctx, 'voice', strapi);
  },

  async getSettings(ctx) {
    const store = strapi.plugin('seven').service('store');
    ctx.send(await store.getStoreKey());
  },

  async setSettings(ctx) {
    const store = strapi.plugin('seven').service('store');
    await store.setStoreKey(ctx.request.body);
    await this.getSettings(ctx);
  },
});