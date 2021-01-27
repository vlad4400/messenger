export const ADD_CHAT = '@@chat/ADD_CHAT';
export const DELETE_CHAT = '@@chat/DELETE_CHAT';
export const SAVE_INPUT = '@@input/SAVE_INPUT';

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