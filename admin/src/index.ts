import type {StrapiApp} from '@strapi/admin/strapi-admin';
import {getTranslation} from './utils/getTranslation';
import {PLUGIN_ID} from './pluginId';
import {Initializer} from './components/Initializer';

const name = 'Seven';

interface TranslationData {
  [key: string]: string;
}

interface ImportedTranslation {
  data: TranslationData;
  locale: string;
}

export default {
  boostrap(app: StrapiApp) {
    app
      .getPlugin('content-manager')
      .injectComponent('editView', 'right-links', {name: 'my-compo', Component: () => 'my-compo'})
  },
  register(app: StrapiApp): void {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: () => 'plug',
      intlLabel: {
        id: getTranslation('plugin.name'),
        defaultMessage: name,
      },
      Component: async () => {
        const App = await import('./pages/App');
        return App;
      },
      permissions: [
        {
          action: 'plugin::seven.access',
          subject: null,
        },
      ],
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  async registerTrads({ locales }: { locales: string[] }): Promise<ImportedTranslation[]> {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};