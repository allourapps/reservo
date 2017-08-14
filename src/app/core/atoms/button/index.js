/* @flow */

/**
*   Button atom
*   @module atoms/button
*   @version v1.0.1
*/
import React from 'react';
import _ from 'lodash';
import Color from 'color';
import { FlatButton, RaisedButton } from 'material-ui';

import { pure } from 'core/react/helpers';

import Icon from 'atoms/icon';
import colors from 'atoms/colors';

import './index.scss';

export type IButtonProps = {
    label?: string,
    color?: string,
    backgroundColor?: string,
    bgColor?: string,
    success?: string,
    children?: any,
    style?: Object,
    disabled?: boolean,
    primary?: boolean,
    secondary?: boolean,
    thin?: boolean,
    iconProps?: Object,
    labelStyle?: Object,
    className?: string,
    type?: 'raised' | 'flat',
    icon?: string | React.Element<*>,
    onClick?: () => {}
};

const defaultLabelStyle = {
    textTransform: 'none',
    paddingTop: '6px',
    paddingBottom: '5px'

};
const thinLabelStyle = {
    ...defaultLabelStyle,
    fontSize: '1.25rem',
    fontWeight: 400,
};

/**
*   Creates button
*   @const button
*   @param {Object} props - props
*   @returns {HTMLElement} <UIButton>
*/
const Button = pure((props: IButtonProps) => {
    const { type = 'raised', color = 'primary', backgroundColor = 'white', bgColor, disabled = false, icon, labelStyle, iconProps, className = '', primary, secondary, thin = true, success } = props;
    const classes = `${type}-button noGrow button ${disabled ? 'disabled' : ''} ` + className;
    const UIButton: React.Element<*> = type === 'flat' ? FlatButton : RaisedButton;
    let iconElement: Object = {};

    let c = colors[color] || colors[`${color}Color`] || color;
    let bc = bgColor || backgroundColor;
    bc = colors[bc] || colors[`${bc}Color`] || bc;

    if (!disabled) {
        if (primary) {
            bc = colors.primaryColor;
            c = colors.white;
        } else if (secondary) {
            bc = colors.secondaryColor;
            c = colors.white;
        } else if (success) {
            bc = colors.successColor;
            c = colors.white;
        }
    } else {
        c = Color(c).alpha(0.30).rgb().string();

    }

    if (icon) {
        if (typeof icon === 'string') {
            iconElement = <Icon {...iconProps} color={c} name={icon}/>;
        } else {
            iconElement = icon;
        }
    }

    let ls: Object = {};

    if (labelStyle) {
        ls = labelStyle;
    }

    if (thin) {
        ls = { ...ls, ...thinLabelStyle };
    } else {
        ls = { ...ls, ...defaultLabelStyle };
    }

    const cleanedProps = _.omit(props, [ 'type', 'icon', 'iconProps', 'labelStyle', 'primary', 'secondary', 'success', 'thin', 'onClick', 'bgColor' ]);

    if (bc !== colors.white) {
        ls.color = 'white';
    }

    if (disabled) {
        ls.color = Color(ls.color).alpha(0.30).rgb().string();
    } else {
        ls.color = ls.color || c;
    }

    return (
        <UIButton
            containerElement={<fb/>}
            {...cleanedProps}
            className={classes}
            labelStyle={ls}
            backgroundColor={bc}
            icon={icon ? iconElement : null}
            onClick={props.onClick}
        />
    );
});


export default Button;
