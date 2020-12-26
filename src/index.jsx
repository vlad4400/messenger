import React from 'react';
import ReactDOM from 'react-dom';

let messages = ['first message', 'second message'];

const MessageComponent = ({ text }) => <div>{ text }</div>;

const MessageField = (props) => {
    return props.messages.map((message, index) => <MessageComponent key={ index } text={ message }/>);
};

function saveMessage() {
    messages.push(document.getElementsByName('message')[0].value);
    console.log(document.getElementsByName('message')[0].value);
};

function tick() {
    const element = (
        <div> 
            <MessageField messages={ messages } />
            <input name="message"></input>
            <button onClick={ saveMessage }>Send</button> 
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 100);