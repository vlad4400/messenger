import React from 'react';
import './styles.css';

export default class PushToggle extends React.Component {
    render() {
        return (
            <span className="push">
                <img className="push__image" src="/images/notifications_off.png" alt="Push Notification"/>
            </span>
        )
    }
}
