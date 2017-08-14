import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const createProps = (propTypes, props, className) => {
    const newProps = {};
    Object.keys(props)
        .filter(key => (key === 'children' || !propTypes[key]))
        .forEach(key => (newProps[key] = props[key]));
    return Object.assign({}, newProps, { className });
};

const ModificatorType = PropTypes.oneOf([ 'xs', 'sm', 'md', 'lg' ]);
const modificatorKeys = [
    'start',
    'center',
    'end',
    'top',
    'middle',
    'bottom',
    'around',
    'between',
    'first',
    'last'
];

const propTypes = {
    reverse: PropTypes.bool,
    start: ModificatorType,
    center: ModificatorType,
    end: ModificatorType,
    top: ModificatorType,
    middle: ModificatorType,
    bottom: ModificatorType,
    around: ModificatorType,
    between: ModificatorType,
    first: ModificatorType,
    last: ModificatorType,
    className: PropTypes.string,
    children: PropTypes.node,
    grow: PropTypes.bool,
    noShrink: PropTypes.bool,
    noWrap: PropTypes.bool,
    overflowX: PropTypes.bool,
    slim: PropTypes.bool,
    xSlim: PropTypes.bool,
};

const getClassNames = (props) => {
    const modificators = [ 'row' ];

    for (let i = 0; i < modificatorKeys.length; ++i) {
        const key = modificatorKeys[i];
        const value = props[key] && typeof props[key] === 'boolean' ? 'xs' : props[key];
        if (value) {
            modificators.push(`${key}-${value}`);
        }
    }

    if (props.grow) {
        modificators.push('grow');
    }

    if (props.noShrink) {
        modificators.push('noShrink');
    }

    if (props.reverse) {
        modificators.push('reverse');
    }

    if (props.noWrap) {
        modificators.push('noWrap');
    }

    if (props.overflowX) {
        modificators.push('overflowX');
    }

    if (props.slim) {
        modificators.push('slim');
    }

    if (props.xSlim) {
        modificators.push('xSlim');
    }

    return classNames(props.className, modificators);
};

export const Row = (props) => (<row {...createProps(propTypes, props, getClassNames(props))} />);

Row.propTypes = propTypes;
