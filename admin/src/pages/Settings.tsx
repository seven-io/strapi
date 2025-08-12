import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import { useOverlayBlocker, useNotification} from '@strapi/helper-plugin'
import defaultSettings from '../../../constants/defaultSettings'
import routes from '../../../constants/routes'
import {getTranslation} from "../utils/getTranslation";
import {Field, TextInput} from "@strapi/design-system";
import { LinkButton } from "@strapi/design-system"
import {NavLink} from "react-router-dom";
import { useFetchClient } from '@strapi/strapi/admin';

export default () => { // TODO: wrap back in memo?!
  const {formatMessage} = useIntl()
  const [settings, setSettings] = useState(defaultSettings)
  const { lockApp, unlockApp } = useOverlayBlocker();
  const toggleNotification = useNotification()
  const {get, post} = useFetchClient()

  useEffect(() => {
    (async () => {
      lockApp && lockApp()

      const res = await get(routes.PluginSettings)
      setSettings( res.data())

      unlockApp && unlockApp()
    })()
  }, [])

  const handleSubmit = async () => {
    lockApp && lockApp()

    const _settings = await post(routes.PluginSettings, {
      body: JSON.stringify(settings),
      method: 'POST',
    })
    const _settingz: typeof defaultSettings =  _settings.data()

    setSettings(_settingz)

    unlockApp && unlockApp()

    toggleNotification({
      message: formatMessage({id: getTranslation('settings.updated')})
    })
  }

  return <>
{/*    <Header
      actions={[
        {
          label: 'SMS',
          onClick: () => window.location = ,
        },
        {
          label: formatMessage({id: getTranslation('tts')}),
          onClick: () => window.location = `/admin/plugins${routes.Voice}`,
        },
        {
          color: 'success',
          label: ,
          onClick: handleSubmit,
        },
      ]}
      content={formatMessage({id: getTranslation('settings.helper')})}
      title={{label: `seven ${formatMessage({id: getTranslation('settings')})}`}}
    />*/}

    <LinkButton tag={NavLink} to={`/admin/plugins${routes.Sms}`}>SMS</LinkButton>
    <LinkButton tag={NavLink} to={`/admin/plugins${routes.Voice}`}>{formatMessage({id: getTranslation('tts')})}</LinkButton>
    <LinkButton  onClick={handleSubmit}>{formatMessage({id: getTranslation('save')})}</LinkButton>

    <Field.Root id='apiKey'>
      <Field.Label>{formatMessage({id: getTranslation('apiKey')})}</Field.Label>
      <TextInput
        id='apiKey'
        name='apiKey'
        maxLength={90}
        onChange={e => setSettings({...settings, apiKey: e.target.value})}
        value={settings.apiKey}
      />
      <Field.Error />
      <Field.Hint />
    </Field.Root>
  </>
};