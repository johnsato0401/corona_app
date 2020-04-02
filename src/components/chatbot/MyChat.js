import React from 'react';

export default class MyChat extends React.Component{
    render() {
        const { flow } = this.props;
        const chats = flow.chats.map((chat, index) => {
            const paragraph = chat.split('\n').map((p, index) =>{
                return (
                    <p key={index} className='chat-word'>{p}</p>
                );
            });
            return (
                <div key={index} className='chat me'>
                    <div></div>
                    <div className='chat-wrap me'>
                        <div>
                            {paragraph}
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className='chat-flow-wrap' style={{textAlign: 'right'}}>
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