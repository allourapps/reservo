import { combineReducers } from 'redux';

import tables from './tables';
import login from './login';

const auth = combineReducers({
    login
});

const data = combineReducers({
    tables
});

const reducer = combineReducers({
    auth,
    data
});

export default reducer;
