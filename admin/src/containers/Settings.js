import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Layout,
  HeaderLayout,
  ContentLayout,
  Main,
  Box,
  Button,
  TextInput,
  Typography
} from '@strapi/design-system';
import { Check } from '@strapi/icons';
import { request, useNotification } from '@strapi/helper-plugin';
import { defaultSettings } from '../../../constants';
import getTrad from '../utils/getTrad';

export default function Settings() {
  const { formatMessage } = useIntl();
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const toggleNotification = useNotification();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const data = await request('/seven/plugin-settings', { method: 'GET' });
        setSettings(data || defaultSettings);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        toggleNotification({
          type: 'warning',
          message: 'Failed to fetch settings'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [toggleNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const updatedSettings = await request('/seven/plugin-settings', {
        method: 'POST',
        body: settings,
      });

      setSettings(updatedSettings);
      
      toggleNotification({
        type: 'success',
        message: formatMessage({ id: getTrad('settings.updated') })
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      toggleNotification({
        type: 'warning',
        message: 'Failed to save settings'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Main>
        <HeaderLayout
          title="Seven Settings"
          subtitle={formatMessage({ id: getTrad('settings.helper') })}
          primaryAction={
            <Button
              onClick={handleSubmit}
              startIcon={<Check />}
              size="L"
              disabled={isLoading}
              loading={isLoading}
            >
              {formatMessage({ id: getTrad('save') })}
            </Button>
          }
          navigationAction={
            <Box>
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/admin/plugins/seven/sms'}
              >
                SMS
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/admin/plugins/seven/voice'}
                marginLeft={2}
              >
                {formatMessage({ id: getTrad('tts') })}
              </Button>
            </Box>
          }
        />
        <ContentLayout>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={7}
            paddingRight={7}
          >
            <form onSubmit={handleSubmit}>
              <Box paddingBottom={4}>
                <Typography variant="delta" as="h2">
                  API Configuration
                </Typography>
              </Box>
              <Box paddingBottom={4}>
                <TextInput
                  placeholder="Enter your Seven API key"
                  label={formatMessage({ id: getTrad('apiKey') })}
                  name="apiKey"
                  onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                  value={settings.apiKey || ''}
                  required
                />
              </Box>
            </form>
          </Box>
        </ContentLayout>
      </Main>
    </Layout>
  );
}