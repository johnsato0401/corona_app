import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects';


import * as actions from '../actionTypes'
import { callGenerator, callThreadGenerator } from 'utils/chatbot';

function* chatbotWatcher() {
    yield takeLatest(actions.LOADCHATHISTORY_LOAD, loadHistory);
    yield takeEvery(actions.SEND_ASK, sendAsk);
}

function* sendAsk(actions) {

}

function* loadHistory(action) {
    try {
        // TODO: load history
        // if history is empty, show Welcom new user.
        const apiCall = () => {
            return callGenerator(0, 'first');
        }

        const apiCallThread = (index) => {
            return callThreadGenerator(0, 'first', index);
        }

        yield put({ type: actions.LOADCHATHISTORY_FLOW_OPEN });
        let data = yield call(apiCall);
        yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
        for (let i = 1; i < 100; i ++) {
            if (data.isLast === undefined || data.isLast === true) {
                break;
            }

            data = yield call(apiCallThread, i);
            yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
        }
        yield put({ type: actions.LOADCHATHISTORY_FLOW_END });

        const welcomeApiCall = () => {
            return callGenerator(0, 'welcome');
        }

        const welcomeApiCallThread = (index) => {
            return callThreadGenerator(0, 'welcome', index);
        }

        yield put({ type: actions.LOADCHATHISTORY_FLOW_OPEN });
        data = yield call(welcomeApiCall);
        yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
        for (let i = 1; i < 100; i ++) {
            if (data.isLast === undefined || data.isLast === true) {
                break;
            }

            data = yield call(welcomeApiCallThread, i);
            yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
        }
        yield put({ type: actions.LOADCHATHISTORY_FLOW_END });
    } catch(error) {
        
    }
}

export default function* chatbotRootSaga() {
    while(true) {
        yield all([
            call(chatbotWatcher)
        ]);
    }
}