import React from 'react';
import MessageField from './MessageField.jsx'

export default class App extends React.Component {
    state = {
        messages: [
            {
                sender: 'anonim',
                text: 'first message'
            }, 
            {
                sender: 'anonim',
                text: 'second message'
            }
        ]
    };

    handleClick = (event) => {
        var text = document.getElementsByName("message")[0].value;
        if (text) {
            document.getElementsByName("message")[0].value = "";
            this.setState({ messages: [ ...this.state.messages, {sender: 'anonim', text} ] });
        }
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

    componentDidUpdate() {
        var t = setTimeout(() =>
            {
                if (this.state.messages[this.state.messages.length - 1].sender !== 'robot') {
                    this.setState({ messages: [ ...this.state.messages, {sender: 'robot', text: "Don't bother me, I'm a robot!"} ] })
                }
            }, 
            1000
        );
    }
}