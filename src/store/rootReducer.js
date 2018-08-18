import { combineReducers } from 'redux';
import burgerReducer from './reducers/burgerReducer';

const rootReducer = combineReducers({
    br: burgerReducer
});

export default rootReducer;