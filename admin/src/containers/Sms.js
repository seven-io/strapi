import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import {Flex, InputNumber, InputText, Label, Toggle,} from '@buffetjs/core'
import {Tooltip} from '@buffetjs/styles'
import {DateTime, Header} from '@buffetjs/custom'
import {
    FOREIGN_ID_MAX_LENGTH,
    LABEL_MAX_LENGTH
} from 'sms77-client/dist/validators/request/sms'
import Util from '../../../Util'
import {defaultFilters, defaultSmsParams, routes} from '../../../constants'
import Filters from '../components/Filters'
import {AdminUtil} from '../AdminUtil'
import getTrad from '../utils/getTrad'
import {To} from '../components/To'
import {From} from '../components/From'
import {Text} from '../components/Text'

export default function Sms() {
    const {formatMessage} = useIntl()
    const [params, setParams] = useState(defaultSmsParams)
    const [filters, setFilters] = useState(defaultFilters)

    const handleSubmit = async () => {
        if (params.delay) params.delay = Util.toLocaleTimestamp(params.delay._d)
        await AdminUtil.handleSubmitMessage(routes.Sms, {filters, params})
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
            content={formatMessage({id: getTrad('sms.helper')})}
            title={{label: 'SMS'}}
        />

        <Filters disabled={'' !== params.to} filters={filters} setFilters={setFilters}/>

        <To params={params} setParams={setParams}/>

        <From params={params} setParams={setParams} tooltip='from.helper.sms'/>

        <div data-for='foreign_id_tooltip'
             data-tip={formatMessage({id: getTrad('foreignId.tooltip')})}>
            <Label
                htmlFor='foreign_id'>{formatMessage({id: getTrad('foreignId')})}</Label>
            <InputText
                id='foreign_id'
                maxlength={FOREIGN_ID_MAX_LENGTH}
                name='foreign_id'
                onChange={e => setParams({...params, foreign_id: e.target.value})}
                value={params.foreign_id}
            />
            <Tooltip id='foreign_id_tooltip'/>
        </div>

        <div data-for='label_tooltip'
             data-tip={formatMessage({id: getTrad('label.tooltip')})}>
            <Label
                htmlFor='label'>{formatMessage({id: getTrad('label')})}</Label>
            <InputText
                id='label'
                maxlength={LABEL_MAX_LENGTH}
                name='label'
                onChange={e => setParams({...params, label: e.target.value})}
                value={params.label}
            />
            <Tooltip id='label_tooltip'/>
        </div>

        <div data-for='ttl_tooltip'
             data-tip={formatMessage({id: getTrad('ttl.tooltip')})}>
            <Label
                htmlFor='ttl'>{formatMessage({id: getTrad('ttl')})}</Label>
            <InputNumber
                id='ttl'
                name='ttl'
                onChange={e => setParams({...params, ttl: e.target.value})}
                value={params.ttl}
            />
            <Tooltip id='ttl_tooltip'/>
        </div>

        <Flex alignItems='center' justifyContent='space-between'>
            <div data-for='delay_tooltip'
                 data-tip={formatMessage({id: getTrad('delay.tooltip')})}>
                <Label
                    htmlFor='delay'>{formatMessage({id: getTrad('delay')})}</Label>
                <DateTime
                    id='delay'
                    name='delay'
                    onChange={e => setParams({...params, delay: e.target.value})}
                    value={params.delay}
                />
                <Tooltip id='delay_tooltip'/>
            </div>

            <div data-for='flash_tooltip'
                 data-tip={formatMessage({id: getTrad('flash.tooltip')})}>
                <Label htmlFor='flash'>{formatMessage({id: getTrad('flash')})}</Label>
                <Toggle
                    id='flash'
                    name='flash'
                    onChange={e => setParams({...params, flash: e.target.value})}
                    value={params.flash}
                />
                <Tooltip id='flash_tooltip'/>
            </div>

            <div data-for='no_reload_tooltip'
                 data-tip={formatMessage({id: getTrad('noReload.tooltip')})}>
                <Label
                    htmlFor='no_reload'>{formatMessage({id: getTrad('noReload')})}</Label>
                <Toggle
                    id='no_reload'
                    name='no_reload'
                    onChange={e => setParams({...params, no_reload: e.target.value})}
                    value={params.no_reload}
                />
                <Tooltip id='no_reload_tooltip'/>
            </div>

            <div data-for='performance_tracking_tooltip'
                 data-tip={formatMessage({id: getTrad('performanceTracking.tooltip')})}>
                <Label htmlFor='performance_tracking'>
                    {formatMessage({id: getTrad('performanceTracking')})}</Label>
                <Toggle
                    id='performance_tracking'
                    name='performance_tracking'
                    onChange={e => setParams({
                        ...params,
                        performance_tracking: e.target.value
                    })}
                    value={params.performance_tracking}
                />
                <Tooltip id='performance_tracking_tooltip'/>
            </div>
        </Flex>

        <Text setParams={setParams} params={params} maxlength={1520}/>
    </>
}
