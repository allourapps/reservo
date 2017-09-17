/* @flow */

/**
*   Flyout atom
*   @module atoms/flyout
*   @version v1.0.1
*/
import React from 'react';
import Popover from 'material-ui/Popover';
import PropTypes from 'prop-types';

import Triangle from 'atoms/triangle';

import './index.scss';

type IFlyoutProps = {
    open?: boolean,
    anchorEl?: Object,
    anchorOrigin?: Object,
    targetOrigin?: Object,
    direction?: Object,
    offset?: Object,
    triangleProps?: Object,
    triangleStyle?: Object,
    canAutoPosition?: boolean,
    children?: Object,
    onRequestClose?: () => {}
}

/**
*  Represents Popover
*  Popover doesn't offer an offset. by extending the component
*  and override the method "getTargetPosition" we can support
*  an offset by ourself.
*   @class XPopover
*   @module atoms/flyout
*/
class XPopover extends Popover {
    getTargetPosition(el: Object) {
        let { offset } = this.props;

        if (!offset) {
            offset = {};
        }

        const result = super.getTargetPosition(el);

        result.top += (offset.top || 0);
        result.left += (offset.left || 0);
        result.bottom += (offset.bottom || 0);
        result.right += (offset.right || 0);

        return result;
    }
}

/**
*   Represents Flyout
*   @class Flyout
*   @extends React.Component
*/
class Flyout extends React.Component<*, IFlyoutProps, *> {

    /**
    *   Get position of triangle
    *   @param {Object} direction - direction
    *   @returns {undefined}
    */
    getTrianglePosition(direction: string) {
        const p1 = {};

        // at which side should it appear?
        switch (direction) {
            case 'up':
            case 'up-left':
            case 'up-right':
                p1.bottom = '100%';
                break;
            case 'down':
            case 'down-left':
            case 'down-right':
                p1.top = '100%';
                break;
            case 'left':
            case 'left-up':
            case 'left-down':
                p1.right = '100.5%';
                break;
            case 'right':
            case 'right-up':
            case 'right-down':
                p1.left = '100.5%';
                break;
            default:
                break;
        }

        // how should it be positioned at the specified side?
        switch (direction) {
            case 'up':
            case 'down':
                p1.right = 0;
                p1.left = 0;
                break;
            case 'left':
            case 'right':
                p1.top = 0;
                p1.bottom = 0;
                break;
            case 'left-up':
            case 'right-up':
                p1.top = 0;
                break;
            case 'left-down':
            case 'right-down':
                p1.bottom = 0;
                break;
            case 'up-right':
            case 'down-right':
                p1.right = 0;
                break;
            case 'up-left':
            case 'down-left':
                p1.left = 0;
                break;
            default:
                break;
        }

        return p1;
    }
    static childContextTypes = {
        isOpen: PropTypes.bool
    }

    /**
    *   Allows child to get context
    *   @returns {Object} - if popup is open returns true, else, returns false
    */
    getChildContext() {
        return { isOpen: this.props.open };
    }
    render() {
        const { children, triangleStyle = {}, triangleProps = {}, direction = '', canAutoPosition = true } = this.props;

        let triangle = null;
        let cls = '';

        if (direction) {
            cls = 'directed-popover';
            const styles = Object.assign({ position: 'absolute', margin: 'auto' }, this.getTrianglePosition(direction), triangleStyle);
            triangle = <Triangle direction={direction} height={12} width={12} tag="div" style={styles} {...triangleProps} />;
        }

        return <XPopover canAutoPosition={canAutoPosition} className={cls} style={{ overflow: 'visible' }} {...this.props}>
            {triangle}

            {children}
        </XPopover>;
    }
}

export default Flyout;
