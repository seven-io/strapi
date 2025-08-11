import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page, Layout } from '@strapi/design-system';
import Settings from './Settings';
import Sms from './Sms';
import Voice from './Voice';
import { routes } from '../../../constants';

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path={routes.Index} element={<Settings />} />
                <Route path={routes.Sms} element={<Sms />} />
                <Route path={routes.Voice} element={<Voice />} />
                <Route path="*" element={<Page.Error />} />
            </Routes>
        </Layout>
    );
};
