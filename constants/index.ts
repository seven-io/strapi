import defaultFilters from './defaultFilters'
import defaultSettings from './defaultSettings'
import defaultSmsParams from './defaultSmsParams'
import defaultVoiceParams from './defaultVoiceParams'
import routes from './routes'
import settingsKeys from './settingsKeys'

export default {
    defaultFilters,
    defaultSettings,
    defaultSmsParams,
    defaultVoiceParams,
    phoneAttribute: process.env.SEVEN_STRAPI_PHONE_ATTRIBUTE || 'mobile_phone',
    routes,
    settingsKeys,
    storeName: 'seven',
}
