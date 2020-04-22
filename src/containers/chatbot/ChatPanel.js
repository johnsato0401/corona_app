import React from 'react';
import { connect } from 'react-redux';

import './ChatPanel.css';

import * as actions from 'domains/chatbot/redux/actionTypes';
import MyChat from 'components/chatbot/MyChat';
import UserChat from 'components/chatbot/UserChat';

class ChatPanel extends React.Component {
    constructor(props) {
        super(props);

        this.chatScroll = React.createRef();
    }

    componentDidMount() {
        const loadHistory = this.props.loadHistory;
        loadHistory();
    }

    componentDidUpdate(prevProps) {
        this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight;
    }

    getLoadingBar(isLoading) {
        if (isLoading > 0) {
            return ( <
                div className = 'wave-wrap' >
                <
                div id = "wave" >
                <
                span className = "dot" > < /span> <span className = "dot" > < /span > < span className = "dot" > < /span > < /div > < /div >
            );
        } else {
            return null;
        }
    }

    render() {
        const isLoading = this.props.isLoading;

        const flows = this.props.flows.map((flow, index) => {
            if (flow.userType === 1) {
                return ( <
                    UserChat flow = { flow }
                    key = { index }
                    sendQuery = { this.props.sendQuery }
                    />
                );
            } else if (flow.userType === 0) {
                return ( <
                    MyChat flow = { flow }
                    key = { index }
                    />
                );
            }
            return null;
        });

        const loading = this.getLoadingBar(isLoading);

        return ( <
            div className = 'base-chat-pannel'
            ref = { this.chatScroll } >
            <
            div className = 'chat-pannel-wrap' >
            <
            div className = 'chat-flow' > { flows } { loading } <
            /div> <
            div className = 'mark' >
            <
            span className = 'chat-title-panel' > Powered by Unibot < /span> < /
            div > < /
            div > <
            /div>
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
        loadHistory: () => dispatch({ type: actions.LOADCHATHISTORY_LOAD }),
        sendQuery: (chat) => dispatch({ type: actions.SEND_QUERY, value: chat })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPanel);