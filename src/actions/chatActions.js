import { RSAA, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { chats } from '../utils/schemas';

export const ADD_CHAT = '@@chat/ADD_CHAT';
export const DELETE_CHAT = '@@chat/DELETE_CHAT';
export const SAVE_INPUT = '@@chat/SAVE_INPUT';

export const START_CHATS_LOADING = '@@chat/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@chat/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@chat/ERROR_CHATS_LOADING';

export const loadChats = () => ({
    [RSAA]: {
        endpoint: '/api/chats.json',
        method: 'GET',
        types: [
            START_CHATS_LOADING,
            {
                type: SUCCESS_CHATS_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => normalize(json, [chats])
                ),
            },
            ERROR_CHATS_LOADING,
        ],
    },
});

export const addChat = (userName) => ({
    type: ADD_CHAT,
    userName
});

export const deleteChat = (chatId, activeChat) => ({
    type: DELETE_CHAT,
    chatId,
    activeChat
});

export const saveInput = (chatId, input) => ({
    type: SAVE_INPUT,
    chatId,
    input
});