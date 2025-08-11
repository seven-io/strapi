'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'seven.index',
    config: {
      description: 'This renders the plugins home page',
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/bulk-filters',
    handler: 'seven.bulkFilters',
    config: {
      description: 'This returns the bulk filters',
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/plugin-settings',
    handler: 'seven.getSettings',
    config: {
      description: 'This gets the plugin settings',
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/plugin-settings',
    handler: 'seven.setSettings',
    config: {
      description: 'This sets the plugin settings',
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'seven.viewSettings',
    config: {
      description: 'Get the email settings',
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/sms',
    handler: 'seven.sendSMS',
    config: {
      description: 'Send SMS',
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/voice',
    handler: 'seven.sendVoice',
    config: {
      description: 'Make text-to-speech calls',
      policies: [],
    },
  },
];