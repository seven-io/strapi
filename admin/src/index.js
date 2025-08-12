import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { Cog } from '@strapi/icons';
import pluginPkg from '../../package.json';

const pluginId = 'seven';

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: Cog,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'Seven',
      },
      Component: async () => {
        const component = await import('./containers/App');
        return component.default;
      },
      permissions: [],
    });
    
    app.registerPlugin({
      id: pluginId,
      initializer: () => null,
      isReady: true,
      name: pluginPkg.strapi.name,
    });
  },

  bootstrap() {},
  
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};