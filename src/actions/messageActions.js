export const SEND_MESSAGE = '@@message/SEND_MESSAGE';
export const SAVE_INPUT = '@@input/SEND_INPUT';

export const sendMessage = (messageId, sender, text, chatId, messages) => ({
    type: SEND_MESSAGE,
    messageId,
    sender,
    text,
    chatId,
    messages
});

export const saveInput = (chatId, input) => ({
    type: SAVE_INPUT,
    chatId,
    input
});