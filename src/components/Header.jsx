import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';

export default class Header extends React.Component {
    static propTypes = {
        userName: PropTypes.string
    };

    static defaultProps = {
        chatId: 1,
    };

    render() {
        return (
            <AppBar
                title={ this.props.userName }
                className={ this.props.className }
                iconElementRight={ <IconButton><MoreVertIcon /></IconButton>}
                iconElementLeft={<></>}
            />
        )
    }
}