import React, {Dispatch, SetStateAction} from 'react'
import {useIntl} from 'react-intl'
import {getTranslation} from "../../utils/getTranslation";
import { Field, Textarea } from "@strapi/design-system";
import defaultSmsParams from "../../../../constants/defaultSmsParams";

export function Text({maxlength, params, setParams}: {
  maxlength: number
  params: typeof defaultSmsParams
  setParams: Dispatch<SetStateAction<typeof defaultSmsParams>>
}) {
  const {formatMessage} = useIntl()

  return <>
    <Field.Root id='text'>
      <Field.Label>{formatMessage({id: getTranslation('text')})}</Field.Label>
      <Textarea
        id='text'
        maxLength={maxlength}
        name='text'
        onChange={e => setParams({...params, text: e.target.value})}
        required
        value={params.text}
      ></Textarea>
        <Field.Error />
        <Field.Hint />
    </Field.Root>
  </>
}