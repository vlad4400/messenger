import React from 'react';
import Message from './Message.jsx';

export default class MessageField extends React.Component {
    render() {
        return (
            <div className={ this.props.className + ' message-field'}>
                { this.props.messages.map((message, index) => <Message key={ index } sender={ message.sender } text={ message.text }/>) }
            </div>
        )
    }
}