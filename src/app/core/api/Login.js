import { withoutToken } from 'packages/api';

export const Login = (loginInfo: Object, options?: any): Promise<IServiceResult1<IUserData$1>> => {
    const uri = '/login';
    return withoutToken.post(uri, loginInfo, options).then(response => response.json());
};
