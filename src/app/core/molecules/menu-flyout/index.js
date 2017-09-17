/* @flow */

/**
*   menuFlyout molecule
*   @module molecules/menu-flyout
*   @version v1.0.1
*/
import React from 'react';
import Flyout from 'atoms/flyout';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import './index.scss';

type IMenuFlyout = {
    closeOnItemClick?: boolean,
    items: Array<*>,
    divider?: boolean,
    close: () => void,
    desktop?: boolean
}

/**
 *   Represents menu flyout
 *   @class MenuFlyout
 *   @extends React.PureComponent
 */
export default class MenuFlyout extends React.PureComponent<*, IMenuFlyout, *> {

    /**
    *   handler function for menu item click
    *   @const menuItemClick
    *   @param {Object} item - item
    *   @param {Object} props - props
    *   @param {Function} props.closeOnItemClick - close on item click handler function
    *   @param {Function} props.close - close function
    *   @returns {undefined}
    */
    menuItemClick = (item: Object) => {
        const { closeOnItemClick, close } = this.props;

        if (closeOnItemClick && !item.disabled) {
            item.onClick && item.onClick();
            close();
        } else if (!closeOnItemClick && !item.disabled) {
            item.onClick && item.onClick();
        }
    };

    render() {
        const { items, divider, desktop } = this.props;

        return (
            <Flyout {...this.props}>
                <Menu desktop={desktop} className={`${desktop ? 'menuFlyoutListDesktop' : 'menuFlyoutList'}`}>
                    {items.map((item: Object, i: number) => {
                        return (
                            <MenuItem
                                key={i}
                                {...item}
                                className={`menu-item ${divider ? 'divider' : ''}`}
                                onClick={() => this.menuItemClick(item) }
                            />
                        );
                    })}
                </Menu>
            </Flyout>
        );
    }
}
