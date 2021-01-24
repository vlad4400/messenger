export const ADD_CHAT = '@@chat/ADD_CHAT';
export const DELETE_CHAT = '@@chat/DELETE_CHAT';

export const addChat = (userName) => ({
    type: ADD_CHAT,
    userName
});

export const deleteChat = (chatId, activeChat) => ({
    type: DELETE_CHAT,
    chatId,
    activeChat
});