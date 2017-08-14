/* @flow */

// eslint-disable-next-line no-unused-vars

/**
*   Icon atom
*   @module atoms/icon
*   @version v1.0.1
*/
import React from 'react';
import _ from 'lodash';
import * as string from 'underscore.string';

import { pure } from 'core/react/helpers';

import colors from 'atoms/colors';

import * as Icons from './icons';

import './styles.scss';

type IIconProps = {
    name: string,
    size: 'xsmall' | 'small' | 'medium' | 'large',
    className?: string,
    style?: Object,
    color?: string,
    bgColor?: string,
    tooltip?: string,
    disabled?: boolean,
    onClick?: () => {}
}

/**
*   Represents icon
*   @const Icon
*   @param {Object} props - props
*   @returns {HTMLElement} <fb>
*/
const Icon = pure((props: IIconProps) => {
    const { name, className, size, style, color, bgColor, tooltip, disabled, onClick } = props;

    const customStyle = style ? Object.assign({}, style) : {};

    switch (size) {
        case 'xsmall':
            customStyle.width = '1.5rem';
            customStyle.height = '1.5rem';
            break;
        case 'small':
            customStyle.width = '2rem';
            customStyle.height = '2rem';
            break;
        case 'medium':
            customStyle.width = '3rem';
            customStyle.height = '3rem';
            break;
        case 'semi-large':
            customStyle.width = '3.5rem';
            customStyle.height = '3.5rem';
            break;
        case 'large':
            customStyle.width = '4.5rem';
            customStyle.height = '4.5rem';
            break;
        default:
            customStyle.width = style && style.width ? style.width : '2rem';
            customStyle.height = style && style.height ? style.height : '2rem';
    }

    if (color) {
        customStyle.fill = colors[color] || colors[`${color}Color`] || color;
    }

    if (bgColor) {
        customStyle.backgroundColor = colors[bgColor] || colors[`${bgColor}Color`] || bgColor;
        customStyle.fill = 'white';
    }

    if (style && style.color) {
        customStyle.fill = style.color;
    }

    if (style && style.fontSize) {
        customStyle.width = style.fontSize;
    }

    if (!customStyle.fill) {
        customStyle.fill = colors.darkColor;
    }

    const compName = string.classify(name);
    const cleanedProps = _.omit(props, [ 'bgColor', 'tooltip' ]);
    const Comp = Icons[ compName ];

    return <fb title={tooltip} style={{ display: 'inline-flex', verticalAlign: 'middle', margin: 0, padding: 0, flexGrow: 0, flexShrink: 1 }}><Comp {...cleanedProps} className={className} style={customStyle} onClick={disabled ? '' : onClick}/></fb>;
});

Icon.defaultProps = {
    name: 'alert',
};

/**
*   Represents arrow icon
*   @const Arrow
*   @returns {HTMLElement} <Icon>
*/
const Arrow = pure(({ open, style }) =>
    <Icon name="arrow-open" className={open ? 'animated rotate90 icon' : 'icon animated'} size="small" style={{ ...style, bottom: '0.25rem' }}/>
);

export { Arrow };
export default Icon;
