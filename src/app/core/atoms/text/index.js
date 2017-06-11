/* @flow */

import React from 'react';
import colors from 'atoms/colors';
import _ from 'lodash';
import './styles.scss';

export type ITextProps = {
    children?: string | any,
    bold?: boolean,
    color?: 'default' | 'primary' | 'secondary' | 'warning' | 'alert' | 'success' | string,
    fontWeight?: number,
    textTransform?: boolean,
    fontSize?: number | string,
    small?: boolean,
    large?: boolean,
    xlarge?: boolean,
    ellipsis?: boolean,
    style?: Object,
    headline?: boolean,
    soft?: boolean,
    hard?: boolean,
    thin?: boolean,
    className?: string,
    verticalSpacing?: boolean | number | string,
};

const Text = (props: ITextProps) => {
    const {
        children,
        bold,
        thin,
        color,
        fontWeight,
        textTransform,
        fontSize,
        small,
        large,
        xlarge,
        ellipsis,
        style,
        headline,
        soft,
        hard,
        className,
        verticalSpacing
    } = props;

    let customStyle = {
        lineHeight: 1.2
    };

    if (headline) {
        customStyle.fontWeight = 300;
        customStyle.fontSize = '2rem';
        customStyle.color = colors.primaryColor;
    } else {
        if (bold) {
            customStyle.fontWeight = 800;
        } else if (thin) {
            customStyle.fontWeight = 300;
        } else if (fontWeight) {
            customStyle.fontWeight = fontWeight;
        }

        if (small) {
            customStyle.fontSize = '1rem';
        } else if (large) {
            customStyle.fontSize = '1.3333333rem';
        } else if (xlarge) {
            customStyle.fontSize = '2rem';
        } else if (fontSize) {
            customStyle.fontSize = fontSize;
        }

        if (soft) {
            customStyle.color = colors.grayDark;
        } else if (hard) {
            customStyle.color = colors.hardTextColor;
        }

        if (color) {
            switch (color) {
                case 'default':
                    customStyle.color = colors.textColor;
                    break;
                default:
                    customStyle.color = colors[color] || colors[`${color}Color`] || color;
            }
        }
    }

    if (textTransform) {
        customStyle.textTransform = textTransform;
    }

    if (verticalSpacing) {
        if (typeof verticalSpacing === 'boolean') {
            customStyle.marginBottom = '1rem';
        } else {
            customStyle.marginBottom = verticalSpacing;
        }
    }

    if (ellipsis) {
        customStyle.whiteSpace = 'nowrap';
        customStyle.overflow = 'hidden';
        customStyle.textOverflow = 'ellipsis';
    }

    if (style) {
        customStyle = { ...customStyle, ...style };
    }

    const ownedProps = [
        'bold',
        'thin',
        'color',
        'fontWeight',
        'textTransform',
        'fontSize',
        'small',
        'large',
        'xlarge',
        'headline',
        'soft',
        'hard',
        'ellipsis',
        'verticalSpacing',
    ];

    const filteredProps = _.omit(props, ownedProps);

    return (
        <text className={className ? className : ''} {...filteredProps} style={customStyle}>{children}</text>
    );
};

Text.defaultProps = {
    color: 'default',
    fontWeight: 400,
    fontSize: '1.16666666rem',
};

export default Text;
