import React from 'react';

import Messages from '../components/Messages';

const MessageContainer = ({ channelId }) =>
    (
        <Messages channelId={channelId}>
            <ul className="message-list">
                <li />
                <li />
            </ul>
        </Messages>
    );
export default MessageContainer;