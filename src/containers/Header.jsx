import React from 'react';
import { Link } from 'react-router-dom';

import PushToggle from '../components/PushToggle';
import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import NavigationExpandMore from 'material-ui/svg-icons/navigation/menu';

export default class Header extends React.Component {
    render() {
        return (
            <AppBar
                className={ this.props.className }
                title={ 
                    <>
                        <PushToggle />
                        <Link to={`/profile/`}>
                            <span className="header-profile">Profile</span>
                        </Link>
                        <span> | </span>
                        <Link to={`/chat/`}>
                            <span className="header-chats">Chats</span>
                        </Link>
                    </> 
                }
                iconElementLeft={<></>}
                // iconElementLeft={<IconButton><NavigationExpandMore /></IconButton>}
            />
        )
    }
}