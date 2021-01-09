export const ADD_CHAT = '@@chat/ADD_CHAT';

export const addChat = (userName) => ({
    type: ADD_CHAT,
    userName
});