import React from 'react';
import { connect } from 'react-redux';

import './SenderForm.css';
import * as actions from 'domains/chatbot/redux/actionTypes';

class SenderForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: '',
            showMenu: true
        };

        this.strMenu = '🏡 Menu';
        this.strShowNumber = '🧮 Show me the numbers';
    }

    handleKeydown = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleChange = (event) => {
        this.setState({
            chat: event.target.value
        });
    }

    handleSubmit = () => {
        this.props.sendChat(this.state.chat);
        this.setState({
            chat: ''
        });
    }

    sendMenu = () => {
        if (this.state.showMenu === true) {
            this.props.sendQuery('menu');
        } else {
            this.props.sendQuery('Show me the numbers');
        }

        const showMenu = !this.state.showMenu;
        this.setState({
            chat: this.state.chat,
            showMenu: showMenu
        });
    }

    getMenuButton() {
        const strButton = this.state.showMenu === true ? this.strMenu : this.strShowNumber;
        if (this.props.isLoading > 0 || this.props.isSending) {
            return null;
        } else {
            return (
                <div className='button-wrap'>
                    <button className='btn-menu' type='button' onClick={this.sendMenu}>
                        <span role='img' aria-label='donut'>
                            {strButton}
                        </span>
                    </button>
                </div>
            );
        }
    }

    render() {
        const menu = this.getMenuButton();
        return (
            <div className='sender-form'>
                {menu}
                <div className='writer-wrap' >
                    <input className='' placeholder='Write a message...' value={this.state.chat} onChange={this.handleChange} onKeyDown={this.handleKeydown} />
                    <button type='button' className='btn-submit' onClick={this.handleSubmit}>
                        <span>
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.chatbot.loading,
        isSending: state.chatbot.sending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendChat: (chat) => dispatch({ type: actions.SEND_ASK, value: chat }),
        sendQuery: (chat) => dispatch({ type: actions.SEND_QUERY, value: chat })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SenderForm);
