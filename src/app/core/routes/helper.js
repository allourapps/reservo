import React from 'react';
import { Match, Redirect } from 'react-router';

import { pure } from 'core/react/helpers';

export const generateRouteMatches = (baseRoutes, indexPathname, isLoading, isLoggedIn) => {
    const MatchWithSubRoutes = pure((route) => {
        return (
            <Match {...route} render={(props) => {
                const { routes } = route;
                if (props.location.pathname === '/') {
                    return (
                        <Redirect to={{
                            pathname: indexPathname,
                            state: { from: props.location }
                        }}/>
                    );
                }
                if (!route.noAuthNeeded && !route.isLoggedIn && !route.isLoading) {
                    return (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}/>
                    );
                }
                if (props.location.pathname === '/login' && route.isLoggedIn) {
                    return (
                        <Redirect to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}/>
                    );
                }
                if (route.component) {
                    return (
                        <route.component
                            {...props}
                            routes={routes}
                            children={routes ? routes.map((cRoute, i) => (
                                <MatchWithSubRoutes
                                    isLoading={route.isLoading}
                                    isLoggedIn={route.isLoggedIn}
                                    key={i}
                                    {...cRoute}/>
                                )
                            ) : null}
                        />
                    );
                } else if (routes) {
                    return (
                        <fb style={{ height: '100%' }}>
                            {routes.map((cRoute, i) => (
                                <MatchWithSubRoutes
                                    isLoading={route.isLoading}
                                    isLoggedIn={route.isLoggedIn}
                                    key={i}
                                    {...cRoute}/>
                                )
                            )}
                        </fb>
                    );
                } else {
                    return null;
                }
            }}/>
        );
    });

    return (
        <fb style={{ height: '100%' }}>
            {
                baseRoutes.map((route, i) => (
                    <MatchWithSubRoutes
                        isLoading={isLoading}
                        isLoggedIn={isLoggedIn}
                        key={i}
                        {...route}
                    />
                ))
            }
        </fb>
    );
};
