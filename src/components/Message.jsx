import React from 'react';

export default class Message extends React.Component {
    render() {
        return (
            <div>
                <span>[{ this.props.message.sender }] </span>
                <span>{ this.props.message.text }</span>
            </div>
        )
    }
}
