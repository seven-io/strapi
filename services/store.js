'use strict';

const {settingsKeys} = require('../constants');

async function getStoreKey() {
    return await this.store().get({key: settingsKeys.Settings});
}

async function setStoreKey(value) {
    return await this.store().set({value});
}

module.exports = {
    store() {
        return strapi.plugins.seven.store;
    },
    getStoreKey,
    setStoreKey,
};