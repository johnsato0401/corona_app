import React from 'react';

import coronaIcon from 'res/images/corona-icon.png';

export default class UserChat extends React.Component {
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
      
    getParagraph(chat) {
        const paragraph = chat.split('\n').map((p, index) =>{
            if (this.validURL(p)) {
                return (
                    <a key={index} href={p} className='chat-word'>{p}</a>
                );
            } else {
                return (
                    <p key={index} className='chat-word'>{p}</p>
                );
            }
        });

        return paragraph;
    } 

    emitQuery = (event) => {
        this.props.sendQuery(event.target.value);
    }

    getNodes(node, index) {
        return (
            <div key={index} className='node'>
                <div className='node-wrap'>
                    <div className='banner'>
                        <img alt='critical' src={node.img} />
                    </div>
                    <div className='content'>
                        <h6>{node.title}</h6>
                        <span>{node.content}</span>
                    </div>
                    <button className='nav' type='button' value={node.link} onClick={this.emitQuery}>
                        {node.link}
                    </button>
                </div>
            </div>
        );
    }

    getChats(flow) {
        const chats = flow.chats.map((chat, index) => {
            if ( typeof chat === 'object' && chat !== null) {
                if (chat.type === 0) {
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
                } else if (chat.type === 1) {
                    return (
                        <div key={index} className='gallery'>
                            <div className='image-wrap'>
                                <img alt='Img' src={chat.img}/>
                            </div>
                        </div>
                    );
                } else {
                    return null;
                }
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
