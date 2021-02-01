import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import { loadProfile } from '../actions/profileActions';
import Header from './Header';

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

class Profile extends React.Component {
    static propTypes = {
        isProfileLoaded: PropTypes.bool.isRequired,
    }

    render() {
        if (!this.props.isProfileLoaded) {
            return <CircularProgress />
        }
        return (
            <div className="layout profile">
                <Header 
                    className="grid-header"
                />
                <Card className="grid-card">
                    <CardHeader
                    title={ this.props.profile.userName }
                    subtitle={ this.props.profile.userStatus }
                    avatar={ this.props.profile.urlAvatar }
                    />
                    <CardMedia
                    overlay={
                        <CardTitle 
                            title={ this.props.profile.card[1].title } 
                            subtitle={ this.props.profile.card[1].subtitle } 
                        />}
                    >
                    <img height="200px" src={ this.props.profile.card[1].url } alt="" />
                    </CardMedia>
                    <CardTitle title={ this.props.profile.aboutTitle } />
                    <CardText>
                        {this.props.profile.aboutText}
                    </CardText>
                </Card>
            </div>
            
        )
    }

    componentDidMount() {
        if (!this.props.isProfileLoaded) {
            this.props.loadProfile();
        }
    }
}

const mapStateToProps = ({ profileReducer }) => ({
    profile: profileReducer.profile,
    isProfileLoaded: profileReducer.isProfileLoaded,
});
const mapDispatchToProps = dispatch => bindActionCreators({ loadProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Profile)