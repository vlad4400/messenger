import update from 'react-addons-update';

import { 
    SEND_MESSAGE, 
    DELETE_MESSAGE, 
    START_MESSAGES_LOADING,
    SUCCESS_MESSAGES_LOADING,
    ERROR_MESSAGES_LOADING
} from '../actions/messageActions';
import { ADD_CHAT, DELETE_CHAT, SAVE_INPUT } from '../actions/chatActions';

const initialStore = {
    isLoading: false,
    chats: {
        1: {userName: 'User Name 1', messageList: [], input: ''},
        2: {userName: 'User Name 2', messageList: [], input: ''},
        3: {userName: 'User Name 3', messageList: [], input: ''}
    },
};

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case ADD_CHAT: {
            const qunatityChats = Object.keys(store.chats).length;
            const chatId = qunatityChats ? ++Object.keys(store.chats)[qunatityChats - 1] : 1;

            return update(store, {
                chats: { $merge: {
                    [chatId]: {
                        userName: action.userName, messageList: [], input: ''
                    }
                } }
            });
        }
        case DELETE_CHAT: {
            const parentKey = 'chats';
            const childKey = action.chatId;
            // Remove the 'chats' element from original
            const { [parentKey]: parentValue, ...noChild } = store;
            // Remove the 'action.chatId' from the 'chats' element
            const { [childKey]: removedValue, ...childWithout } = parentValue;
            // Merge back together
            const withoutThird = { ...noChild, [parentKey]: childWithout };

            return withoutThird;
        }
        case SAVE_INPUT: {
            return update(store, {
                chats: { $merge: { [action.chatId]: {
                    userName: store.chats[action.chatId].userName,
                    messageList: store.chats[action.chatId].messageList,
                    input: action.input
                } } }
            });
        }
        case SEND_MESSAGE: {
            return update(store, {
                chats: { $merge: { [action.chatId]: {
                    userName: store.chats[action.chatId].userName,
                    messageList: [...store.chats[action.chatId].messageList, action.messageId],
                    input: ''
                } } }
            });
        }
        case DELETE_MESSAGE: {
            const messageList = store.chats[action.chatId].messageList.filter(function(value) {
                return value !== action.messageId;
            });

            return update(store, {
                chats: {[action.chatId]: {
                    $merge: {
                        messageList
                    }
                }}
            });
        }
        case START_MESSAGES_LOADING: {
            return update(store, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_MESSAGES_LOADING: {
            const chats = {...store.chats};
            action.payload.forEach(msg => {
                const { id, chatId } = msg;
                chats[chatId].messageList.push(id);
            });
            return update(store, {
                chats: { $set: chats },
                isLoading: { $set: false },
            });
        }
        case ERROR_MESSAGES_LOADING: {
            return update(store, {
                isLoading: { $set: false },
            });
        }
        default:
            return store;
    }
}