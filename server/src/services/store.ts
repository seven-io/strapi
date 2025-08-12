export default ({ strapi }) => ({
  async getSettings() {
    const pluginStore = strapi.store({ type: 'plugin', name: 'seven' });
    return await pluginStore.get({ key: 'settings' });
  },

  async setSettings(value) {
    const pluginStore = strapi.store({ type: 'plugin', name: 'seven' });
    return await pluginStore.set({ key: 'settings', value });
  },
});