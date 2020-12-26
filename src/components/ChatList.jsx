import React from 'react';
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Avatar from 'material-ui/Avatar';

export default class ChatList extends React.Component {
    render() {
        return (
            <List
                className={ this.props.className }
                style={ { overflowY: 'scroll' } }
            >
                <ListItem
                    primaryText="User Name 1"
                    rightIcon={<CommunicationChatBubble />}
                    leftAvatar={<Avatar src="" />}
                />
                <ListItem
                    primaryText="User Name 2"
                    rightIcon={<CommunicationChatBubble />}
                    leftAvatar={<Avatar src="" />}
                />
                <ListItem
                    primaryText="User Name 3"
                    rightIcon={<CommunicationChatBubble />}
                    leftAvatar={<Avatar src="" />}
                />
                <ListItem
                    primaryText="User Name 4"
                    rightIcon={<CommunicationChatBubble />}
                    leftAvatar={<Avatar src="" />}
                />
                <ListItem
                    primaryText="User Name 5"
                    rightIcon={<CommunicationChatBubble />}
                    leftAvatar={<Avatar src="" />}
                />
            </List>
        )
    }
}