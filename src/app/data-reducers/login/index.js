import { createGetReducer, createAddActionCreator } from 'core/redux';
import { Login } from 'api/Login';
import { getAppAuth } from 'selectors/index';

const suffix = 'LOGIN';

// -------- actionCreator
export const doLogin = (loginInfo: Object) => createAddActionCreator({
    suffix,
    getStoreItem: getAppAuth,
    apiCall: Login,
    apiCallArgs: [ loginInfo ]
})();


// -------- reducer
export default createGetReducer(suffix);
