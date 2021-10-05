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

            const values = await request(routes.BulkFilters)

            let totalRoles = 0
            for (const role of values.roles)
                totalRoles += Number.parseInt(role.label.match(/\d+/)[0])

            values.roles.unshift({
                label: `${formatMessage({id: getTrad('all')})} (${totalRoles})`,
                value: 0
            })

            setFilterValues(values)

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
