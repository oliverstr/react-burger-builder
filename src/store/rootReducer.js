import { combineReducers } from 'redux';
import burgerReducer from './reducers/burger';
import orderReducer from './reducers/order';

const rootReducer = combineReducers({
    br: burgerReducer,
    or: orderReducer
});

export default rootReducer;