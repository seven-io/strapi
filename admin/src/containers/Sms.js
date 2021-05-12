import React, {useEffect, useState} from 'react';
import {
    Flex,
    InputNumber,
    InputText,
    Label,
    Select,
    Textarea,
    Toggle,
} from '@buffetjs/core';
import {Tooltip} from '@buffetjs/styles';
import {DateTime, Header} from '@buffetjs/custom';
import {request} from 'strapi-helper-plugin';
import {defaultFilters, defaultSmsParams, routes} from '../../../constants';
import {
    FOREIGN_ID_MAX_LENGTH,
    FROM_NUMERIC_MAX,
    LABEL_MAX_LENGTH
} from 'sms77-client/dist/validators/request/sms';
import {toLocaleTimestamp} from '../../../utils';

export default function Sms() {
    const [params, setParams] = useState(defaultSmsParams);
    const [filters, setFilters] = useState(defaultFilters);
    const [filterValues, setFilterValues] = useState(defaultFilters);

    useEffect(() => {
        (async () => {
            strapi.lockApp();

            setFilterValues(await request(routes.BulkFilters));

            strapi.unlockApp();
        })();
    }, []);

    const handleSubmit = async () => {
        strapi.lockApp();

        const body = {filters, params};

        if (params.delay) {
            body.params.delay = toLocaleTimestamp(params.delay._d);
        }

        const {message} = await request(routes.Sms, {
            body,
            method: 'POST',
        });

        strapi.unlockApp();

        strapi.notification.toggle({message: JSON.stringify(message)});
    };

    return <>
        <Header
            actions={[
                {
                    color: 'success',
                    label: 'Send',
                    onClick: handleSubmit,
                },
            ]}
            title={{label: 'Sms77 SMS'}}
            content='Send SMS via sms77.io SMS gateway.'
        />

        <section>
            <h2>
                Filters - <small>not applied if field "To" is set.</small>
            </h2>

            <Label htmlFor='filter_role'>Role</Label>
            <Select
                disabled={'' !== params.to}
                id='filter_role'
                name='filter_role'
                onChange={({target: {value}}) =>
                    setFilters({...filters, roles: value ? [value] : []})}
                options={filterValues.roles}
                value={filters.roles}
            />

            <hr/>
        </section>

        <div data-for='to_tooltip'
             data-tip='Recipient number(s) – accepts numbers and address book entries (groups and contacts). Multiple recipients can be specified separated by commas'>
            <Label htmlFor='to'>To</Label>
            <InputText
                id='to'
                name='to'
                onChange={e => setParams({...params, to: e.target.value})}
                value={params.to}
            />
            <Tooltip id='to_tooltip'/>
        </div>

        <div data-for='from_tooltip'
             data-tip='Sender number. It may contain a maximum of 11 alphanumeric or 16 numeric characters'>
            <Label htmlFor='from'>From</Label>
            <InputText
                id='from'
                maxlength={FROM_NUMERIC_MAX}
                name='from'
                onChange={e => setParams({...params, from: e.target.value})}
                value={params.from}
            />
            <Tooltip id='from_tooltip'/>
        </div>

        <div data-for='foreign_id_tooltip'
             data-tip='A custom identifier returned in DLR callbacks. Max. 64 chars, allowed characters: a-z, A-Z, 0-9, .-_@'>
            <Label htmlFor='foreign_id'>Foreign ID</Label>
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
             data-tip='A custom label for assigning it to your statistics. Max. 100 chars, allowed characters: a-z, A-Z, 0-9, .-_@'>
            <Label htmlFor='label'>Label</Label>
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
             data-tip='Specifies the validity period of the SMS in minutes - defaults to 2880 (48 hours)'>
            <Label htmlFor='ttl'>TTL</Label>
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
                 data-tip='Pick a date and time for time-delayed SMS sending'>
                <Label htmlFor='delay'>Delay</Label>
                <DateTime
                    id='delay'
                    name='delay'
                    onChange={e => {


                        setParams({...params, delay: e.target.value});
                    }}
                    value={params.delay}
                />
                <Tooltip id='delay_tooltip'/>
            </div>

            <div data-for='debug_tooltip'
                 data-tip='No SMS will be sent or calculated ir activated'>
                <Label htmlFor='debug'>Debug</Label>
                <Toggle
                    id='debug'
                    name='debug'
                    onChange={e => setParams({...params, debug: e.target.value})}
                    value={params.debug}
                />
                <Tooltip id='debug_tooltip'/>
            </div>

            <div data-for='flash_tooltip'
                 data-tip='Send Flash SMS directly displayed in the receivers display'>
                <Label htmlFor='flash'>Flash</Label>
                <Toggle
                    id='flash'
                    name='flash'
                    onChange={e => setParams({...params, flash: e.target.value})}
                    value={params.flash}
                />
                <Tooltip id='flash_tooltip'/>
            </div>

            <div data-for='no_reload_tooltip'
                 data-tip='Switch off reload lock to prevent sending duplicate SMS (text, type and recipient alike) within 180 seconds. Can be permanently deactivated in your login under Settings > SMS'>
                <Label htmlFor='no_reload'>No Reload</Label>
                <Toggle
                    id='no_reload'
                    name='no_reload'
                    onChange={e => setParams({...params, no_reload: e.target.value})}
                    value={params.no_reload}
                />
                <Tooltip id='no_reload_tooltip'/>
            </div>

            <div data-for='performance_tracking_tooltip'
                 data-tip='Enable Performance Tracking for URLs found in the message text'>
                <Label htmlFor='performance_tracking'>Performance Tracking</Label>
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

        <Label htmlFor='text'>Text</Label>
        <Textarea
            id='text'
            maxlength={1520}
            name='text'
            onChange={e => setParams({...params, text: e.target.value})}
            required
            value={params.text}
        />
    </>;
}