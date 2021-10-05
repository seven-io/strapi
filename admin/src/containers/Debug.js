import React from 'react'
import {Tooltip} from '@buffetjs/styles'
import {Label, Toggle,} from '@buffetjs/core'

export function Debug({params, setParams}) {
    return <div data-for='debug_tooltip'
                data-tip='No message will be sent or calculated if activated'>
        <Label htmlFor='debug'>Debug</Label>

        <Toggle
            id='debug'
            name='debug'
            onChange={e => setParams({...params, debug: e.target.value})}
            value={params.debug}
        />

        <Tooltip id='debug_tooltip'/>
    </div>
}
