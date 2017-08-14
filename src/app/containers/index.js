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
    auth: {
        isLoading: false,
        isLoggedIn: true
    }
});
const RoutesHandler = connect(mapStateToProps)((props) => {
    return (
        <Router>
            <fb style={{ height: '100%' }}>
                {props.auth.isLoading ? null :
                    generateRouteMatches(BaseRoutes, indexPathname, props.auth.isLoading, props.auth.isLoggedIn)
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
