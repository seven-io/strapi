import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Layout,
  HeaderLayout,
  ContentLayout,
  Main,
  Box,
  Button,
  TextInput,
  NumberInput,
  Toggle,
  Typography,
  Grid,
  GridItem,
  Textarea
} from '@strapi/design-system';
import { PaperPlane } from '@strapi/icons';
import { request, useNotification } from '@strapi/helper-plugin';
import { defaultFilters, defaultSmsParams } from '../../../constants';
import getTrad from '../utils/getTrad';
import Filters from '../components/Filters';
import { To } from '../components/To';
import { From } from '../components/From';

export default function Sms() {
  const { formatMessage } = useIntl();
  const [params, setParams] = useState(defaultSmsParams);
  const [filters, setFilters] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const toggleNotification = useNotification();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      const response = await request('/seven/sms', {
        method: 'POST',
        body: { filters, params },
      });

      toggleNotification({
        type: 'success',
        message: 'SMS sent successfully!'
      });
    } catch (error) {
      console.error('Failed to send SMS:', error);
      toggleNotification({
        type: 'warning',
        message: 'Failed to send SMS'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Main>
        <HeaderLayout
          title="Send SMS"
          subtitle={formatMessage({ id: getTrad('sms.helper') })}
          primaryAction={
            <Button
              onClick={handleSubmit}
              startIcon={<PaperPlane />}
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
                <From params={params} setParams={setParams} tooltip="from.helper.sms" />
              </GridItem>

              <GridItem col={12}>
                <Textarea
                  placeholder="Enter your SMS message"
                  label={formatMessage({ id: getTrad('text') })}
                  name="text"
                  onChange={(e) => setParams({ ...params, text: e.target.value })}
                  value={params.text || ''}
                  required
                />
              </GridItem>

              <GridItem col={6}>
                <TextInput
                  placeholder="Enter foreign ID"
                  label={formatMessage({ id: getTrad('foreignId') })}
                  hint={formatMessage({ id: getTrad('foreignId.tooltip') })}
                  name="foreign_id"
                  onChange={(e) => setParams({ ...params, foreign_id: e.target.value })}
                  value={params.foreign_id || ''}
                />
              </GridItem>

              <GridItem col={6}>
                <TextInput
                  placeholder="Enter label"
                  label={formatMessage({ id: getTrad('label') })}
                  hint={formatMessage({ id: getTrad('label.tooltip') })}
                  name="label"
                  onChange={(e) => setParams({ ...params, label: e.target.value })}
                  value={params.label || ''}
                />
              </GridItem>

              <GridItem col={6}>
                <NumberInput
                  placeholder="2880"
                  label={formatMessage({ id: getTrad('ttl') })}
                  hint={formatMessage({ id: getTrad('ttl.tooltip') })}
                  name="ttl"
                  onValueChange={(value) => setParams({ ...params, ttl: value })}
                  value={params.ttl || ''}
                />
              </GridItem>

              <GridItem col={6}>
                <Box paddingTop={4}>
                  <Typography variant="pi" fontWeight="bold" as="label">
                    Options
                  </Typography>
                </Box>
              </GridItem>

              <GridItem col={3}>
                <Toggle
                  label={formatMessage({ id: getTrad('flash') })}
                  hint={formatMessage({ id: getTrad('flash.tooltip') })}
                  name="flash"
                  onLabel="On"
                  offLabel="Off"
                  checked={params.flash || false}
                  onChange={(e) => setParams({ ...params, flash: e.target.checked })}
                />
              </GridItem>

              <GridItem col={3}>
                <Toggle
                  label={formatMessage({ id: getTrad('noReload') })}
                  hint={formatMessage({ id: getTrad('noReload.tooltip') })}
                  name="no_reload"
                  onLabel="On"
                  offLabel="Off"
                  checked={params.no_reload || false}
                  onChange={(e) => setParams({ ...params, no_reload: e.target.checked })}
                />
              </GridItem>

              <GridItem col={6}>
                <Toggle
                  label={formatMessage({ id: getTrad('performanceTracking') })}
                  hint={formatMessage({ id: getTrad('performanceTracking.tooltip') })}
                  name="performance_tracking"
                  onLabel="On"
                  offLabel="Off"
                  checked={params.performance_tracking || false}
                  onChange={(e) => setParams({ ...params, performance_tracking: e.target.checked })}
                />
              </GridItem>
            </Grid>
          </Box>
        </ContentLayout>
      </Main>
    </Layout>
  );
}