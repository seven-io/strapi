import React from 'react'
import {useIntl} from 'react-intl'
import {Label, Textarea} from '@buffetjs/core'
import getTrad from '../utils/getTrad'

export function Text({maxlength, params, setParams}) {
    const {formatMessage} = useIntl()

    return <>
        <Label htmlFor='text'>
            {formatMessage({id: getTrad('text')})}
        </Label>

        <Textarea
            id='text'
            maxlength={maxlength}
            name='text'
            onChange={e => setParams({...params, text: e.target.value})}
            required
            value={params.text}
        />
    </>
}
