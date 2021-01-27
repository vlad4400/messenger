import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import profileReducer from './profileReducer';
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    profileReducer,
    chatReducer,
    messageReducer,
});

export default createRootReducer;