import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import {
  FOREIGN_ID_MAX_LENGTH,
  LABEL_MAX_LENGTH
} from 'sms77-client/dist/validators/request/sms'
import Util from '../../../Util'
import defaultFilters from '../../../constants/defaultFilters'
import defaultSmsParams from '../../../constants/defaultSmsParams'
import routes from '../../../constants/routes'
import Filters from '../components/Filters'
import {To} from '../components/sms/To'
import {From} from '../components/sms/From'
import {Text} from '../components/sms/Text'
import { AdminUtil } from "src/utils/AdminUtil"
import {Flex, LinkButton, Toggle} from "@strapi/design-system";
import { Tooltip } from "@strapi/design-system"
import { getTranslation } from "src/utils/getTranslation"
import { Field } from "@strapi/design-system"
import { TextInput } from "@strapi/design-system"
import { NumberInput } from "@strapi/design-system"
import { DateTimePicker } from "@strapi/design-system"

export default function Sms() {
  const {formatMessage} = useIntl()
  const [params, setParams] = useState(defaultSmsParams)
  const [filters, setFilters] = useState(defaultFilters)

  const handleSubmit = async () => {
    if (params.delay) params.delay = Util.toLocaleTimestamp(params.delay).toString()
    await AdminUtil.handleSubmitMessage(routes.Sms, {filters, params})
  }

  return <>
{/*    <Header
      actions={[
        {
          color: 'success',
          label: formatMessage({id: getTranslation('send')}),
          onClick: handleSubmit,
        },
      ]}
      content={formatMessage({id: getTranslation('sms.helper')})}
      title={{label: 'SMS'}}
    />*/}
    <LinkButton  onClick={handleSubmit}>{formatMessage({id: getTranslation('send')})}</LinkButton>

    <Filters disabled={'' !== params.to} filters={filters} setFilters={setFilters}/>

    <To params={params} setParams={setParams}/>

    <From params={params} setParams={setParams} tooltip='from.helper.sms'/>

    <div data-for='foreign_id_tooltip' data-tip={formatMessage({id: getTranslation('foreignId.tooltip')})}>
      <Field.Root id='foreign_id'>
        <Field.Label>{formatMessage({id: getTranslation('foreignId')})}</Field.Label>
        <TextInput
          id='foreign_id'
          maxLength={FOREIGN_ID_MAX_LENGTH}
          name='foreign_id'
          onChange={e => setParams({...params, foreign_id: e.target.value})}
          value={params.foreign_id}
        />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
      <Tooltip id='foreign_id_tooltip'/>
    </div>

    <div data-for='label_tooltip'
         data-tip={formatMessage({id: getTranslation('label.tooltip')})}>
      <Field.Root id='label'>
        <Field.Label >{formatMessage({id: getTranslation('label')})}</Field.Label>
        <TextInput
          id='label'
          maxLength={LABEL_MAX_LENGTH}
          name='label'
          onChange={e => setParams({...params, label: e.target.value})}
          value={params.label}
        />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
      <Tooltip id='label_tooltip'/>
    </div>

    <div data-for='ttl_tooltip'
         data-tip={formatMessage({id: getTranslation('ttl.tooltip')})}>
      <Field.Root id='ttl'>
        <Field.Label >{formatMessage({id: getTranslation('ttl')})}</Field.Label>
        <NumberInput
          id='ttl'
          name='ttl'
          onValueChange={ttl => setParams({...params, ttl})}
          value={null === params.ttl ? undefined : params.ttl}
        />
        <Field.Error />
        <Field.Hint />
      </Field.Root>
      <Tooltip id='ttl_tooltip'/>
    </div>

    <Flex alignItems='center' justifyContent='space-between'>
      <div data-for='delay_tooltip'
           data-tip={formatMessage({id: getTranslation('delay.tooltip')})}>
        <Field.Root id='delay'>
          <Field.Label >{formatMessage({id: getTranslation('delay')})}</Field.Label>
          <DateTimePicker
            id='delay'
            name='delay'
            onChange={delay => setParams({...params, delay: delay?.toString()})}
            value={params.delay ? new Date(params.delay) : null}
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>
        <Tooltip id='delay_tooltip'/>
      </div>

      <div data-for='flash_tooltip'
           data-tip={formatMessage({id: getTranslation('flash.tooltip')})}>
        <Field.Root id='flash'>
          <Field.Label>{formatMessage({id: getTranslation('flash')})}</Field.Label>
          <Toggle
            id='flash'
            name='flash'
            offLabel={getTranslation('off')}
            onChange={e => setParams({...params, flash: e.target.checked})}
            onLabel={getTranslation('on')}
            checked={params.flash}
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>

        <Tooltip id='flash_tooltip'/>
      </div>

      <div data-for='no_reload_tooltip'
           data-tip={formatMessage({id: getTranslation('noReload.tooltip')})}>
        <Field.Root id='no_reload'>
          <Field.Label >{formatMessage({id: getTranslation('noReload')})}</Field.Label>
          <Toggle
            id='no_reload'
            name='no_reload'
            offLabel={getTranslation('off')}
            onChange={e => setParams({...params, no_reload: e.target.checked})}
            onLabel={getTranslation('on')}
            checked={params.no_reload}
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>

        <Tooltip id='no_reload_tooltip'/>
      </div>

      <div data-for='performance_tracking_tooltip'
           data-tip={formatMessage({id: getTranslation('performanceTracking.tooltip')})}>
        <Field.Root id='performance_tracking'>
          <Field.Label >{formatMessage({id: getTranslation('performanceTracking')})}</Field.Label>
          <Toggle
            id='performance_tracking'
            name='performance_tracking'
            offLabel={getTranslation('off')}
            onChange={e => setParams({
              ...params,
              performance_tracking: e.target.checked
            })}
            onLabel={getTranslation('on')}
            checked={params.performance_tracking}
          />
          <Field.Error />
          <Field.Hint />
        </Field.Root>

        <Tooltip id='performance_tracking_tooltip'/>
      </div>
    </Flex>

    <Text setParams={setParams} params={params} maxlength={1520}/>
  </>
}