import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import rootReducer from 'rootReducer';
import rootSaga from 'rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configuredStore() {
    let store  = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware, createLogger())
    );

    sagaMiddleware.run(rootSaga);
    return store;
}
