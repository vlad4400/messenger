import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Router from './containers/Router'
import initStore, { history } from './utils/store';
import './styles/styles.css';

const { store, persistor } = initStore();

ReactDOM.render(
    <Provider store={ initStore() }>
        {/* <PersistGate loading={ null } persistor={ persistor }> */}
            <ConnectedRouter history={ history }>
                <MuiThemeProvider>
                    <Router />
                </MuiThemeProvider>
            </ConnectedRouter>
        {/* </PersistGate> */}
    </Provider>,
    document.getElementById('root')
);