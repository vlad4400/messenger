import update from 'react-addons-update';

import {
    SEND_MESSAGE, 
    DELETE_MESSAGE,
} from '../actions/messageActions';
import {
    SUCCESS_CHATS_LOADING,
    ADD_CHAT, 
    DELETE_CHAT, 
    SAVE_INPUT 
} from '../actions/chatActions';

const initialStore = {
    chats: {},
    isChatsLoaded: false,
};

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SUCCESS_CHATS_LOADING: {
            return update(store, {
                chats: { $set: action.payload.entities.chats },
                isChatsLoaded: { $set: true }
            });
        }
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
        default:
            return store;
    }
}