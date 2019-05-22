import { combineReducers } from 'redux';
import accountsReducer from './accountsReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
    accounts: accountsReducer,
    user: userReducer,
    chat: chatReducer,
    convos: null
});
  
export default rootReducer;