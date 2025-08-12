import React from 'react';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system';
import getTrad from '../utils/getTrad';

export function To({ params, setParams }) {
  const { formatMessage } = useIntl();

  return (
    <TextInput
      placeholder="Enter recipient number(s)"
      label={formatMessage({ id: getTrad('to') })}
      hint={formatMessage({ id: getTrad('to.tooltip') })}
      name="to"
      onChange={(e) => setParams({ ...params, to: e.target.value })}
      value={params.to || ''}
    />
  );
}