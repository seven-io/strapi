import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import {Flex, Label, Toggle,} from '@buffetjs/core'
import {Tooltip} from '@buffetjs/styles'
import {Header} from '@buffetjs/custom'
import {defaultFilters, defaultVoiceParams, routes} from '../../../constants'
import Filters from '../components/Filters'
import {Debug} from '../components/Debug'
import {AdminUtil} from '../AdminUtil'
import getTrad from '../utils/getTrad'
import {To} from '../components/To'
import {From} from '../components/From'
import {Text} from '../components/Text'

export default function Voice() {
    const {formatMessage} = useIntl()
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
                    label: formatMessage({id: getTrad('send')}),
                    onClick: handleSubmit,
                },
            ]}
            content={formatMessage({id: getTrad('tts.helper')})}
            title={{label: formatMessage({id: getTrad('tts')})}}
        />

        <Filters disabled={'' !== params.to} filters={filters} setFilters={setFilters}/>

        <To params={params} setParams={setParams}/>

        <From params={params} setParams={setParams} tooltip='from.helper.tts'/>

        <Flex alignItems='center' justifyContent='space-between'>
            <Debug params={params} setParams={setParams}/>

            <div data-for='xml_tooltip'
                 data-tip={formatMessage({id: getTrad('xml.tooltip')})}>
                <Label htmlFor='xml'>XML</Label>
                <Toggle
                    id='xml'
                    name='xml'
                    onChange={e => setParams({...params, xml: e.target.value})}
                    value={params.xml}
                />
                <Tooltip id='xml_tooltip'/>
            </div>
        </Flex>

        <Text setParams={setParams} params={params} maxlength={10000}/>
    </>
}
