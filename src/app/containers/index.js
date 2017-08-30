import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import type { Store } from 'redux';
import { Provider } from 'react-redux';
import Router from 'react-router/HashRouter';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from 'reducers/index';
import './styles.scss';
import { generateRouteMatches } from 'core/routes/helper';
import BaseRoutes, { indexPathname } from './routes';

import { getAppUser } from 'selectors/index';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // eslint-disable-line no-underscore-dangle
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line no-underscore-dangle
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store: Store<*, *> = createStore(reducers, enhancer);

const mapStateToProps = (state) => ({
    auth: getAppUser(state)
});
const RoutesHandler = connect(mapStateToProps)((props) => {
    const { auth = {} } = props;
    return (
        <Router>
            <fb className="grow" style={{ height: '100%' }}>
                {auth.isLoading ? null :
                    generateRouteMatches(BaseRoutes, indexPathname, auth.isLoading || false, auth.isLoggedIn || false)
                }
            </fb>
        </Router>
    );
});

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <RoutesHandler />
                </Provider>
            </MuiThemeProvider>
        );
    }
}
