import React, {Dispatch, SetStateAction} from 'react'
import {useIntl} from 'react-intl'
import {FROM_NUMERIC_MAX} from 'sms77-client/dist/validators/request/sms'
import {getTranslation} from "../../utils/getTranslation";
import { TextInput, Field, Tooltip } from "@strapi/design-system";
import defaultSmsParams from "../../../../constants/defaultSmsParams";

export function From({params, setParams, tooltip}: {
  params: typeof defaultSmsParams
  setParams: Dispatch<SetStateAction<typeof defaultSmsParams>>
  tooltip: string
}) {
  const {formatMessage} = useIntl()

  return <div data-for='from_tooltip' data-tip={formatMessage({id: getTranslation(tooltip)})}>
    <Field.Root id='from'>
      <Field.Label>{formatMessage({id: getTranslation('from')})}</Field.Label>
      <TextInput
        id='from'
        maxLength={FROM_NUMERIC_MAX}
        name='from'
        onChange={e => setParams({...params, from: e.target.value})}
        value={params.from}
      />
      <Field.Error />
      <Field.Hint />
    </Field.Root>

    <Tooltip id='from_tooltip'/>
  </div>
}