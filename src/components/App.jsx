import React from 'react';
import MessageField from './MessageField.jsx'

export default class App extends React.Component {
    state = {
        messages: ['first message', 'second message']
    };

    handleClick = (event) => {
        let message = document.getElementsByName("message")[0].value;
        document.getElementsByName("message")[0].value = "";
        this.setState({ messages: [ ...this.state.messages, message ] });
    };

    render() {
        return (
            <>
                <MessageField messages={ this.state.messages }/>
                <input name="message"></input>
                <button onClick={ this.handleClick }>Send</button>
            </>
        )
    }
}