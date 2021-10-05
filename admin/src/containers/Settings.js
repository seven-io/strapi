import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {InputText, Label} from '@buffetjs/core'
import {Header} from '@buffetjs/custom'
import {request} from 'strapi-helper-plugin'
import {defaultSettings, routes} from '../../../constants'
import getTrad from '../utils/getTrad'

export default () => { // TODO: wrap back in memo?!
    const {formatMessage} = useIntl()
    const [settings, setSettings] = useState(defaultSettings)

    useEffect(() => {
        (async () => {
            strapi.lockApp()

            setSettings(await request(routes.PluginSettings))

            strapi.unlockApp()
        })()
    }, [])

    const handleSubmit = async () => {
        strapi.lockApp()

        const _settings = await request(routes.PluginSettings, {
            body: settings,
            method: 'POST',
        })

        setSettings(_settings)

        strapi.unlockApp()

        strapi.notification.toggle({
            message: formatMessage({id: getTrad('settings.updated')})
        })
    }

    return <>
        <Header
            actions={[
                {
                    label: 'SMS',
                    onClick: () => window.location = `/admin/plugins${routes.Sms}`,
                },
                {
                    label: 'Voice',
                    onClick: () => window.location = `/admin/plugins${routes.Voice}`,
                },
                {
                    color: 'success',
                    label: 'Save',
                    onClick: handleSubmit,
                },
            ]}
            content={formatMessage({id: getTrad('settings.helper')})}
            title={{label: `sms77 ${formatMessage({id: getTrad('settings')})}`}}
        />

        <Label htmlFor='apiKey'>{formatMessage({id: getTrad('apiKey')})}</Label>
        <InputText
            id='apiKey'
            maxlength={90}
            name='apiKey'
            onChange={e => setSettings({...settings, apiKey: e.target.value})}
            value={settings.apiKey}
        />
    </>
};
