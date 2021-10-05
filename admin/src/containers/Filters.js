import React, {useEffect, useState} from 'react'
import {Label, Select,} from '@buffetjs/core'
import {request} from 'strapi-helper-plugin'
import {defaultFilters, routes} from '../../../constants'

export default function Filters({disabled, filters, setFilters}) {
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
            Filters - <small>not applied if field "To" is set.</small>
        </h2>

        <Label htmlFor='filter_role'>Role</Label>

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
