'use strict';

const { settingsKeys } = require('../../constants');

module.exports = ({ strapi }) => ({
  store() {
    return strapi.plugin('seven').store;
  },

  async getStoreKey() {
    return await this.store().get({ key: settingsKeys.Settings });
  },

  async setStoreKey(value) {
    return await this.store().set({ value });
  },
});