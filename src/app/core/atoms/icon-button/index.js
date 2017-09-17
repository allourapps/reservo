/* @flow */

/**
 *   IconButton atom
 *   @module atoms/iconButton
 *   @version v1.0.1
 */
import React, { PureComponent } from 'react';
import _ from 'lodash';

import { IconButton as MUIIconButton } from 'material-ui';
import Icon from 'atoms/icon';

import colors from 'atoms/colors';


import './index.scss';

export type IIconButtonProps = {
    name: string,
    size?: 'xsmall' | 'small' | 'medium' | 'large',
    color?: string,
    className?: string,
    style?: Object,
    iconStyle?: Object,
    bgColor?: string,
    tooltip?: string,
    hoverColor?: string,
}

/**
 *   Represents icon button
 *   @class IconButton
 */
class IconButton extends PureComponent<*, IIconButtonProps, *> {

    constructor(props: IIconButtonProps) {
        super(props);
        this.state = {
            hovered: false
        };
    }

    render() {
        const { name, className = '', size, style, iconStyle, color, bgColor, hoverColor, tooltip } = this.props;
        const additionalStyle = {
            width: 'auto',
            height: 'auto',
            padding: 0,
            color: '',
            backgroundColor: ''
        };

        const clsName = `icon-button ${className}`;

        const mainColor = this.state.hovered ? hoverColor : color;

        const additionalIconStyle = {};

        switch (size) {
            case 'xsmall':
                additionalIconStyle.width = '1.5rem';
                additionalIconStyle.height = '1.5rem';
                break;
            case 'small':
                additionalIconStyle.width = '2rem';
                additionalIconStyle.height = '2rem';
                break;
            case 'medium':
                additionalIconStyle.width = '3rem';
                additionalIconStyle.height = '3rem';
                break;
            case 'large':
                additionalIconStyle.width = '4.5rem';
                additionalIconStyle.height = '4.5rem';
                break;
            default:
                additionalIconStyle.width = size;
                additionalIconStyle.height = size;
        }

        if (style && style.width) {
            additionalStyle.width = style.width;
        }

        if (style && style.height) {
            additionalStyle.height = style.height;
        }

        if (style && (style.padding || style.padding === 0)) {
            additionalStyle.padding = style.padding;
        } else {
            additionalStyle.padding = 0;
        }

        if (mainColor) {
            const c = colors[mainColor] || colors[`${mainColor}Color`] || mainColor;
            additionalIconStyle.fill = c;
            additionalStyle.color = c;
        }

        if (bgColor) {
            additionalStyle.backgroundColor = colors[bgColor] || colors[`${bgColor}Color`] || bgColor;
            additionalIconStyle.fill = 'white';
        }

        let iconWrapperProps = {};

        if (hoverColor) {
            iconWrapperProps = {
                onMouseEnter: () => this.setState({ hovered: true }),
                onMouseLeave: () => this.setState({ hovered: false })
            };
        }

        const customStyle = {
            ...additionalStyle,
            ...style,
        };

        const cleanedProps = _.omit(this.props, [ 'size', 'name', 'color', 'bgColor', 'className', 'tooltip', 'hoverColor' ]);
        return (
            <MUIIconButton
                {...cleanedProps}
                className={clsName}
                style={customStyle}
                iconStyle={{
                    ...iconStyle,
                    ...additionalIconStyle,
                }}
                {...iconWrapperProps}
            >
                <Icon name={name} tooltip={tooltip} />
            </MUIIconButton>
        );
    }
}

IconButton.defaultProps = {
    name: 'cut',
    size: 'small'
};

export default IconButton;
