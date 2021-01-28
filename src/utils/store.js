import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';

import createRootReducer from './../reducers';
import middlewares from '../middlewares';

export const history = createBrowserHistory();

const persistConfig = {
    key: 'messanger-store',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['chatReducer'],
}

function initStore() {
    const innitialStore = {};

    return createStore(
        createRootReducer(history),

    // const store = createStore(
    //     persistReducer(persistConfig, createRootReducer(history)),
        innitialStore,
        compose (
            applyMiddleware(routerMiddleware(history), ...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose
        )
    );

    const persistor = persistStore(store);

    return { store, persistor };
}

export default initStore;
