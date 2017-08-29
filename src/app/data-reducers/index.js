import { combineReducers } from 'redux';

import rooms from './rooms/tables';
import login from './login';

const auth = combineReducers({
    login
});

const data = combineReducers({
    rooms
});

const app = combineReducers({
    auth,
    data
});

const reducer = combineReducers({
    app
});

export default reducer;
