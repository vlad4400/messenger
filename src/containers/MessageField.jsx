import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import Message from '../components/Message';
import { loadChats } from '../actions/chatActions';

class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        chats: PropTypes.object.isRequired,
        messages: PropTypes.object,
        loadChats: PropTypes.func.isRequired,
        isChatsLoaded: PropTypes.bool.isRequired,
    }

    render() {
        if (!this.props.isChatsLoaded) {
            return <CircularProgress />
        }

        if (!this.props.chats[this.props.chatId]) {
            return '';
        }
        return (
            <div className={ this.props.className + ' message-field'}>
                { this.props.messageList.map((messageIndex, index) => 
                    <Message 
                        key={ index } 
                        messageId={ messageIndex }
                        chatId={ this.props.chatId }
                        sender={ this.props.messages[messageIndex].sender } 
                        text={ this.props.messages[messageIndex].text }
                    />) }
            </div>
        )
    }

    componentDidMount() {
        if (!this.props.isChatsLoaded) {
            this.props.loadChats();
        }
    }
}

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
    messages: messageReducer.messages,
    isChatsLoaded: chatReducer.isChatsLoaded,
    isMessagesLoaded: chatReducer.isMessagesLoaded,
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadChats }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (MessageField);