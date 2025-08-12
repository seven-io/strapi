import React, {Dispatch, SetStateAction} from 'react'
import {useIntl} from 'react-intl'
import {getTranslation} from "../../utils/getTranslation";
import {Field, TextInput, Tooltip} from "@strapi/design-system";
import defaultVoiceParams from "../../../../constants/defaultVoiceParams";

export function To({params, setParams}: {
  params: typeof defaultVoiceParams
  setParams: Dispatch<SetStateAction<typeof defaultVoiceParams>>
}) {
  const {formatMessage} = useIntl()

  return <div data-for='to_tooltip'
              data-tip={formatMessage({id: getTranslation('to.tooltip')})}>
    <Field.Root id='to'>
      <Field.Label >{formatMessage({id: getTranslation('to')})}</Field.Label>
      <TextInput
        id='to'
        name='to'
        onChange={e => setParams({...params, to: e.target.value})}
        value={params.to}
      />
      <Field.Error />
      <Field.Hint />
    </Field.Root>

    <Tooltip id='to_tooltip'/>
  </div>
}