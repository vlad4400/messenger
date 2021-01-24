import update from 'react-addons-update';
import { SEND_MESSAGE, SAVE_INPUT } from '../actions/messageActions';
import { ADD_CHAT, DELETE_CHAT } from '../actions/chatActions';

const initialStore = {
    chats: {
        1: {userName: 'User Name 1', messageList: [1, 2], input: ''},
        2: {userName: 'User Name 2', messageList: [], input: ''},
        3: {userName: 'User Name 3', messageList: [], input: ''}
    },
    messages: {
        1: { sender: 'bot', text: "Hi!" },
        2: { sender: 'bot', text: "How are you?" },
    },
    profile: {
        userName: 'My Name',
        userStatus: 'Status',
        urlAvatar: '#',
        card: {
            1: {
                title: 'Name photo',
                subtitle: 'more info about photo',
                src: '#'
            }
        },
        aboutTitle: 'About me',
        aboutText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
            '\nDonec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.' +
            '\nDonec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.' +
            '\nAliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.'
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
        default:
            return store;
    }
}