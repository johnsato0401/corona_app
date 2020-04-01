import React from 'react';
import { connect } from 'react-redux';

import './ChatPanel.css';
import coronaIcon from 'res/images/corona-icon.png';

import * as actions from 'domains/chatbot/redux/actionTypes';

class ChatPanel extends React.Component {
    componentDidMount() {
        const loadHistory = this.props.loadHistory;
        loadHistory();
    }

    render() {
        console.log(this.props);

        const flows = this.props.flows.map((flow, index) => {
            const chats = flow.chats.map((chat, index) => {
                const paragraph = chat.split('\n').map((p, index) =>{
                    return (
                        <p key={index} className='chat-word'>{p}</p>
                    );
                });
                return (
                    <div key={index} className='chat'>
                        <div className='chat-wrap'>
                            <div>
                                {paragraph}
                            </div>
                        </div>
                    </div>
                );
            });
            return (
                <div key={index} className='chat-flow-wrap'>
                    <div className='emoz-icon'>
                        <img src={coronaIcon} alt='U'/>
                    </div>
                    <div className='chats'>
                        {chats}
                        <time className='time-mark' dateTime="2020-03-31T07:25:40.410Z">
                            today at 3:25 PM
                        </time>
                    </div>
                </div>
            );
        });

        return (
            <div className='base-chat-pannel'>
                <div className='chat-pannel-wrap'>
                    <div className='chat-flow'>
                        {flows}
                    </div>
                    <div className='mark'>
                        Powered by <svg viewBox="67 88.2 311.3 56.9"><path fill="#d0d0d0" d="M122.5 144.4h-4.8c-.6-1.4-.6-2.7-.7-4h-.2a7 7 0 0 1-6.8 4.7c-7.5 0-8.4-5.5-8.4-9.4V122h5v13c0 4.3 2.1 5.4 4.7 5.4 2.8 0 5.4-1.4 5.4-5.3v-13h5v15.8c0 2.2.1 4.3.8 6.5zm-26.3 0h-5.5v-12.9H72.5v12.9H67v-29.9h5.5v12.3h18.2v-12.3h5.5v29.9zm65.5-14.8v14.8h-5V131c0-4.1-1.2-5.1-4.6-5.1-2.6 0-4.3 1.7-4.8 3.8v14.6h-5V131c0-2.4-1.2-5.1-4.6-5.1-3 0-4.9 2.5-5.1 4.6v13.8h-5.1V122h4.8l.3 3.8a7.9 7.9 0 0 1 7-4.4c3.6 0 6.1 1.5 7.2 4.2 1.1-2 3.7-4.2 7.2-4.2 4.7 0 7.7 2.7 7.7 8.2zm19 7.7v-1.5c-.7-1-3.5-1.6-5.2-1.6-2.7 0-4.6 1.1-4.6 3.3 0 2.2 1.8 3.5 4.1 3.5 3.8 0 5.6-2.6 5.6-3.7zm5.7 7h-5.2a9.7 9.7 0 0 1-.6-3.7c-.7 1.9-2.4 4.4-7.2 4.4a7.4 7.4 0 0 1-7.6-7.3c0-4.8 4.6-6.8 9.2-6.8 2.9 0 4.8.6 5.6 1v-.2c0-3.6-.8-6.5-4.4-6.5-3.1 0-4.2 1.9-4.4 3.6h-5c.5-5.6 5-7.5 9.5-7.5 5.7 0 9.3 2.9 9.3 8.9v9.3c0 2 0 3.6.8 4.9zm9.9-22.3l.1 3.6a7.3 7.3 0 0 1 7-4.3c7.2 0 8.5 5.5 8.5 9.4v13.7h-5v-13c0-4.3-2.5-5.4-5-5.4-3 0-5.5 1.5-5.5 5.4v13h-5V122h4.9zm21.5 0h5v22.4h-5V122zm2.6-9.7c1.9 0 3.3 1.6 3.3 3.5s-1.4 3.4-3.3 3.4a3.4 3.4 0 0 1 0-6.8zm16.4 28.8c2.5 0 4.5-1 4.5-2.9 0-1.8-1.8-2.2-5.4-2.9-3.7-.6-8.2-2.4-8.2-6.9 0-4 3.8-7 8.9-7 5 0 9 2.5 9.2 7h-5c-.2-1.8-1.3-3.3-4.2-3.3-3 0-4.2 1.4-4.2 3 0 2.2 2.3 2.5 5 3 3.6.7 9 2.1 9 6.8 0 4.6-4.2 7.1-9.6 7.1-6.4 0-9.2-3.1-9.5-7.2h5c.2 2 2 3.3 4.5 3.3zm29.6-10.3c-.4-3.6-2.5-5.6-5.9-5.6-3.4 0-5.8 2-6.2 5.6h12zm5 3.5h-17.2c.3 3.2 1.6 6.8 6.3 6.8 2.8 0 4.7-1.4 5.4-3h5.1c-1.3 5-5.5 7-10.5 7-6.8 0-11-5-11-12.2 0-6.6 4.2-11.6 11-11.6 7.2 0 10.8 4.5 10.8 11.3v1.7zm5.8 4.2c1.9 0 3.3 1.4 3.3 3.2 0 1.9-1.4 3.3-3.3 3.3a3.2 3.2 0 0 1-3.2-3.3c0-1.8 1.4-3.2 3.2-3.2zm26.6-4.8l-4.3-11.8-1-3a49 49 0 0 1-1 3l-4.2 11.8h10.4zm1.5 4.2h-13.5l-2.2 6.5H284l11.2-30.2h6.8l11.3 30.2h-5.7l-2.3-6.5zm21.3-19.2v21.6h4v4h-13.3v-4h3.9v-21.6h-4v-4.2h13.3v4.2h-3.9z"></path><path fill="#ac363f" d="M348.7 114.7h19.7v-12h-19.7v12z"></path><path fill="#ff435f" d="M377.5 107.6c.9-.9.9-1.7.9-3.7V93.6c0-3.3-2-5.4-5.4-5.4h-28.2c-3.3 0-5.4 2.1-5.4 5.4v15.8c0 3.3 2 5.3 5.4 5.3h6.5c.3 0 .5 0 .6-.2l8.2-9.5v22.4l17.4-19.8z"></path></svg>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        flows: state.chatbot.chatHistory,
        isLoading: state.chatbot.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadHistory: () => dispatch({ type: actions.LOADCHATHISTORY_LOAD })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPanel);
