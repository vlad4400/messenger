import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import Header from './Header.jsx';

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class Profile extends React.Component {
    static propTypes = {
        userId: PropTypes.number
    }

    render() {
        return (
            <div className="layout profile">
                <Header 
                    className="grid-header"
                />
                <Card className="grid-card">
                    <CardHeader
                    title={ this.props.store.profile.userName }
                    subtitle={ this.props.store.profile.userStatus }
                    avatar={ this.props.store.profile.urlAvatar }
                    />
                    <CardMedia
                    overlay={
                        <CardTitle 
                            title={ this.props.store.profile.card[1].title } 
                            subtitle={ this.props.store.profile.card[1].subtitle } 
                        />}
                    >
                    <img height="200px" src={ this.props.store.profile.card[1].url } alt="" />
                    </CardMedia>
                    <CardTitle title={ this.props.store.profile.aboutTitle } />
                    <CardText>
                        {this.props.store.profile.aboutText}
                    </CardText>
                </Card>
            </div>
            
        )
    }
}

const mapStateToProps = ({ chatReducer }) => ({ store: {
    profile: chatReducer.profile
}});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Profile)