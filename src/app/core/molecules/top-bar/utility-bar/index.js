/* @flow */

/**
*   Utility bar
*   @module molecules/top-bar/utility-bar
*   @version v1.0.1
*/
import React from 'react';
import _ from 'lodash';

import Button from 'atoms/button';

import './index.scss';

const deepBlueColor = '#193b56';

const buttonProps = {
    type: 'flat',
    rippleColor: deepBlueColor,
    className: 'utility_item'
};

type IUtilityBarProps = {
    children: Array<React.Element<*>> & React.Element<*>
}

/**
*   Represents utility bar
*   @const UtilityBar
*   @param {Object} props - props
*   @returns {HTMLElement} <fb>
*/
export const UtilityBar = (props: IUtilityBarProps) => {
    const { children } = props;

    if (!children) {
        return null;
    }

    const divider = (<fb className="divider noGrow"/>);
    const elements = [];

    (_.isArray(children) ? children : [ children ]).forEach((child: Object) => {
        elements.push(divider);
        elements.push(<Button {...buttonProps} containerElement={<fb />} children={child} />);
    });

    return (<fb className="utility_bar" {...props}>{React.Children.toArray(elements)}</fb>);
};
