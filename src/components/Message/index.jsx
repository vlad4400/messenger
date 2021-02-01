import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deleteMessage } from '../../actions/messageActions';
import './styles.css';

class Message extends React.Component {
    static propTypes = {
        messageId: PropTypes.number.isRequired,
        chatId: PropTypes.number.isRequired,
        sender: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        deleteMessage: PropTypes.func.isRequired,
    }

    handleMessageDelete = () => {
        this.props.deleteMessage(this.props.messageId, this.props.chatId);
    }

    render() {
        return (
            <div 
                className="message"
                style={ { alignSelf: this.props.sender === 'bot' ? 'flex-start' : 'flex-end' } }
            >
                <div>{ this.props.text }</div>
                <div className="footer">
                    <div className="message-sender">{ this.props.sender }</div>
                    <div className="btn-delete" onClick={ this.handleMessageDelete }>delete</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ chatReducer }) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ deleteMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Message);