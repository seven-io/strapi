import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, SingleSelect, SingleSelectOption, Typography } from '@strapi/design-system';
import { request } from '@strapi/helper-plugin';
import { defaultFilters } from '../../../constants';
import getTrad from '../utils/getTrad';

export default function Filters({ disabled, filters, setFilters }) {
  const { formatMessage } = useIntl();
  const [filterValues, setFilterValues] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true);
        const values = await request('/seven/bulk-filters', { method: 'GET' });

        let totalRoles = 0;
        for (const role of values.roles) {
          totalRoles += Number.parseInt(role.label.match(/\d+/)[0]);
        }

        values.roles.unshift({
          label: `${formatMessage({ id: getTrad('all') })} (${totalRoles})`,
          value: 0
        });

        setFilterValues(values);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, [formatMessage]);

  return (
    <Box>
      <Box paddingBottom={2}>
        <Typography variant="delta" as="h3">
          {formatMessage({ id: getTrad('filters') })}
        </Typography>
        <Typography variant="pi" textColor="neutral600">
          {formatMessage({ id: getTrad('filters.helper') })}
        </Typography>
      </Box>

      <SingleSelect
        disabled={disabled || isLoading}
        label={formatMessage({ id: getTrad('role') })}
        placeholder="Select a role"
        value={filters.role || ''}
        onChange={(value) => setFilters({ ...filters, role: value || null })}
      >
        {filterValues.roles?.map((role) => (
          <SingleSelectOption key={role.value} value={role.value}>
            {role.label}
          </SingleSelectOption>
        ))}
      </SingleSelect>
    </Box>
  );
}