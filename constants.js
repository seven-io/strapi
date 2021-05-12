module.exports = {
    defaultFilters: {
        roles: [],
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
    routes: {
        Index: '/sms77',
        BulkFilters: '/sms77/bulk-filters',
        PluginSettings: '/sms77/plugin-settings',
        Sms: '/sms77/sms',
    },
    phoneAttribute: process.env.SMS77_STRAPI_PHONE_ATTRIBUTE || 'mobile_phone',
    settingsKeys: {
        Settings: 'settings',
    },
    storeName: 'sms77',
}