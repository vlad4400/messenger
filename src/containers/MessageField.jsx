import React from 'react';
import PropTypes from 'prop-types';

import Message from '../components/Message';

export default class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        chats: PropTypes.object.isRequired,
    }

    render() {
        if (!this.props.chats[this.props.chatId]) {
            return '';
        }
        return (
            <div className={ this.props.className + ' message-field'}>
                { this.props.messageList.map((messageIndex, index) => 
                    <Message 
                        key={ index } 
                        messageId={ messageIndex }
                        chatId={ this.props.chatId }
                        sender={ this.props.messages[messageIndex].sender } 
                        text={ this.props.messages[messageIndex].text }
                    />) }
            </div>
        )
    }
}