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

    emitQuery = (event) => {
        this.props.sendQuery(event.target.value);
    }

    getNodes(node, index) {
        return (
            <div key={index} className='node' style={{ margin: '0px 4px', position: 'relative', display: 'flex', maxWidth: '80%', minWidth: '80%', scrollSnapAlign: 'center' }}>
                <div style={{ height: '300px', width: '100%', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', overflow: 'hidden', borderRadius: '4px', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingBottom: '52.36%' }}>
                        <img alt='critical' src={node.img} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '8px', flexGrow: '1' }}>
                        <h6 style={{ marginTop: '0', fontWeight: 'bold', marginBottom: '0.35em', fontSize: '0.875rem', lineHeight: '1.57', letterSpacing: '0.00714em' }}>{node.title}</h6>
                        <span style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '0.35em', fontSize: '0.75rem', fontWeight: '400', lineHeight: '1.66', letterSpacing: '0.03333em' }}>{node.content}</span>
                    </div>
                    <button  type='button' value={node.link} onClick={this.emitQuery} style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0)', padding: '6px 8px', color: '#f44336', border: 'unset', borderTop: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '0', fontSize: '14px', lineHeight: '24.5px' }}>
                        {node.link}
                    </button>
                </div>
            </div>
        );
    }

    getChats(flow) {
        const chats = flow.chats.map((chat, index) => {
            if ( typeof chat === 'object' && chat !== null) {
                const gallery = chat.data.map((node, index) => {
                    const data = this.getNodes(node, index);
                    return data;
                });
                
                return (
                    <div key={index} className='gallery'>
                        <div className='gallery-wrap'>
                            {gallery}
                        </div>
                    </div>
                );
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
