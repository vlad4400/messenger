import update from 'react-addons-update';

import {
    START_MESSAGES_LOADING,
    SUCCESS_MESSAGES_LOADING,
    ERROR_MESSAGES_LOADING,
    SEND_MESSAGE,
    DELETE_MESSAGE,
} from '../actions/messageActions';

const initialStore = {
    isLoading: false,
    isMessagesLoaded: false,
};

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case START_MESSAGES_LOADING: {
            return update(store, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_MESSAGES_LOADING: {
            const messages = {};

            action.payload.forEach(msg => {
                const { text, sender } = msg;
                messages[msg.id] = { text, sender };
            });

            return update(store, {
                messages: { $set: messages },
                isLoading: { $set: false },
                isMessagesLoaded: { $set: true },
            });
        }
        case ERROR_MESSAGES_LOADING: {
            return update(store, {
                isLoading: { $set: false },
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