import React, { PureComponent } from 'react';
import _ from 'lodash';

import ToastComponent from './toastComponent';

const pure = (renderComponent) => {
    class Wrapper extends PureComponent {
        render() {
            return renderComponent(this.props);
        }
    }

    return Wrapper;
};

const Condition = ({ when, children, is, has }) => when || is || has ? _.isArray(children) ?
    <span>{children}</span> : children : null;
// the method should be used in case you want to access
// the value of different input event types
const getValue = (type, evt, inputChecked) => {
    switch (type) {
        case 'check':
            return inputChecked;
        case 'select':
        case 'date':
            return evt;
        default:
            return evt.target.value;
    }
};

const memoize = (factory) => {
    const cache = {};

    // this method will generate a new method if the keys are different
    // the keys must be strings and cannot be empty
    return (...keys) => {
        if (!keys.length) {
            throw new Error('the memoize method needs at least a key');
        }

        // join the different keys to a computed key
        const key = keys.join('');
        const fromCache = cache[key];

        if (fromCache) {
            return fromCache;
        }

        // create a new method that calls the assigned parameter `factory`
        const callback = (...argv) => factory.apply(null, keys.concat(argv));

        cache[key] = callback;

        return callback;
    };
};

const curry = (method, ...base) => {
    const callback = (...props) => method.apply(null, base.concat(props));
    return callback;
};

export {
    pure,
    curry,
    memoize,
    getValue,
    Condition,
    ToastComponent,
};
