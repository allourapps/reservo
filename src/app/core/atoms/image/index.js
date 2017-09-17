/* @flow */

// eslint-disable-next-line no-unused-vars

/**
*   Image atom
*   @module atoms/image
*   @version v1.0.1
*/
import React from 'react';
import _ from 'lodash';
import './index.scss';

const sizeVariants = {
    tiny: '2.5rem',
    small: '5rem',
    medium: '8rem',
    big: '12rem'
};

type IImageProps = {
    path: string,
    size?: string,
    customSizes?: Object,
    className?: string,
    variant?: string,
    style?: Object,
    effect?: string
}

/**
*   Represents image
*   @const Image
*   @param {Object} props - props
*   @returns {HTMLElement} <div>
*/
const Image = (props: IImageProps) => {
    const { path, size = 'medium', customSizes = { width: '', height: '' }, className = '', variant = '', style = {}, effect } = props;
    const sizes = {};

    if (customSizes) {
        sizes.width = customSizes.width;
        sizes.height = customSizes.height;
    } else if (size !== 'none' && sizeVariants[size]) {
        sizes.width = sizeVariants[size];
        sizes.height = sizeVariants[size];
    } else {
        sizes.width = size;
        sizes.height = size;
    }

    let variants = '';

    switch (variant) {
        case 'round':
            variants += ' round';
            break;
        case 'rounded':
            variants += ' rounded';
            break;
        default:
            variants += '';
            break;
    }

    const filteredProps = _.omit(props, [ 'path', 'size', 'customSizes', 'variant', 'effect' ]);

    const baseStyle = { width: sizes.width, height: sizes.height, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundImage: `url(${path})` };
    const customStyle = { ...baseStyle, ...style };

    if (effect) {
        customStyle.backgroundImage = `${effect}, ${customStyle.backgroundImage}`;
    }

    return (
        <div {...filteredProps} className={`image ${variants} ${className}`} style={customStyle}/>
    );
};

export default Image;
