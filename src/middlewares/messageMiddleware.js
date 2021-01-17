import { SEND_MESSAGE, sendMessage } from '../actions/messageActions';

export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (action.sender === 'me') {
                setTimeout(() => {
                    let lastMessageId = store.getState().chatReducer.chats[action.chatId].messageList.slice(-1)[0]; //to get last array's element
                    let sender = store.getState().chatReducer.messages[lastMessageId].sender;
                    if (action.messageId == lastMessageId && sender !== 'bot') {
                        let messageId = ++lastMessageId;
                        let sender = 'bot';
                        let message = "Don't bother me, I'm a robot!";
                        let chatId = action.chatId;
                        store.dispatch(sendMessage(messageId, sender, message, chatId));
                        document.querySelector(`.chat-list-${action.chatId}`).style.backgroundColor = "#aaa";
                        setTimeout(() => {
                            document.getElementsByClassName(`chat-list-${action.chatId}`)[0].style.backgroundColor = null;
                        }, 600);
                    }
                }, 1500);
            }
        }
    return next(action)
}