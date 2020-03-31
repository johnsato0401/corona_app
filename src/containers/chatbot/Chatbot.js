import React from 'react';

import './Chatbot.css';
import SenderForm from './SenderForm';
import ChatPanel from './ChatPanel';

export default class Chatbot extends React.Component {
    render() {
        return (
            <div className='main-body'>
                <ChatPanel />
                <SenderForm />
            </div>
        );
    }
}
