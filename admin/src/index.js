import React from 'react';
import pkg from '../../package.json';
import App from './containers/App';
import Initializer from './containers/Initializer';
import trads from './translations';
import {routes} from '../../constants';
import getTrad from './utils/getTrad'

export const pluginId = 'seven'

const icon = pkg.strapi.icon;
const name = pkg.strapi.name;

export default strapi => strapi.registerPlugin({
    blockerComponent: null,
    blockerComponentProps: {},
    description: pkg.strapi.description || pkg.description,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pkg.strapi.required || false,
    layout: null,
    lifecycles: () => {},
    mainComponent: App,
    menu: {
        pluginsSectionLinks: [
            {
                destination: `/plugins${routes.Index}`,
                icon,
                label: {
                    defaultMessage: name,
                    id: getTrad('plugin.name'),
                },
                name,
            },
        ],
    },
    name,
    preventComponentRendering: false,
    trads,
})
