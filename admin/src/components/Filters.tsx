import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {request, useOverlayBlocker} from '@strapi/helper-plugin'
import defaultFilters from '../../../constants/defaultFilters'
import routes from '../../../constants/routes'
import {getTranslation} from "../utils/getTranslation";
import {
  SingleSelect,
  SingleSelectOption,
  Field
} from '@strapi/design-system';

export default function Filters({disabled, filters, setFilters}: {
  disabled: boolean
  filters: typeof defaultFilters
  setFilters: Dispatch<SetStateAction<typeof defaultFilters>>
}) {
  const {formatMessage} = useIntl()
  const [filterValues, setFilterValues] = useState<Record<any, any>>(defaultFilters)
  const { lockApp, unlockApp } = useOverlayBlocker();

  useEffect(() => {
    (async () => {
      lockApp && lockApp()

      const values: Record<any, any> = await request(routes.BulkFilters)

      let totalRoles = 0
      for (const role of values.roles)
        totalRoles += Number.parseInt(role.label.match(/\d+/)[0])

      values.roles.unshift({
        label: `${formatMessage({id: getTranslation('all')})} (${totalRoles})`,
        value: 0
      })

      setFilterValues(values)

      unlockApp && unlockApp()
    })()
  }, [])

  return <section>
    <h2>
      {formatMessage({id: getTranslation('filters')})} - <small>{formatMessage({id: getTranslation('filters.helper')})}.</small>
    </h2>

    <Field.Root id='filter_role'>
      <Field.Label>{formatMessage({id: getTranslation('role')})}</Field.Label>
      <SingleSelect
        disabled={disabled}
        id='filter_role'
        name='filter_role'
        onChange={role => setFilters({...filters, role: role.toString()})}
        //options={filterValues.roles}
        value={filters.role}
      >
        {filterValues.roles.map((item: Record<any, any>) =>  <SingleSelectOption value={item.value}>{item.value}</SingleSelectOption>)}
      </SingleSelect>
    </Field.Root>

    <hr/>
  </section>
}