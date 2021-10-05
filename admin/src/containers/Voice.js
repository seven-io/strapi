import React, {useState} from 'react'
import {Flex, InputText, Label, Textarea, Toggle,} from '@buffetjs/core'
import {Tooltip} from '@buffetjs/styles'
import {Header} from '@buffetjs/custom'
import {defaultFilters, defaultVoiceParams, routes} from '../../../constants'
import {FROM_NUMERIC_MAX} from 'sms77-client/dist/validators/request/sms'
import Filters from './Filters'
import {Debug} from './Debug'
import {AdminUtil} from '../AdminUtil'

export default function Voice() {
    const [params, setParams] = useState(defaultVoiceParams)
    const [filters, setFilters] = useState(defaultFilters)

    const handleSubmit = async () => {
        await AdminUtil.handleSubmitMessage(routes.Voice, {filters, params})
    }

    return <>
        <Header
            actions={[
                {
                    color: 'success',
                    label: 'Send',
                    onClick: handleSubmit,
                },
            ]}
            content='Make text-to-speech calls via sms77.io.'
            title={{label: 'Text-to-Speech'}}
        />

        <Filters disabled={'' !== params.to} filters={filters} setFilters={setFilters}/>

        <div data-for='to_tooltip'
             data-tip='Recipient number(s) – multiple recipients can be specified separated by commas. If specified, no users will get fetched from the collection'>
            <Label htmlFor='to'>Recipient(s)</Label>
            <InputText
                id='to'
                name='to'
                onChange={e => setParams({...params, to: e.target.value})}
                value={params.to}
            />
            <Tooltip id='to_tooltip'/>
        </div>

        <div data-for='from_tooltip'
             data-tip='Sender number - must be verified or a shared inbound number from sms77'>
            <Label htmlFor='from'>From</Label>
            <InputText
                id='from'
                maxlength={FROM_NUMERIC_MAX}
                name='from'
                onChange={e => setParams({...params, from: e.target.value})}
                value={params.from}
            />
            <Tooltip id='from_tooltip'/>
        </div>

        <Flex alignItems='center' justifyContent='space-between'>
            <Debug params={params} setParams={setParams}/>

            <div data-for='xml_tooltip'
                 data-tip='Enable if text is of XML format'>
                <Label htmlFor='xml'>XML?</Label>
                <Toggle
                    id='xml'
                    name='xml'
                    onChange={e => setParams({...params, xml: e.target.value})}
                    value={params.xml}
                />
                <Tooltip id='xml_tooltip'/>
            </div>
        </Flex>

        <Label htmlFor='text'>Text</Label>
        <Textarea
            id='text'
            maxlength={10000}
            name='text'
            onChange={e => setParams({...params, text: e.target.value})}
            required
            value={params.text}
        />
    </>
}
