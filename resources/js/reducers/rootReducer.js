import { combineReducers } from 'redux';
import threadsReducer from './ThreadsReducer';
import authReducer from "./AuthReducer";

const rootReducer = combineReducers({
    threadsReducer,
    authReducer
});

export default rootReducer;
