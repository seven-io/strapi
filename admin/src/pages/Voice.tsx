import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import defaultFilters from '../../../constants/defaultFilters'
import defaultVoiceParams from '../../../constants/defaultVoiceParams'
import routes from '../../../constants/routes'
import Filters from '../components/Filters'
import {To} from '../components/voice/To'
import {From} from '../components/voice/From'
import {Text} from '../components/voice/Text'
import {LinkButton} from "@strapi/design-system";
import {getTranslation} from "../utils/getTranslation";
import { Flex } from "@strapi/design-system"
import { Toggle } from "@strapi/design-system"
import { Tooltip } from "@strapi/design-system"
import {AdminUtil} from "../utils/AdminUtil";

export default function Voice() {
  const {formatMessage} = useIntl()
  const [params, setParams] = useState(defaultVoiceParams)
  const [filters, setFilters] = useState(defaultFilters)

  const handleSubmit = async () => {
    await AdminUtil.handleSubmitMessage(routes.Voice, {filters, params})
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
      content={formatMessage({id: getTranslation('tts.helper')})}
      title={{label: formatMessage({id: getTranslation('tts')})}}
    />*/}
    <LinkButton  onClick={handleSubmit}>{formatMessage({id: getTranslation('send')})}</LinkButton>

    <Filters disabled={'' !== params.to} filters={filters} setFilters={setFilters}/>

    <To params={params} setParams={setParams}/>

    <From params={params} setParams={setParams} tooltip='from.helper.tts'/>

    <Flex alignItems='center' justifyContent='space-between'>
      <div data-for='xml_tooltip'
           data-tip={formatMessage({id: getTranslation('xml.tooltip')})}>
        <Toggle
          id='xml'
          name='xml'
          offLabel={getTranslation('off')}
          onLabel={getTranslation('on')}
          onChange={e => setParams({...params, xml: e.target.checked})}
          checked={params.xml}
        />
        <Tooltip id='xml_tooltip'/>
      </div>
    </Flex>

    <Text setParams={setParams} params={params} maxlength={10000}/>
  </>
}