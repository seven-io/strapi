import React from 'react';
import { useIntl } from 'react-intl';
import { Textarea } from '@strapi/design-system';
import getTrad from '../utils/getTrad';

export function Text({ maxlength, params, setParams }) {
  const { formatMessage } = useIntl();

  return (
    <Textarea
      placeholder="Enter your message text"
      label={formatMessage({ id: getTrad('text') })}
      name="text"
      onChange={(e) => setParams({ ...params, text: e.target.value })}
      value={params.text || ''}
      required
    />
  );
}