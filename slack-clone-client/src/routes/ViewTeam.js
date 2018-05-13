// https://react.semantic-ui.com/collections/grid#grid-example-grid
// https://www.sitepoint.com/introduction-css-grid-layout-module/

import React from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';

import { allTeamQuery } from '../graphql/team';

const ViewTeam = ({ data: { loading, allTeams }, match: { params: { teamId, channelId } } }) => {
    console.log(allTeams, loading)
    if (loading)
        return null;
    if (!allTeams.length) {
        return (<Redirect to="/create-team"/>);
    }
    const teamIdInteger = parseInt(teamId, 10);

    const teamIdx = teamIdInteger ? findIndex(allTeams, ['id', teamIdInteger]) : 0;
    const team = allTeams[teamIdx];

    const channelIdInteger = parseInt(channelId, 10);
    const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0;
    const channel = team.channels[channelIdx];

    <AppLayout>
                <Sidebar
                    teams={allTeams.map(t => ({
                        id: t.id,
                        letter: t.name.charAt(0).toUpperCase(),
                    }))}
                    team={team} />
                <Header channelName={channel.name} />
                <Messages channelId={channel.id}>
                    <ul className="message-list">
                        <li />
                        <li />
                    </ul>
                </Messages>
                <SendMessage channelName="general" />
            </AppLayout>
            };
            
export default graphql(allTeamQuery)(ViewTeam);