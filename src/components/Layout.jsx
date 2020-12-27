import React from 'react';
import ChatList from './ChatList.jsx';
import Header from './Header.jsx';
import MessageField from './MessageField.jsx';
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

    textInput = React.createRef();

    handleClick = (message) => {
        this.sendMessage();
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    sendMessage() {
        if (this.state.message) {
            this.setState({ messages: [ ...this.state.messages, {sender: 'me', text: this.state.message} ] });
            this.setState({ message: '' })
        }
    }

    doScrollToDown() {
        let messageField = document.getElementsByClassName('message-field')[0];
        messageField.scrollTo(0, messageField.scrollHeight);
    }
    
    render() {
        return (
            <div className="layout">
                <ChatList className="grid-chatlist"/>
                <Header className="grid-header"/>
                <MessageField className="grid-messagefield" messages={ this.state.messages }/>
                <div className="grid-textfield" style={ { width: '100%', display: 'flex', marginTop: 10, marginBottom: 15} }>
                    <TextField
                        name="message"
                        ref={ this.textInput }
                        style={ { fontSize: '22px', width: '100%', height: 'none', paddingLeft: 20, paddingRight: 20} }
                        value={ this.state.message ? this.state.message : '' }
                        onChange={ this.handleChange }
                        onKeyUp={ this.handleKeyUp }
                    />
                    <FloatingActionButton 
                        onClick={ () => this.handleClick() }
                        mini
                    >
                        <SendIcon />
                    </FloatingActionButton>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.textInput.current.focus();
    }

    componentDidUpdate() {
        this.textInput.current.focus();
        this.doScrollToDown();
        setTimeout(() => {
                if (this.state.messages[this.state.messages.length - 1].sender !== 'bot') {
                    this.setState({ messages: [ ...this.state.messages, {sender: 'bot', text: "Don't bother me, I'm a robot!"} ] });
                }
            }, 1000
        );
    }
}