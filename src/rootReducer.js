import { combineReducers } from 'redux';

import chatbot from 'domains/chatbot/redux/reducers';

export default combineReducers(
    { chatbot }
);
