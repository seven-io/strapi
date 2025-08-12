export default [
  {
    method: 'GET',
    path: '/',
    handler: 'seven.index',
    config: {
      policies: [],
      description: 'This renders the plugins home page',
    },
  },
  {
    method: 'GET',
    path: '/bulk-filters',
    handler: 'seven.bulkFilters',
    config: {
      policies: [],
      description: 'This returns the bulk filters',
    },
  },
  {
    method: 'GET',
    path: '/plugin-settings',
    handler: 'seven.getSettings',
    config: {
      policies: [],
      description: 'This gets the plugin settings',
    },
  },
  {
    method: 'POST',
    path: '/plugin-settings',
    handler: 'seven.setSettings',
    config: {
      policies: [],
      description: 'This sets the plugin settings',
    },
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'seven.viewSettings',
    config: {
      policies: [],
      description: 'Get the email settings',
    },
  },
  {
    method: 'POST',
    path: '/sms',
    handler: 'seven.sendSMS',
    config: {
      policies: [],
      description: 'Send SMS',
    },
  },
  {
    method: 'POST',
    path: '/voice',
    handler: 'seven.sendVoice',
    config: {
      policies: [],
      description: 'Make text-to-speech calls',
    },
  },
];
