import React from 'react';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Avatar from 'material-ui/Avatar';
import { TextField } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

import { addChat } from '../actions/chatActions';

class ChatList extends React.Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        addChat: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    }

    state = {
        newChatInput: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleKeyUp = (event) => {
        if (event.keyCode === 13) { //Enter
            this.handleAddChat();
        }
    }

    handleAddChat = () => {
        if (this.state.newChatInput.length > 0) {
            this.props.addChat(this.state.newChatInput);
            this.setState({ newChatInput: '' });
        }
    }

    handleNavigate = (link) => {
        this.props.push(link);
    }

    render() {
        return (
            <List
                className={ this.props.className }
                style={ { overflowY: 'scroll' } }
            >
                {
                    Object.keys(this.props.store.chats).map((chatId) =>
                        <ListItem key={ chatId } className={ `chat-list-${chatId}` }
                            onClick={ () => this.handleNavigate(`/chat/${chatId}`) }
                            primaryText={ this.props.store.chats[chatId].userName }
                            rightIcon={<CommunicationChatBubble />}
                            leftAvatar={<Avatar src="" />}
                        />
                    )
                }
                <ListItem
                    key="Add new chat"
                    leftAvatar={ <Avatar src="" /> }
                    rightIcon={ <AddIcon onClick={ this.handleAddChat } /> }
                    style={ { height: '60px' } }
                    children= {<TextField
                        key="textField"
                        fullWidth
                        name="newChatInput"
                        hintText="Add new chat"
                        onChange={ this.handleChange }
                        value={ this.state.newChatInput }
                        onKeyUp={ this.handleKeyUp }
                    />}
                />
            </List>
        )
    }
}

const mapStateToProps = ({ chatReducer }) => ({ store: {
    chats: chatReducer.chats,
}});

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (ChatList);