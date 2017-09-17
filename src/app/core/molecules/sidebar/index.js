/* @flow */

/**
*   Sidebar molecule
*   @module molecules/sidebar
*   @version v1.0.1
*/
import React, { PureComponent } from 'react';
import Media from 'react-responsive';
import _ from 'lodash';

import Paper from 'atoms/paper';
import Icon from 'atoms/icon';

import './style.scss';

type ISidebarProps = {
    width?: number,
    isRight?: boolean,
    className?: string,
    mediaMinWidth?: number,
    children?: Array<React.Element<*>>,
    isOpen: boolean,
    slideInSidebar: boolean,
    hideButton: boolean,
    rootStyle?: Object,
    rootClassName?: string,
    onRequestClose?: () => {},
    closeButton?: () => {}
}

/**
*   Represents Sidebar
*   @class Sidebar
*   @extends React.PureComponent
*/
class Sidebar extends PureComponent<*, ISidebarProps, *> {
    render() {
        const { width, className, mediaMinWidth = 1200, slideInSidebar = false } = this.props;

        const filteredProps = _.omit(this.props, [ 'width', 'mediaMinWidth', 'isRight', 'isOpen', 'hideButton', 'slideInSidebar' ]);
        return (
            <Media minWidth={mediaMinWidth}>
                {(matches: boolean) => {
                    if (matches && !slideInSidebar) {
                        return (
                            <Paper
                                style={{ flexBasis: width ? width : 400, boxShadow: '0 3px 13px 0 rgba(0,0,0,0.07), 0 1px 2px 0 rgba(0,0,0,0.12), 0 3px 6px 0 rgba(0,0,0,0)' }}
                                className={`${className ? className : ''} sidebar`}
                                {...filteredProps}
                            />
                        );
                    } else {
                        return <SlideInSidebar {...this.props} />;
                    }
                }}
            </Media>
        );
    }
}

type ISlideInSidebarState = {
    isOpen: boolean
}

/**
*   Represents slide in slidebar
*   @class SlideInSidebar
*   @extends React.PureComponent
*/
class SlideInSidebar extends PureComponent<*, ISidebarProps, ISlideInSidebarState> {
    state: ISlideInSidebarState;

    /**
    *   @constructor
    *   @param {Object} props - props
    */
    constructor(props: ISidebarProps) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    /**
    *   Check if boolean or not
    *   @param {string} checkedItem - checkedItem
    *   @returns {string} type
    */
    isBoolean = (checkedItem: boolean) => typeof checkedItem === 'boolean';

    syncIsOpenState = () => {
        const { isOpen } = this.props;
        if (this.isBoolean(isOpen)) {
            this.setState({ isOpen });
        }
    }

    /**
    *   Toggles open state
    *   @returns {undefined}
    */
    toggleOpenState = () => {
        // Check if it's boolean. This is needed because if there is no passed isOpen prop, it will be undefined.
        const { isOpen, onRequestClose } = this.props;
        if (onRequestClose) {
            onRequestClose();
        }
        if (!this.isBoolean(isOpen)) {
            this.setState({ isOpen: !this.state.isOpen });
        }
    }

    /**
    *   componentDidUpdate lifeCycle method
    *   @returns {undefined}
    */
    componentDidUpdate() {
        // Needed to sync two isOpen datas from different sources. One is this.state and one from props
        this.syncIsOpenState();
    }

    render() {
        const { width, className, isRight, isOpen = false, hideButton = false, closeButton, onRequestClose, rootStyle, rootClassName } = this.props;
        const filteredProps = _.omit(this.props, [ 'width', 'mediaMinWidth', 'isRight', 'closeButton', 'onRequestClose', 'isOpen', 'hideButton', 'slideInSidebar', 'rootStyle', 'rootClassName' ]);
        return (
            <fb className={`slideInSidebarWrapper horizontal ${rootClassName || ''} ${this.state.isOpen || isOpen ? 'isOpen' : ''} ${isRight ? 'isRight' : ''}`} style={rootStyle}>
                <Paper
                    className={`${className ? className : ''} sidebar`}
                    style={{ flexBasis: width ? width : 400, position: 'relative' }}
                    {...filteredProps}>
                    {this.props.children}

                    {!hideButton &&
                        <fb className="openIcon" onClick={this.toggleOpenState}>
                            <Icon
                                name="arrow-right"
                                style={{ color: 'white', fontSize: '36px' }}
                                className={`${this.state.isOpen ? 'rotateLeft' : ''} ${isRight ? 'right-side' : ''}`}
                            />
                        </fb>
                    }

                    {closeButton &&
                        <fb className="closeIcon" onClick={onRequestClose}>
                            <Icon name="highlight-off" color="white" />
                        </fb>
                    }
                </Paper>
            </fb>
        );
    }
}

export { SlideInSidebar };
export default Sidebar;
