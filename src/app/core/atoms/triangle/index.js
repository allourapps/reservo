// @flow

/**
*   Triangle atom
*   @module atoms/triangle
*   @version v1.0.1
*/
import React from 'react';

type IBorderStyles = {
    width: number,
    height: number,
    color?: string,
    direction?: string,
    ratio?: number
}

const borderStyles = ({ width, height, color, direction, ratio = 2.0 }: IBorderStyles) => {
    switch (direction) {
        case 'up':
            return {
                borderTopWidth: 0,
                borderRightWidth: width / ratio,
                borderBottomWidth: height,
                borderLeftWidth: width / ratio,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: color,
                borderLeftColor: 'transparent',
            };
        case 'right':
            return {
                borderTopWidth: height / ratio,
                borderRightWidth: 0,
                borderBottomWidth: height / ratio,
                borderLeftWidth: width,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: color,
            };
        case 'down':
            return {
                borderTopWidth: height,
                borderRightWidth: width / ratio,
                borderBottomWidth: 0,
                borderLeftWidth: width / ratio,
                borderTopColor: color,
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
            };
        case 'left':
            return {
                borderTopWidth: height / ratio,
                borderRightWidth: width,
                borderBottomWidth: height / ratio,
                borderLeftWidth: 0,
                borderTopColor: 'transparent',
                borderRightColor: color,
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
            };
        case 'up-left':
            return {
                borderTopWidth: height,
                borderRightWidth: width,
                borderBottomWidth: 0,
                borderLeftWidth: 0,
                borderTopColor: color,
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
            };
        case 'up-right':
            return {
                borderTopWidth: 0,
                borderRightWidth: width,
                borderBottomWidth: height,
                borderLeftWidth: 0,
                borderTopColor: 'transparent',
                borderRightColor: color,
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
            };
        case 'down-left':
            return {
                borderTopWidth: height,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderLeftWidth: width,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: color,
            };
        case 'down-right':
            return {
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: height,
                borderLeftWidth: width,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: color,
                borderLeftColor: 'transparent',
            };
        default:
            console.error('Triangle.js wrong direction. ' + direction + ' is invalid. Must be one of: ' + [ 'up', 'right', 'down', 'left', 'up-right', 'up-left', 'down-right', 'down-left' ]);
            return {};
    }
};

const defaultStyle = { width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid' };

type ITriangleProps = {
    style?: Object
}

/**
*   Represents triangle
*   @const Triangle
*   @param {Object} props - props
*   @returns {HTMLElement} <div> or <span>
*/
const Triangle = (props: ITriangleProps) => {
    const styles = Object.assign({}, borderStyles(props), defaultStyle, props.style || {});

    const e = props.tag === 'div'
        ? <div className="triangle" style={styles}></div>
        : <span className="triangle" style={styles}></span>;

    return e;
};

export default Triangle;
