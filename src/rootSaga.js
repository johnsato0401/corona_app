import { all, call } from 'redux-saga/effects';

import chatbot from 'domains/chatbot/redux/sagas';

export default function* rootSaga() {
    yield all([
        call(chatbot)
    ]);
}