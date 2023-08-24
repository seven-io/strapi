module.exports = {
    defaultFilters: require('./defaultFilters'),
    defaultSettings: require('./defaultSettings'),
    defaultSmsParams: require('./defaultSmsParams'),
    defaultVoiceParams: require('./defaultVoiceParams'),
    phoneAttribute: process.env.SEVEN_STRAPI_PHONE_ATTRIBUTE || 'mobile_phone',
    routes: require('./routes'),
    settingsKeys: require('./settingsKeys'),
    storeName: 'seven',
}
