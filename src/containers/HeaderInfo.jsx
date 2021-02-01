import React from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

export default class HeaderInfo extends React.Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
    };

    render() {
        return (
            <Toolbar 
                className={this.props.className }>
                <ToolbarGroup>
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <ToolbarTitle text={this.props.userName} />
                </ToolbarGroup>
            </Toolbar>
        )
    }
}