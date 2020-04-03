import React from 'react';

import coronaIcon from 'res/images/corona-icon.png';

export default class UserChat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0
        };

        this.galleryScroll = React.createRef();
        this.galleryObj = React.createRef();
    }

    galleryOnScroll = (event) => {
        console.log(this.galleryScroll.current.scrollLeft)
        const node = this.galleryObj.current.clientWidth - 4;
        const prefix = (node * 8 / 10 + 4) - node / 2;
        const i = (this.galleryScroll.current.scrollLeft - prefix) / (node * 8 / 10 + 8);
        this.setState({
            active: Math.floor(i + 1)
        });
    }

    componentDidUpdate(prevProps) {
        if (this.galleryScroll.current !== null) {
            if (this.state.active === 0) {
                this.galleryScroll.current.scrollLeft = 0;
            } else {
                const node = this.galleryObj.current.clientWidth - 4;
                const startPoint = (node * 8 / 10 + 8) * this.state.active;
                this.galleryScroll.current.scrollLeft = startPoint - node / 10;
            }
        }
    }

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

    goOnLeft = (event) => {
        this.setState({
            active: this.state.active - 1
        });
    }

    goOnRight = (event) => {
        this.setState({
            active: this.state.active + 1
        });
    }

    getNodes(node, index, count) {
        return (
            <div key={index} className={`node ${this.state.active === index ? 'active' : '' } ${index === 0 ? 'first' : ''} ${index === count - 1 ? 'last' : ''}`}>
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
                <button className='left-nav-button' onClick={this.goOnLeft}>
                    <span>
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
                        </svg>
                    </span>
                </button>
                <button className='right-nav-button' onClick={this.goOnRight}>
                    <span>
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                        </svg>
                    </span>
                </button>
            </div>
        );
    }

    getChats(flow) {
        const chats = flow.chats.map((chat, index) => {
            if ( typeof chat === 'object' && chat !== null) {
                if (chat.type === 0) {
                    const length = chat.data.length;
                    const gallery = chat.data.map((node, index) => {
                        const data = this.getNodes(node, index, length);
                        return data;
                    });
                    
                    return (
                        <div key={index} className='gallery' ref={this.galleryObj}>
                            <div className='gallery-wrap' ref={this.galleryScroll} onTouchEnd={this.galleryOnScroll}>
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
