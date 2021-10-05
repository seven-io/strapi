import React, {useEffect, useState} from 'react';
import {InputText, Label} from '@buffetjs/core';
import {Header} from '@buffetjs/custom';
import {request} from 'strapi-helper-plugin';
import {defaultSettings, routes} from '../../../constants';

export default () => { // TODO: wrap back in memo?!
    const [settings, setSettings] = useState(defaultSettings);

    useEffect(() => {
        (async () => {
            strapi.lockApp();

            setSettings(await request(routes.PluginSettings));

            strapi.unlockApp();
        })();
    }, []);

    const handleSubmit = async () => {
        strapi.lockApp();

        const _settings = await request(routes.PluginSettings, {
            body: settings,
            method: 'POST',
        });

        setSettings(_settings);

        strapi.unlockApp();

        strapi.notification.toggle({message: 'Settings Updated!'});
    };

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
            content='Bulk messaging via sms77 - a Germany based SMS provider established in 2003'
            title={{label: 'sms77 Settings'}}
        />

        <Label htmlFor='apiKey'>API Key</Label>
        <InputText
            id='apiKey'
            maxlength={90}
            name='apiKey'
            onChange={e => setSettings({...settings, apiKey: e.target.value})}
            value={settings.apiKey}
        />
    </>;
};
