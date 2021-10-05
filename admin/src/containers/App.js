import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {NotFound} from 'strapi-helper-plugin';
import Settings from './Settings';
import Sms from './Sms';
import Voice from './Voice';
import {routes} from '../../../constants';

export default function App() {
    return <Switch>
        <Route component={Settings} exact path={`/plugins${routes.Index}`}/>
        <Route component={Sms} exact path={`/plugins${routes.Sms}`}/>
        <Route component={Voice} exact path={`/plugins${routes.Voice}`}/>
        <Route component={NotFound}/>
    </Switch>;
};
