import { combineReducers } from 'redux';

import organisations from './organisations';
import rooms from './rooms';
import tables from './tables';

const reducer = combineReducers({
    organisations,
    tables,
    rooms
});
export default reducer;
