import * as actions from '../actionTypes';
import produce from 'immer';

const initialState = {
    chatHistory: [],
    loading: 0
}

function createChatflow(from, chat) {
    return {
        userType: from,
        chats: [chat]
    }
}

function appendChat(flow, chat) {
    flow.chats.push(chat)
    return flow;
}

export default (state = initialState, action) => produce(state, draft => {
    switch(action.type) {
        case actions.LOADCHATHISTORY_FLOW_OPEN:
            draft.loading = draft.loading + 1;
            return draft;
        case actions.LOADCHATHISTORY_FLOW_END:
            draft.loading = draft.loading - 1;
            return draft;
        case actions.LOADCHATHISTORY_CHAT_ADDED:
            if (draft.chatHistory.length === 0) {
                draft.chatHistory.push(createChatflow(action.from, action.chat));
            } else {
                const flow = appendChat(draft.chatHistory[draft.chatHistory.length - 1], action.chat);
                draft.chatHistory[draft.chatHistory.length - 1] = flow;
            }

            return draft;
        default:
            return draft;
    }
});
