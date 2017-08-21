import { createGetReducer, createGetActionCreator } from 'core/redux';
import { GetTablesList } from 'api/Tables';
import { getTables } from 'selectors/index';

const suffix = 'LOGIN';
// -------- actionCreator
export const doLogin = (loginInfo: Object) => createGetActionCreator({
    suffix,
    getStoreItem: getTables,
    apiCall: GetTablesList,
    apiCallArgs: [ loginInfo ]
});

// -------- reducer
export default createGetReducer(suffix);
