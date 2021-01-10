import React from 'react';
import Message from '../components/Message';

export default class MessageField extends React.Component {
    render() {
        return (
            <div className={ this.props.className + ' message-field'}>
                { this.props.messageList.map((messageIndex, index) => 
                    <Message 
                        key={ index } 
                        sender={ this.props.messages[messageIndex].sender } 
                        text={ this.props.messages[messageIndex].text }
                    />) }
            </div>
        )
    }
}