import update from 'react-addons-update';
import { SEND_MESSAGE, SAVE_INPUT } from '../actions/messageActions';
import { ADD_CHAT } from '../actions/chatActions';

const initialStore = {
    chats: {
        1: {userName: 'User Name 1', messageList: [1, 2], input: ''},
        2: {userName: 'User Name 2', messageList: [], input: ''},
        3: {userName: 'User Name 3', messageList: [], input: ''}
    },
    messages: {
        1: { sender: 'bot', text: "Hi!" },
        2: { sender: 'bot', text: "How are you?" },
    }
};

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(store, {
                chats: { $merge: { [action.chatId]: {
                    userName: store.chats[action.chatId].userName,
                    messageList: [...store.chats[action.chatId].messageList, action.messageId],
                    input: ''
                } } },
                messages: { $merge: { [action.messageId] : {
                    sender: action.sender, 
                    text: action.text}
                } }
            });
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
        case ADD_CHAT: {
            const chatId = Object.keys(store.chats).length + 1;
            return update(store, {
                chats: { $merge: {
                    [chatId]: {
                        userName: action.userName, messageList: [], input: ''
                    }
                } }
            });
        }
        default:
            return store;
    }
}