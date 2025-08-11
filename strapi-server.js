'use strict';

const controllers = require('./server/controllers');
const routes = require('./server/routes');
const services = require('./server/services');
const config = require('./server/config');

module.exports = () => ({
  controllers,
  routes,
  services,
  config,
});