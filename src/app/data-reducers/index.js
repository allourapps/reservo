import { combineReducers } from 'redux';

import rooms from './rooms/tables';
import login from './login';
import roles from './roles';
import organisations from './organisations';

const auth = combineReducers({
    login
});

const data = combineReducers({
    organisations,
    rooms,
    roles
});

const app = combineReducers({
    auth,
    data
});

const reducer = combineReducers({
    app
});

export default reducer;
