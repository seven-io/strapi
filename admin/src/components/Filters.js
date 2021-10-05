import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {Label, Select,} from '@buffetjs/core'
import {request} from 'strapi-helper-plugin'
import {defaultFilters, routes} from '../../../constants'
import getTrad from '../utils/getTrad'

export default function Filters({disabled, filters, setFilters}) {
    const {formatMessage} = useIntl()
    const [filterValues, setFilterValues] = useState(defaultFilters)

    useEffect(() => {
        (async () => {
            strapi.lockApp()

            setFilterValues(await request(routes.BulkFilters))

            strapi.unlockApp()
        })()
    }, [])

    return <section>
        <h2>
            {formatMessage({id: getTrad('filters')})} - <small>{formatMessage({id: getTrad('filters.helper')})}.</small>
        </h2>

        <Label htmlFor='filter_role'>{formatMessage({id: getTrad('role')})}</Label>

        <Select
            disabled={disabled}
            id='filter_role'
            name='filter_role'
            onChange={({target: {value}}) =>
                setFilters({...filters, role: value ? value : null})}
            options={filterValues.roles}
            value={filters.role}
        />

        <hr/>
    </section>
}
