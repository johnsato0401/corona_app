import { all, call, takeLatest, takeEvery, put } from 'redux-saga/effects';


import * as actions from '../actionTypes'
import { callGenerator, callThreadGenerator } from 'utils/chatbot';

let indexOfAnswer = 1;

function* chatbotWatcher() {
    yield takeLatest(actions.LOADCHATHISTORY_LOAD, loadHistory);
    yield takeEvery(actions.SEND_ASK, sendAsk);
    yield takeEvery(actions.SEND_QUERY, sendQuery);
}

function* sendQuery(action) {
    let isOpenThread = false;
    let isSendThread = false;
    try {
        const apiCall = (id) => {
            return callGenerator(0, id);
        };

        const apiCallThread = (id, index) => {
            return callThreadGenerator(0, id, index);
        }
        yield put({ type: actions.LOADCHATHISTORY_SENDING});
        isSendThread = true
        yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: action.value, from: 0 });
        yield put({ type: actions.LOADCHATHISTORY_SENDING_END});

        yield put({ type: actions.LOADCHATHISTORY_FLOW_OPEN });
        isOpenThread = true;
        let data = yield call(apiCall, action.value);
        yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
        for (let i = 1; i < 100; i ++) {
            if (data.isLast === undefined || data.isLast === true) {
                break;
            }

            data = yield call(apiCallThread, action.value, i);
            yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
        }
        yield put({ type: actions.LOADCHATHISTORY_FLOW_END });
    } catch(error) {
        if (isOpenThread) {
            yield put({ type: actions.LOADCHATHISTORY_FLOW_END });
        }
        if (isSendThread) {
            yield put({ type: actions.LOADCHATHISTORY_SENDING_END });
        }
    }
}

function* sendAsk(action) {
    let isOpenThread = false;
    let isSendThread = false;
    try {
        const apiCall = (id) => {
            return callGenerator(0, id);
        };

        const apiCallThread = (id, index) => {
            return callThreadGenerator(0, id, index);
        }
        yield put({ type: actions.LOADCHATHISTORY_SENDING});
        isSendThread = true
        yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: action.value, from: 0 });
        yield put({ type: actions.LOADCHATHISTORY_SENDING_END});

        yield put({ type: actions.LOADCHATHISTORY_FLOW_OPEN });
        isOpenThread = true;
        let data = yield call(apiCall, action.value);
        if (data !== null) {
            yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
            for (let i = 1; i < 100; i ++) {
                if (data.isLast === undefined || data.isLast === true) {
                    break;
                }
    
                data = yield call(apiCallThread, action.value, i);
                yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
            }
            yield put({ type: actions.LOADCHATHISTORY_FLOW_END });
        } else {
            if (indexOfAnswer === 0) {
                indexOfAnswer = 1;
            } else {
                indexOfAnswer = 0;
            }
    
            const apiCallR = (index) => {
                if (index === 0) {
                    return callGenerator(1, 'answer1');
                } else {
                    return callGenerator(1, 'answer2');
                }
            }
    
            const apiCallThreadR = (key, index) => {
                if (key === 0) {
                    return callThreadGenerator(1, 'answer1', index);
                } else {
                    return callThreadGenerator(1, 'answer2', index);
                }
            }
            
            // yield put({ type: actions.LOADCHATHISTORY_FLOW_OPEN });
            isOpenThread = true;
            let dataR = yield call(apiCallR, indexOfAnswer);
            yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: dataR.chat, from: 1});
            for (let i = 1; i < 100; i ++) {
                if (dataR.isLast === undefined || dataR.isLast === true) {
                    break;
                }
    
                dataR = yield call(apiCallThreadR, indexOfAnswer, i);
                yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: dataR.chat, from: 1});
            }
            yield put({ type: actions.LOADCHATHISTORY_FLOW_END });
        }
    } catch(error) {
        if (isOpenThread) {
            yield put({ type: actions.LOADCHATHISTORY_FLOW_END });
        }
        if (isSendThread) {
            yield put({ type: actions.LOADCHATHISTORY_SENDING_END });
        }
    }
}

function* loadHistory(action) {
    let isOpenThread = false;
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
        isOpenThread = true;
        let data = yield call(apiCall);
        yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
        for (let i = 1; i < 100; i ++) {
            if (data.isLast === undefined || data.isLast === true) {
                break;
            }

            data = yield call(apiCallThread, i);
            yield put({ type: actions.LOADCHATHISTORY_CHAT_ADDED, chat: data.chat, from: 1});
        }
        // yield put({ type: actions.LOADCHATHISTORY_FLOW_END });

        const welcomeApiCall = () => {
            return callGenerator(0, 'welcome');
        }

        const welcomeApiCallThread = (index) => {
            return callThreadGenerator(0, 'welcome', index);
        }

        // yield put({ type: actions.LOADCHATHISTORY_FLOW_OPEN });
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
        if (isOpenThread) {
            yield put({ type: actions.LOADCHATHISTORY_FLOW_END });
        }
    }
}

export default function* chatbotRootSaga() {
    while(true) {
        yield all([
            call(chatbotWatcher)
        ]);
    }
}