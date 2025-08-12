'use strict';

const { defaultSettings, phoneAttribute } = require('../constants');

module.exports = async ({ strapi }) => {
  // Check if users-permissions plugin is installed
  if (!strapi.plugin('users-permissions')) {
    throw new Error('Seven plugin requires the missing users-permissions plugin');
  }

  // Check if the phone attribute exists on the user model
  const userModel = strapi.getModel('plugin::users-permissions.user');
  if (!userModel.attributes[phoneAttribute]) {
    throw new Error(`Seven plugin requires attribute "${phoneAttribute}" on model plugin::users-permissions.user`);
  }

  // Initialize plugin store if settings don't exist
  const pluginStore = strapi.store({ type: 'plugin', name: 'seven' });
  const currentSettings = await pluginStore.get({ key: 'settings' });
  
  if (!currentSettings) {
    await pluginStore.set({ key: 'settings', value: defaultSettings });
  }
};