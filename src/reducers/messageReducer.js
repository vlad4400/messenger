import update from 'react-addons-update';

import {
    SEND_MESSAGE,
    DELETE_MESSAGE,
} from '../actions/messageActions';

import {
    SUCCESS_CHATS_LOADING,
} from '../actions/chatActions';

const initialStore = {
    messages: {},
};

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SUCCESS_CHATS_LOADING: {
            return update(store, {
                messages: { $set: action.payload.entities.messages },
            });
        }
        case SEND_MESSAGE: {
            return update(store, {
                messages: { $merge: { [action.messageId] : {
                    sender: action.sender, 
                    text: action.text}
                } }
            });
        }
        case DELETE_MESSAGE: {
            const { messages: {[action.messageId]:value, ...messages} } = store;

            return update(store, { $merge: {
                    messages
                }}
            );
        }
        default:
            return store;
    }
}