/* @flow */

/**
*   Navigation sidebar
*   @module molecules/top-bar/navigationSidebar
*   @version v1.0.1
*/
import React from 'react';
import { Link } from 'react-router';
import Icon from 'atoms/icon';
import './styles.scss';
import Transition from 'react-addons-css-transition-group';
import type { IRoute } from '../index';
import Collapsable from 'atoms/collapsable';
import { List, ListItem } from 'material-ui/List';

type INavigationSidebarProps = {
    isOpen: boolean,
    closeSidebar: () => void,
    routes: [ IRoute ],
    header: React.Element<*>,
}

/**
*   Slits and cleans pathname
*   @const splitAndCleanPathname
*   @param {string} pathname - pathname
*   @returns {string} pathname
*/
const splitAndCleanPathname = (pathname: string = '') => {
    const p = pathname.split('/').filter(pn => pn.length);
    p.shift();
    return p;
};

/**
*   Represents second level links
*   @const SecondLevelLink
*   @param {Object} props - props
*   @param {IRoute} route - route
*   @param {Function} closeSidebar - close sidebar
*   @returns {HTMLElement} <ListItem>
*/
const SecondLevelLink = (props: {route: IRoute, closeSidebar: () => void}) => {
    const { route, closeSidebar } = props;
    return (
        <ListItem
            onClick={closeSidebar}
            containerElement={<Link
                activeClassName="active"
                to={route.pattern}
            />}
            className="linkListItem"
            primaryText={route.name}
            style={{ paddingLeft: '24px' }}
        />
    );
};

const linkListItemHeight = 49;

/**
*   Represents collapsable link group
*   @class CollapsableLinkGroup
*   @extends React.Component
*/
class CollapsableLinkGroup extends React.Component<*, {route: IRoute, closeSidebar: () => void}, *> {

    /**
    *   @constructor
    */
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
    }

    render() {
        const { route, closeSidebar } = this.props;
        const hasChildRoutes = route.routes && route.routes.filter(r => !r.invisible).length;
        return (
            <fb className="noGrow">
                <ListItem
                    onClick={() => hasChildRoutes ? this.setState({ isOpen: !this.state.isOpen }) : closeSidebar()}
                    className="linkListItem"
                    containerElement={<Link
                        activeClassName={`active ${hasChildRoutes ? 'hasChildRoutes' : ''}`}
                        to={hasChildRoutes ? '#' : route.indexPattern || route.pattern}
                        isActive={(dLocation) => splitAndCleanPathname(dLocation.pathname)[0] === splitAndCleanPathname(route.pattern)[0]}
                    />}
                    primaryText={route.name}
                    rightIcon={!hasChildRoutes ? null : <Icon name="arrow-down" className={this.state.isOpen ? 'isOpen' : ''} />}
                />
                { !hasChildRoutes ? null :
                    <Collapsable
                        open={this.state.isOpen}
                        fixedHeight={route.routes.filter(r => !r.invisible).length * linkListItemHeight}
                        springConfig={{ stiffness: 300, damping: 30 }}>
                        {route.routes.filter(r => !r.invisible).map((r, i) => <SecondLevelLink closeSidebar={closeSidebar} route={r} key={i}/>)}
                    </Collapsable>
                }

            </fb>
        );
    }
}

/**
*   Represents navigation sidebar
*   @const NavigationSidebar
*   @param {INavigationSidebarProps} props - props
*   @returns {HTMLElement} <Transition>
*/
const NavigationSidebar = (props: INavigationSidebarProps) => {
    const { isOpen, routes, closeSidebar } = props;
    return (
        <Transition
            className="navigationSidebarWrapper"
            transitionName="navigationSidebarTransitionWrapper"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}>
            { !isOpen ? null :
                <fb className={`navigationSidebar ${isOpen ? 'isOpen' : ''}`}>
                    <fb className="underlay" onClick={closeSidebar}></fb>
                    <fb className="box">
                        <fb className="noGrow header">
                            {props.header}
                        </fb>
                        <List>
                            { routes.filter(r => !r.invisible).map(r => <CollapsableLinkGroup key={r.pattern} route={r} closeSidebar={closeSidebar} />)}
                        </List>
                    </fb>
                </fb>
            }
        </Transition>
    );
};

export default NavigationSidebar;
