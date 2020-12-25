import React from 'react';
import MessageField from './MessageField.jsx'
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';

export default class App extends React.Component {
    state = {
        messages: [
            {
                sender: 'bot',
                text: 'Hi!'
            }, 
            {
                sender: 'bot',
                text: 'How are you?'
            }
        ]
    };

    handleClick = (event) => {
        var text = document.getElementsByName("message")[0].value;
        if (text) {
            document.getElementsByName("message")[0].value = "";
            this.setState({ messages: [ ...this.state.messages, {sender: 'me', text} ] });
        }
    };

    render() {
        return (
            <div className="layout">
                <MessageField messages={ this.state.messages }/>
                <div style={ { width: '100%', display: 'flex', marginTop: 10, marginBottom: 15} }>
                    <TextField
                        name="message"
                        style={ { fontSize: '22px', width: '100%', height: 'none'} }
                    />
                    <FloatingActionButton 
                        onClick={ this.handleClick }
                        mini
                    >
                        <SendIcon />
                    </FloatingActionButton>
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        var t = setTimeout(() =>
            {
                if (this.state.messages[this.state.messages.length - 1].sender !== 'bot') {
                    this.setState({ messages: [ ...this.state.messages, {sender: 'bot', text: "Don't bother me, I'm a robot!"} ] })
                }
            }, 
            1000
        );
    }
}