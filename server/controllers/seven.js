'use strict';

const Util = require('../../Util');

module.exports = ({ strapi }) => ({
  async index(ctx) {
    ctx.body = { message: 'ok' };
  },

  async viewSettings(ctx) {
    ctx.body = { message: 'ok' };
  },

  async bulkFilters(ctx) {
    try {
      const roles = await Util.getRoles(strapi);
      ctx.body = { roles };
    } catch (error) {
      ctx.badRequest('Unable to fetch roles', { error: error.message });
    }
  },

  async sendSMS(ctx) {
    try {
      await Util.sendMessage(ctx, 'sms', strapi);
    } catch (error) {
      ctx.badRequest('Failed to send SMS', { error: error.message });
    }
  },

  async sendVoice(ctx) {
    try {
      await Util.sendMessage(ctx, 'voice', strapi);
    } catch (error) {
      ctx.badRequest('Failed to send voice message', { error: error.message });
    }
  },

  async getSettings(ctx) {
    try {
      const settings = await strapi.plugin('seven').service('store').getSettings();
      ctx.body = settings;
    } catch (error) {
      ctx.badRequest('Unable to fetch settings', { error: error.message });
    }
  },

  async setSettings(ctx) {
    try {
      await strapi.plugin('seven').service('store').setSettings(ctx.request.body);
      const settings = await strapi.plugin('seven').service('store').getSettings();
      ctx.body = settings;
    } catch (error) {
      ctx.badRequest('Unable to save settings', { error: error.message });
    }
  },
});