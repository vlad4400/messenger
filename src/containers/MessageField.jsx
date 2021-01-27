import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import Message from '../components/Message';
import { loadMessages } from '../actions/messageActions';

class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        chats: PropTypes.object.isRequired,
        messages: PropTypes.object,
        loadMessages: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isMessagesLoaded: PropTypes.bool.isRequired,
    }

    render() {
        if (this.props.isLoading) {
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
        if (!this.props.isMessagesLoaded) {
            this.props.loadMessages();
        }
    }
}

const mapStateToProps = ({ messageReducer }) => ({
    messages: messageReducer.messages,
    isLoading: messageReducer.isLoading,
    isMessagesLoaded: messageReducer.isMessagesLoaded,
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadMessages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (MessageField);