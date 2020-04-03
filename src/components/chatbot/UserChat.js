import React from 'react';

import coronaIcon from 'res/images/corona-icon.png';

export default class UserChat extends React.Component {
    getParagraph(chat) {
        const paragraph = chat.split('\n').map((p, index) =>{
            return (
                <p key={index} className='chat-word'>{p}</p>
            );
        });

        return paragraph;
    }   

    getChats(flow) {
        const chats = flow.chats.map((chat, index) => {
            if ( typeof chat === 'object' && chat !== null) {
                return null;
            } else {
                const paragraph = this.getParagraph(chat);
                return (
                    <div key={index} className='chat'>
                        <div className='chat-wrap'>
                            <div>
                                {paragraph}
                            </div>
                        </div>
                    </div>
                );
            }
        });

        return chats;
    }
     
    render() {
        const { flow } = this.props;
        const chats = this.getChats(flow);
        return (
            <div className='chat-flow-wrap'>
                <div className='emoz-icon'>
                    <img src={coronaIcon} alt='U'/>
                </div>
                <div className='chats'>
                    {chats}
                    <time className='time-mark' dateTime="2020-03-31T07:25:40.410Z">
                        {flow.time.toISOString()}
                    </time>
                </div>
            </div>
        );
    }
}
