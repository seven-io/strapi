const {defaultSettings, phoneAttribute, settingsKeys} = require('../../constants');

module.exports = async () => {
    if (-1 === Object.keys(strapi.plugins).indexOf('users-permissions')) {
        throw new Error('Seven plugin requires the missing users-permissions plugin');
    }

    if (!(phoneAttribute in strapi.query('user', 'users-permissions').model.attributes)) {
        throw new Error(`Seven plugin requires attribute 
        "${phoneAttribute}" on model users-permissions`);
    }

    strapi.plugins.seven.store = strapi.store({
        key: settingsKeys.Settings,
        name: 'seven',
        type: 'plugin',
    });

    if (!(await strapi.plugins.seven.store.get())) { // if provider config does not exist set one by default
        await strapi.plugins.seven.store.set({
            value: defaultSettings,
        });
    }
};
