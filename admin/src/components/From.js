import React from 'react';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system';
import getTrad from '../utils/getTrad';

export function From({ params, setParams, tooltip }) {
  const { formatMessage } = useIntl();

  return (
    <TextInput
      placeholder="Enter sender number"
      label={formatMessage({ id: getTrad('from') })}
      hint={formatMessage({ id: getTrad(tooltip) })}
      name="from"
      onChange={(e) => setParams({ ...params, from: e.target.value })}
      value={params.from || ''}
    />
  );
}