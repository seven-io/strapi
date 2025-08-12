import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Settings from './Settings';
import Sms from './Sms';
import Voice from './Voice';
import routes from '../../../constants/routes';
import { Page } from '@strapi/strapi/admin';

export default function App() {
  return <Routes>
    <Route element={<Settings />}  path={`/plugins${routes.Index}`}/>
    <Route element={<Sms />}  path={`/plugins${routes.Sms}`}/>
    <Route element={<Voice />} path={`/plugins${routes.Voice}`}/>
    <Route element={<Page.Error />}/>
  </Routes>;
};