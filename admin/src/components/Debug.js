import React from 'react'
import {useIntl} from 'react-intl'
import {Tooltip} from '@buffetjs/styles'
import {Label, Toggle,} from '@buffetjs/core'
import getTrad from '../utils/getTrad'

export function Debug({params, setParams}) {
    const {formatMessage} = useIntl()

    return <div data-for='debug_tooltip'
                data-tip={formatMessage({id: getTrad('debug.tooltip')})}>
        <Label htmlFor='debug'>{formatMessage({id: getTrad('debug')})}</Label>

        <Toggle
            id='debug'
            name='debug'
            onChange={e => setParams({...params, debug: e.target.value})}
            value={params.debug}
        />

        <Tooltip id='debug_tooltip'/>
    </div>
}
