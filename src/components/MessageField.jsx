import React from 'react';
import Message from './Message.jsx';

export default class App extends React.Component {
    render() {
        return this.props.messages.map((message, index) => <Message key={ index } message={ message }/>)
    }
}