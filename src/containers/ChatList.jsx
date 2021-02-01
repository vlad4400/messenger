import React from 'react';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { TextField } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { addChat, deleteChat } from '../actions/chatActions';

class ChatList extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        className: PropTypes.string.isRequired,
        addChat: PropTypes.func.isRequired,
        deleteChat: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
        store: PropTypes.object.isRequired,
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

            const chatId = ++Object.keys(this.props.store.chats)[Object.keys(this.props.store.chats).length-1];
            
            this.props.push(`/chat/${chatId}`);
        }
    }

    handleNavigate = (chatId) => {
        this.props.push(`/chat/${chatId}`);
    }

    iconButtonElement = (
        <IconButton
            touch={true}
            tooltip="more"
            tooltipPosition="bottom-left"
        >
            <MoreVertIcon color={grey400} />
        </IconButton>
    );

    handleDeleteChat = (chatId) => {
        this.props.deleteChat(chatId);
        if (this.props.chatId == chatId) {
            this.props.push('/chat/0');
        }
    }

    rightIconMenu = chatId => {
        return (
            <IconMenu iconButtonElement={this.iconButtonElement}>
                <MenuItem onClick={ () => { this.handleDeleteChat(chatId) } }>Delete</MenuItem>
            </IconMenu>
        );
    };

    render() {
        return (
            <List
                className={ this.props.className }
                style={ { overflowY: 'scroll' } }
            >
                {
                    Object.keys(this.props.store.chats).map((chatId) =>
                        <ListItem key={ chatId } className={ `chat-list-${chatId}` }
                            onClick={ () => this.handleNavigate(chatId) }
                            primaryText={ this.props.store.chats[chatId].userName }
                            rightIconButton={ this.rightIconMenu(chatId) }
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

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, deleteChat, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (ChatList);