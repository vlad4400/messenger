import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import chatReducer from './chatReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    chatReducer
});

export default createRootReducer;