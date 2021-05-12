const {settingsKeys} = require('../../constants');
const {defaultSettings, phoneAttribute} = require('../../constants');

module.exports = async () => {
    if (-1 === Object.keys(strapi.plugins).indexOf('users-permissions')) {
        throw new Error('Sms77 plugin requires the missing users-permissions plugin');
    }

    if (!(phoneAttribute in strapi.query('user', 'users-permissions').model.attributes)) {
        throw new Error(`Sms77 plugin requires attribute 
        "${phoneAttribute}" on model users-permissions`);
    }

    strapi.plugins.sms77.store = strapi.store({
        key: settingsKeys.Settings,
        name: 'sms77',
        type: 'plugin',
    });

    if (!(await strapi.plugins.sms77.store.get())) { // if provider config does not exist set one by default
        await strapi.plugins.sms77.store.set({
            value: defaultSettings,
        });
    }
};