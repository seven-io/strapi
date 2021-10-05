import React from 'react'
import {useIntl} from 'react-intl'
import {InputText, Label} from '@buffetjs/core'
import {Tooltip} from '@buffetjs/styles'
import getTrad from '../utils/getTrad'

export function To({params, setParams}) {
    const {formatMessage} = useIntl()

    return <div data-for='to_tooltip'
                data-tip={formatMessage({id: getTrad('to.tooltip')})}>
        <Label htmlFor='to'>
            {formatMessage({id: getTrad('to')})}
        </Label>

        <InputText
            id='to'
            name='to'
            onChange={e => setParams({...params, to: e.target.value})}
            value={params.to}
        />

        <Tooltip id='to_tooltip'/>
    </div>
}
