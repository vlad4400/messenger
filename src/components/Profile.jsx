import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default class Profile extends React.Component {
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
                    title="My Name"
                    subtitle="Status"
                    avatar="#"
                    />
                    <CardMedia
                    overlay={<CardTitle title="Name photo" subtitle="more info about photo" />}
                    >
                    <img height="200px" src="#" alt="" />
                    </CardMedia>
                    <CardTitle title="About me" />
                    <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>
            </div>
            
        )
    }
}