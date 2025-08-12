import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import Settings from './Settings';
import Sms from './Sms';
import Voice from './Voice';

export default function App() {
  return (
    <Switch>
      <Route component={Settings} exact path="/plugins/seven" />
      <Route component={Sms} exact path="/plugins/seven/sms" />
      <Route component={Voice} exact path="/plugins/seven/voice" />
      <Route component={NotFound} />
    </Switch>
  );
}
