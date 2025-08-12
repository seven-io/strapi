import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Layout,
  HeaderLayout,
  ContentLayout,
  Main,
  Box,
  Button,
  Toggle,
  Typography,
  Grid,
  GridItem,
  Textarea
} from '@strapi/design-system';
import { Phone } from '@strapi/icons';
import { request, useNotification } from '@strapi/helper-plugin';
import { defaultFilters, defaultVoiceParams } from '../../../constants';
import getTrad from '../utils/getTrad';
import Filters from '../components/Filters';
import { To } from '../components/To';
import { From } from '../components/From';

export default function Voice() {
  const { formatMessage } = useIntl();
  const [params, setParams] = useState(defaultVoiceParams);
  const [filters, setFilters] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const toggleNotification = useNotification();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      const response = await request('/seven/voice', {
        method: 'POST',
        body: { filters, params },
      });

      toggleNotification({
        type: 'success',
        message: 'Voice call initiated successfully!'
      });
    } catch (error) {
      console.error('Failed to send voice message:', error);
      toggleNotification({
        type: 'warning',
        message: 'Failed to initiate voice call'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Main>
        <HeaderLayout
          title={formatMessage({ id: getTrad('tts') })}
          subtitle={formatMessage({ id: getTrad('tts.helper') })}
          primaryAction={
            <Button
              onClick={handleSubmit}
              startIcon={<Phone />}
              size="L"
              disabled={isLoading || !params.text}
              loading={isLoading}
            >
              {formatMessage({ id: getTrad('send') })}
            </Button>
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
            <Box paddingBottom={6}>
              <Typography variant="delta" as="h2">
                Recipients & Content
              </Typography>
            </Box>

            <Grid gap={4}>
              <GridItem col={12}>
                <Filters disabled={'' !== params.to} filters={filters} setFilters={setFilters} />
              </GridItem>
              
              <GridItem col={6}>
                <To params={params} setParams={setParams} />
              </GridItem>
              
              <GridItem col={6}>
                <From params={params} setParams={setParams} tooltip="from.helper.tts" />
              </GridItem>

              <GridItem col={12}>
                <Textarea
                  placeholder="Enter your text-to-speech message"
                  label={formatMessage({ id: getTrad('text') })}
                  name="text"
                  onChange={(e) => setParams({ ...params, text: e.target.value })}
                  value={params.text || ''}
                  required
                />
              </GridItem>

              <GridItem col={6}>
                <Toggle
                  label="XML Format"
                  hint={formatMessage({ id: getTrad('xml.tooltip') })}
                  name="xml"
                  onLabel="On"
                  offLabel="Off"
                  checked={params.xml || false}
                  onChange={(e) => setParams({ ...params, xml: e.target.checked })}
                />
              </GridItem>
            </Grid>
          </Box>
        </ContentLayout>
      </Main>
    </Layout>
  );
}