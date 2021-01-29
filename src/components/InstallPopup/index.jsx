import React from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import './styles.css';


class InstallPopup extends React.Component {
state = {
    isShown: false,
};

componentDidMount() {
    // Determines if the device is an iPhone
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone/.test( userAgent );
    };
    // Determine if the application is running separately
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // We decide whether to show or not show the installation notification
    if (isIos() && !isInStandaloneMode()) {
        this.handleShow();
    }
}

handleShow = () => {
    this.setState({ isShown: true });
};

handleHide = () => {
    this.setState({ isShown: false });
};

render() {
    return (
        <div style={ { display: this.state.isShown ? 'block' : 'none' } } className="speech-bubble-container">
            <div className="speech-bubble">
                <Close className="close-install-message-icon" onClick={ this.handleHide } />
                <div style={ { paddingRight: '15px' } }>Install the app on your iPhone: press "Share" and then to the "Home" screen</div>
            </div>
        </div>
    );
}
}

export default InstallPopup;