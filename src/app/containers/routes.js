import Tables from 'containers/tables';

const appRoutes = [{
    pattern: '/',
    noAuthNeeded: true,
    routes: [
        {
            pattern: '/app',
            component: Tables,
        },
    ],
}];

export const indexPathname = '/app/';

export default appRoutes;
