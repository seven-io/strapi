import React from 'react'
import {useIntl} from 'react-intl'
import {InputText, Label} from '@buffetjs/core'
import {Tooltip} from '@buffetjs/styles'
import {FROM_NUMERIC_MAX} from 'sms77-client/dist/validators/request/sms'
import getTrad from '../utils/getTrad'

export function From({params, setParams, tooltip}) {
    const {formatMessage} = useIntl()

    return <div data-for='from_tooltip' data-tip={formatMessage({id: getTrad(tooltip)})}>
        <Label htmlFor='from'>
            {formatMessage({id: getTrad('from')})}
        </Label>

        <InputText
            id='from'
            maxlength={FROM_NUMERIC_MAX}
            name='from'
            onChange={e => setParams({...params, from: e.target.value})}
            value={params.from}
        />

        <Tooltip id='from_tooltip'/>
    </div>
}
