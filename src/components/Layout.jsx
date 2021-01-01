import React from 'react';
import PropTypes from 'prop-types';
import ChatList from './ChatList.jsx';
import Header from './Header.jsx';
import MessageField from './MessageField.jsx';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';

export default class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number
    };

    static defaultProps = {
        chatId: 1
    }

    state = {
        chats: {
            1: {userName: 'User Name 1', messageList: [1, 2], message: ''},
            2: {userName: 'User Name 2', messageList: [], message: ''},
            3: {userName: 'User Name 3', messageList: [], message: ''},
        },
        messages: {
            1: { sender: 'bot', text: "Hi!" },
            2: { sender: 'bot', text: "How are you?" },
        }
    };

    refInput = React.createRef();

    handleClick = () => {
        this.handleSendMessage('me');
        this.refInput.current.focus();
    };

    handleChange = (event) => {
        const { chats } = this.state;
        const { chatId } = this.props;

        this.setState({ chats: {...chats, [chatId]: {
            ...chats[chatId], 
            message: event.target.value
        } } });
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.handleSendMessage('me');
        }
    }

    handleSendMessage(sender, message = this.state.chats[this.props.chatId].message) {
        const { messages, chats } = this.state;
        const { chatId } = this.props;
        const messageId = ++Object.keys(messages).length;

        if (sender === 'bot') {
            this.setState({ messages: { ...messages, [messageId]: {sender, text: message} } });
            this.setState({ chats: {...chats, [chatId]: {
                ...chats[chatId], 
                messageList: [...chats[chatId].messageList, messageId]
            } } });
        } else if (message) {
            const messageId = ++Object.keys(messages).length;
            this.setState({ messages: { ...messages, [messageId]: {sender, text: message} } });
            this.setState({ chats: {...chats, [chatId]: {
                ...chats[chatId], 
                messageList: [...chats[chatId].messageList, messageId],
                message: ''
            } } });
        }
    }

    doScrollToDown() {
        let messageField = document.getElementsByClassName('message-field')[0];
        messageField.scrollTo(0, messageField.scrollHeight);
    }
    
    render() {
        return (
            <div className="layout">
                <ChatList 
                    chats={ this.state.chats }
                    userName={ this.state.chats[this.props.chatId].userName } 
                    className="grid-chatlist"
                />
                <Header userName={ this.state.chats[this.props.chatId].userName } className="grid-header"/>
                <MessageField 
                    className="grid-messagefield" 
                    messages={ this.state.messages } 
                    userName={ this.state.chats[this.props.chatId].userName }
                    messageList={ this.state.chats[this.props.chatId].messageList }
                />
                <div className="grid-textfield" style={ { width: '100%', display: 'flex', marginTop: 10, marginBottom: 15} }>
                    <TextField
                        name="message"
                        ref={ this.refInput }
                        style={ { fontSize: '22px', width: '100%', height: 'none', paddingLeft: 20, paddingRight: 20} }
                        value={ this.state.chats[this.props.chatId].message }
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
        this.refInput.current.focus();
    }

    componentDidUpdate() {
        this.refInput.current.focus();
        this.doScrollToDown();
        
        setTimeout(() => {
                if (this.state.messages[Object.keys(this.state.messages).length].sender !== 'bot') {
                    this.handleSendMessage('bot', "Don't bother me, I'm a robot!");
                }
            }, 1000
        );
    }
}