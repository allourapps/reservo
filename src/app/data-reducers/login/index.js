import { createGetReducer, createGetActionCreator } from 'core/redux';
import { Login } from 'api/Login';
import { getAppAuth } from 'selectors/index';

const suffix = 'LOGIN';

// -------- actionCreator
export const doLogin = (loginInfo: Object) => createGetActionCreator({
    // actionTypeOptions: [{ suffix, IDs: [ 'login' ]}],
    suffix,
    getStoreItem: getAppAuth,
    apiCall: Login,
    apiCallArgs: [ loginInfo ],
    payloadPreprocesser: (s) => {
        return {
            ...s,
            isLoggedIn: !!s.Name,
            isLoading: !!s.Name
        };
    }
})();


// -------- reducer
export default createGetReducer(suffix);
