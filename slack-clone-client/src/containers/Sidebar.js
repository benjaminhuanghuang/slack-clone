import React from 'react';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

export default class Sidebar extends React.Component {
    state = {
        openAddChannelModal: false,
        openInvitePeopleModal: false
    }

    handleAddChannelClick = () => {
        this.setState({ openAddChannelModal: true });
    }

    handleCloseChannelModal = () => {
        this.setState({ openAddChannelModal: false });
    }

    hadleInvitePeopleClick = () => {
        this.setState({ openInvitePeopleModal: true });
    }

    hadleCloseInvitePeopleModal = () => {
        this.setState({ openInvitePeopleModal: false });
    }

    render() {
        const { teams, team } = this.props;
        const { openAddChannelModal, openInvitePeopleModal } = this.state;

        let username = '';
        try {
            const token = localStorage.getItem('token');
            const { user } = decode(token);
            // eslint-disable-next-line prefer-destructuring
            username = user.username;
        } catch (err) { }

        return [
            <Teams key="team-sidebar"
                teams={teams}
            />,
            <Channels key="channels-sidebar"
                teamName={team.name}
                username={username}
                teamId={team.id}
                channels={team.channels}
                users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
                onAddChannelClick={this.handleAddChannelClick}
                onInvitePeopleClick={this.hadleInvitePeopleClick}
            />,
            <AddChannelModal
                teamId={team.id}
                onClose={this.handleCloseChannelModal}
                open={openAddChannelModal}
                key="sidebar-add-channel-model"
            />,
            <InvitePeopleModal
                teamId={team.id}
                onClose={this.handleCloseInvitePeopleModal}
                open={openInvitePeopleModal}
                key="sidebar-invite-people-model"
            />
        ];
    };
}
