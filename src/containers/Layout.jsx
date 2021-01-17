import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import { addChat } from '../actions/chatActions';
import { sendMessage, saveInput } from '../actions/messageActions';
import Header from './Header';
import ChatList from './ChatList';
import HeaderInfo from './HeaderInfo';
import MessageField from './MessageField';

import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';

class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
        addChat: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        saveInput: PropTypes.func.isRequired
    };

    static defaultProps = {
        chatId: 1
    }

    state = {
        redirect: ''
    };

    refInput = React.createRef();

    changeChat = (chatId) => {
        this.setState({ redirect: `/chat/${chatId}/` });
    }

    addChat = (userName) => {
        const { chats } = this.props.store;
        const chatId = Object.keys(chats).length + 1;

        this.props.addChat(userName);
        this.changeChat(chatId);
    };

    handleClick = () => {
        this.handleSendMessage();
        this.refInput.current.focus();
    };

    handleChange = (event) => {
        const { chatId } = this.props;
        const input = event.target.value;

        this.props.saveInput(chatId, input);
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.handleSendMessage();
        }
    }

    handleSendMessage() {
        const { chatId } = this.props;
        const sender = 'me';
        const message = this.props.store.chats[this.props.chatId].input;
        const messageId = ++Object.keys(this.props.store.messages).length;

        if (message) {
            this.props.sendMessage(messageId, sender, message, chatId);
        }
    }

    handleSendMessageBot(chatId, message) {
        const messageId = ++Object.keys(this.props.store.messages).length;
        const sender = 'bot';

        this.props.sendMessage(messageId, sender, message, chatId);
    }

    doScrollToDown() {
        let messageField = document.getElementsByClassName('message-field')[0];
        messageField.scrollTo(0, messageField.scrollHeight);
    }

    render() {
        if (!this.props.store.chats[this.props.chatId]) {
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
                    chats={ this.props.store.chats }
                    userName={ this.props.store.chats[this.props.chatId].userName } 
                    className="grid-chatlist"
                    addChat={ this.addChat }
                />
                <HeaderInfo 
                    className='grid-headerinfo'
                    userName={ this.props.store.chats[this.props.chatId].userName }
                />
                <MessageField 
                    className="grid-messagefield" 
                    messages={ this.props.store.messages } 
                    userName={ this.props.store.chats[this.props.chatId].userName }
                    messageList={ this.props.store.chats[this.props.chatId].messageList }
                />
                <div className="grid-textfield" style={ { width: '100%', display: 'flex', marginTop: 10, marginBottom: 15} }>
                    <TextField
                        name="input"
                        ref={ this.refInput }
                        style={ { fontSize: '22px', width: '100%', height: 'none', paddingLeft: 20, paddingRight: 20} }
                        value={ this.props.store.chats[this.props.chatId].input }
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
            this.doScrollToDown();
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
    }
}

const mapStateToProps = ({ chatReducer }) => ({ store: {
        chats: chatReducer.chats,
        messages: chatReducer.messages
    }});
const mapDispatchToProps = dispatch => bindActionCreators({ addChat, sendMessage, saveInput }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Layout);