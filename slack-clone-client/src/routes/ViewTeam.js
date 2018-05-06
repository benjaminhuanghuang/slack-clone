// https://react.semantic-ui.com/collections/grid#grid-example-grid
// https://www.sitepoint.com/introduction-css-grid-layout-module/

import React from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

export default () => (
    <AppLayout>
        <Teams teams={[{ id: 1, letter: 'B' }, { id: 2, letter: 'Q' }]} />
        <Channels teamName="Team name" userName="User name" channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
            users={[{ id: 1, name: 'ben' }, { id: 2, name: 'huang' }]} />
        <Header>Header</Header>
        <Header channelName="general" />
        <Messages>
            <ul className="message-list">
                <li />
                <li />
            </ul>
        </Messages>
        <SendMessage channelName="general" />
    </AppLayout>
);