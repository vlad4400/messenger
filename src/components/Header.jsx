import React from 'react';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';

export default class Header extends React.Component {
    render() {
        return (
            <AppBar
                title="User Name"
                className={ this.props.className }
                iconElementRight={ <IconButton><MoreVertIcon /></IconButton>}
                iconElementLeft={<></>}
            />
        )
    }
}