import { combineReducers } from 'redux';

import rooms from './rooms/tables';
import login from './login';

const auth = combineReducers({
    login
});

const data = combineReducers({
    rooms
});

const reducer = combineReducers({
    auth,
    data
});

export default reducer;
