import React from 'react';
import { Link } from 'react-router-dom';
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
            </List>
        )
    }
}