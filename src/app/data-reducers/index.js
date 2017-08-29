import { combineReducers } from 'redux';

import login from './login';
import roles from './roles';
import organisations from './organisations';

const auth = combineReducers({
    login
});

const data = combineReducers({
    organisations,
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
