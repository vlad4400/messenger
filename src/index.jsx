import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx'
import './styles/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);