import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from './Header.jsx';
import ChatList from './ChatList.jsx';
import HeaderInfo from './HeaderInfo.jsx';
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
        },
        redirect: ''
    };

    refInput = React.createRef();

    changeChat = (chatId) => {
        this.setState({ redirect: `/chat/${chatId}/` });
    }

    addChat = (userName) => {
        const { chats } = this.state;

        const chatId = Object.keys(chats).length + 1;
        this.setState({
            chats: {...chats, [chatId]: {userName, messageList: [], message: ''}}
        });
        this.changeChat(chatId);
    };

    handleClick = () => {
        this.handleSendMessage();
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
            this.handleSendMessage();
        }
    }

    handleSendMessage() {
        const { messages, chats } = this.state;
        const { chatId } = this.props;
        const sender = 'me';
        const message = this.state.chats[this.props.chatId].message;

        const messageId = ++Object.keys(messages).length;

        this.setState({ messages: { ...messages, [messageId]: {sender, text: message} } });
        this.setState({ chats: {...chats, [chatId]: {
            ...chats[chatId], 
            messageList: [...chats[chatId].messageList, messageId],
            message: ''
        } } });
    }

    handleSendMessageBot(chatId, message) {
        const { messages, chats } = this.state;
        const messageId = ++Object.keys(messages).length;
        const sender = 'bot';

        this.setState({ messages: { ...messages, [messageId]: {sender, text: message} } });
        this.setState({ chats: {...chats, [chatId]: {
            ...chats[chatId], 
            messageList: [...chats[chatId].messageList, messageId]
        } } });
    }

    doScrollToDown() {
        let messageField = document.getElementsByClassName('message-field')[0];
        messageField.scrollTo(0, messageField.scrollHeight);
    }

    render() {
        if (!this.state.chats[this.props.chatId]) {
            return <Redirect to={'/'} />
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="layout">
                <Header 
                    className="grid-header"
                />
                <ChatList 
                    chats={ this.state.chats }
                    userName={ this.state.chats[this.props.chatId].userName } 
                    className="grid-chatlist"
                    addChat={ this.addChat }
                />
                <HeaderInfo 
                    className='grid-headerinfo'
                    userName={ this.state.chats[this.props.chatId].userName }
                />
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
        try {
            this.refInput.current.focus();
        } catch (e) {
            console.log('Focus not set');
        }
    }

    componentDidUpdate() {
        if (this.state.redirect) {
            this.setState({redirect: ''});
        }

        try {
            this.refInput.current.focus();
            this.doScrollToDown();
        } catch (e) {
            console.log('Focus not set');
        }
        
        let myFunction = () => {
            let chatId = this.props.chatId;
            let previousMessageId = this.state.chats[chatId].messageList.slice(-1)[0]
            
            setTimeout(() => {
                    let messageId = this.state.chats[chatId].messageList.slice(-1)[0]; //to get last array's element
                    if (messageId && previousMessageId === messageId) {
                        let sender = this.state.messages[messageId].sender;

                        if (sender !== 'bot') {
                            this.handleSendMessageBot(chatId, "Don't bother me, I'm a robot!");
                        }
                    }
                }, 1000
            );
        }

        myFunction();
    }
}