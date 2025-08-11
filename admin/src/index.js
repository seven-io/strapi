import React from 'react';
import { Plug } from '@strapi/icons';
import pkg from '../../package.json';
import App from './containers/App';
import trads from './translations';
import { routes } from '../../constants';
import getTrad from './utils/getTrad';

const pluginId = 'seven';
const name = pkg.strapi.name;

const admin = {
  app: {
    intlMessagePrefixes: ['seven', 'global'],
  },
  
  bootstrap() {},
  
  register(app) {
    app.addMenuLink({
      to: `/plugins${routes.Index}`,
      icon: Plug,
      intlLabel: {
        id: getTrad('plugin.name'),
        defaultMessage: name,
      },
      permissions: [],
      Component: async () => {
        const component = await import('./containers/App');
        return component;
      },
    });

    app.registerPlugin({
      id: pluginId,
      name: name,
    });
  },
};

export default admin;
