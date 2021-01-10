import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class Message extends React.Component {
    

    render() {
        return (
            <div 
                className="message"
                style={ { alignSelf: this.props.sender === 'bot' ? 'flex-start' : 'flex-end' } }
            >
                <div>{ this.props.text }</div>
                <div className="message-sender">{ this.props.sender }</div>
            </div>
        )
    }
}
