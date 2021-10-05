module.exports = {
    defaultFilters: {
        role: '',
    },
    defaultSettings: {
        apiKey: '',
    },
    defaultSmsParams: {
        debug: false,
        delay: null,
        flash: false,
        foreign_id: '',
        from: '',
        label: '',
        no_reload: false,
        performance_tracking: false,
        text: '',
        to: '',
        ttl: null,
    },
    defaultVoiceParams: {
        debug: false,
        from: '',
        text: '',
        to: '',
        xml: false,
    },
    routes: {
        BulkFilters: '/sms77/bulk-filters',
        Index: '/sms77',
        PluginSettings: '/sms77/plugin-settings',
        Sms: '/sms77/sms',
        Voice: '/sms77/voice',
    },
    phoneAttribute: process.env.SMS77_STRAPI_PHONE_ATTRIBUTE || 'mobile_phone',
    settingsKeys: {
        Settings: 'settings',
    },
    storeName: 'sms77',
}
