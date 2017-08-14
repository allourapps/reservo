import React from 'react';
import PropTypes from 'prop-types';

const createProps = (propTypes, props, className) => {
    const newProps = {};
    Object.keys(props)
        .filter(key => (key === 'children' || !propTypes[key]))
        .forEach(key => (newProps[key] = props[key]));
    return Object.assign({}, newProps, { className });
};

const ModificatorType = PropTypes.oneOfType([ PropTypes.number, PropTypes.bool ]);

const propTypes = {
    xs: ModificatorType,
    sm: ModificatorType,
    md: ModificatorType,
    lg: ModificatorType,
    xsOffset: PropTypes.number,
    smOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    lgOffset: PropTypes.number,
    reverse: PropTypes.bool,
    grow: PropTypes.bool,
    shrink: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    jEnd: PropTypes.bool,
    aEnd: PropTypes.bool,
};

const classMap = {
    xs: 'col-xs',
    sm: 'col-sm',
    md: 'col-md',
    lg: 'col-lg',
    xsOffset: 'col-xs-offset',
    smOffset: 'col-sm-offset',
    mdOffset: 'col-md-offset',
    lgOffset: 'col-lg-offset',
};

function getClassNames(props) {
    const extraClasses = [];

    if (props.className) {
        extraClasses.push(props.className);
    }

    if (props.reverse) {
        extraClasses.push('reverse');
    }

    if (props.grow) {
        extraClasses.push('grow');
    }

    if (props.shrink) {
        extraClasses.push('shrink');
    }

    if (props.jEnd) {
        extraClasses.push('jEnd');
    }

    if (props.aEnd) {
        extraClasses.push('aEnd');
    }

    return Object.keys(props)
        .filter(key => classMap[key])
        .map(key => {
            if (Number.isInteger(props[key])) {
                return (classMap[key] + '-' + props[key]);
            } else {
                return classMap[key];
            }
        })
        .concat(extraClasses).join(' ');
}

export const Col = (props) => {
    const className = getClassNames(props);
    return (<column {...createProps(propTypes, props, className)} />);
};

Col.propTypes = propTypes;
