export const SEND_MESSAGE = '@@message/SEND_MESSAGE';
export const DELETE_MESSAGE = '@@message/DELETE_MESSAGE';
export const SAVE_INPUT = '@@input/SEND_INPUT';

export const sendMessage = (messageId, sender, text, chatId) => ({
    type: SEND_MESSAGE,
    messageId,
    sender,
    text,
    chatId
});

export const deleteMessage = (messageId, chatId) => ({
    type: DELETE_MESSAGE,
    messageId,
    chatId,
});

export const saveInput = (chatId, input) => ({
    type: SAVE_INPUT,
    chatId,
    input
});