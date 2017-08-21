import Root from 'containers/root';

import Login from 'containers/login';

import Tables from 'containers/tables/routes';
import About from 'containers/about/routes';

const appRoutes = [{
    pattern: '/',
    noAuthNeeded: true,
    routes: [
        {
            noAuthNeeded: true,
            pattern: '/login',
            component: Login
        },
        {
            pattern: '/app',
            component: Root,
            routes: [
                About,
                Tables,
            ],
        },
    ],
}];

export const indexPathname = '/app/about';

export default appRoutes;
