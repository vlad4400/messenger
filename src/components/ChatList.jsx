import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Avatar from 'material-ui/Avatar';
import { TextField } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

export default class ChatList extends React.Component {
    static propTypes = {
        addChat: PropTypes.func.isRequired
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

    render() {
        return (
            <List
                className={ this.props.className }
                style={ { overflowY: 'scroll' } }
            >
                {
                    Object.keys(this.props.chats).map((chatIndex) =>
                        <Link key={ chatIndex } to={`/chat/${chatIndex}/`}>
                            <ListItem
                                primaryText={ this.props.chats[chatIndex].userName }
                                rightIcon={<CommunicationChatBubble />}
                                leftAvatar={<Avatar src="" />}
                            />
                        </Link>
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