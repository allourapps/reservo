/**
*   TopBar molecule
*   @module molecules/top-bar
*   @version v1.0.1
*/
import React from 'react';
import { Link } from 'react-router';
import Media from 'react-responsive';

import { Condition } from 'core/react/helpers';

import Button from 'atoms/button';
import Text from 'atoms/text';
import Icon from 'atoms/icon';
import colors from 'atoms/colors';
import Avatar from 'atoms/avatar';

import { PopoverAnimationVertical } from 'material-ui/Popover';
import MenuFlyout from 'molecules/menu-flyout';
import NavigationSidebar from './navigationSidebar';
export { UtilityBar } from './utility-bar/index.js';
export { Title } from './title/index.js';

import './index.scss';

export type IRoute = {
    name?: string,
    pattern?: string,
    routes?: IRoute,
    invisible?: boolean,
    component?: React.Element<*>,
    isDetailed?: boolean,
    title?: string | React.Element<*>,
    backURL?: string,
    rightTabComponent?: React.Element<*>,
};

type ITopbarProps = {
    routes?: [ IRoute ],
    location?: { pathname: string },
    leftComp?: React.Element<*>,
    rightComp?: React.Element<*>,
    style?: Object;
};

/**
*   Splits and cleans pathname
*   @const splitAndCleanPathname
*   @param {string} pathname - pathname
*   @returns {string} path
*/
const splitAndCleanPathname = (pathname: string = '') => {
    const p: string = pathname.split('/').filter((pn: string) => pn.length);
    p.shift();
    return p;
};

export const deepBlueColor: string = '#193b56';

/**
*   Determines active state
*   @const determineActiveState
*   @param {any} r - r
*   @param {boolean} isForSecondLevel - isForSecondLevel
*   @returns {Function} secondLevelFunction or firstLevelFunction
*/
const determineActiveState = (r: Object, isForSecondLevel: boolean) => {
    const firstLevelFunction = (dLocation: string) => splitAndCleanPathname(dLocation.pathname)[0] === splitAndCleanPathname(r.pattern)[0];
    const secondLevelFunction = (dLocation: string) => {
        const rClean = splitAndCleanPathname(r.pattern);
        const dLocationClean = splitAndCleanPathname(dLocation.pathname);
        const firstCondition = rClean[rClean.length - 1] === dLocationClean[dLocationClean.length - 1];
        const secondCondition = dLocation.pathname.includes(r.pattern);
        const thirdCondition = r.basePattern ? dLocation.pathname.includes(r.basePattern) : false;
        return firstCondition || secondCondition || thirdCondition;
    };
    return isForSecondLevel ? secondLevelFunction : firstLevelFunction;
};

/**
*   Determines active state
*   @const determineActiveState
*   @param {Object} props - props
*   @param {IRoute} route - route
*   @param {boolean} isForSecondLevel - isForSecondLevel
*   @returns {HTMLElement} <Button>
*/
const TopBarButton = (props: {route: IRoute, isForSecondLevel?: boolean}) => {
    const r = props.route;
    const { isForSecondLevel = false } = props;
    return (
        <Button
            type="flat"
            rippleColor={deepBlueColor}
            className="top-bar-button"
            containerElement={<Link
                activeClassName="active"
                to={isForSecondLevel ? r.pattern : r.indexPattern || r.pattern}
                isActive={determineActiveState(r, isForSecondLevel)}
            />}
            label={r.name}
        />
    );
};

/**
*   Represents Top bar
*   @class TopBar
*   @extends React.Component
*/
export default class TopBar extends React.Component<*, ITopbarProps, *> {
    static contextTypes = {
        router: React.PropTypes.object,
    };
    /**
    *   @constructor
    */
    constructor() {
        super();

        this.state = {
            sidebarNavigationIsOpen: false,
            flyOutIsOpen: false,
            flyOutAnchorEl: null,
        };
    }

    openPopover = (event) => {
        event.preventDefault();
        this.setState({
            flyOutIsOpen: true,
            flyOutAnchorEl: event.currentTarget,
        });
    }

    render() {
        const { props, state } = this;
        const { location, routes, user } = props;
        console.log(user);
        let firstLevelLinks: Object;
        let secondLevelLinks: Object;
        let secondLevelNavigation: Object;
        let firstLevelNavigation: Object;
        let BackButton: Object;
        let TitleComponent: Object;

        const splittedLocationPathname: string = splitAndCleanPathname(location.pathname);
        const aBR = routes.find(r => splitAndCleanPathname(r.pattern)[0] === splittedLocationPathname[0]);
        if (!aBR) {
            return null;
        }

        const activeBaseRoute: IRoute = aBR;

        let activeRoute: IRoute;
        if (activeBaseRoute && !activeBaseRoute.routes || splittedLocationPathname.length === 1) {
            activeRoute = activeBaseRoute;
        } else {
            activeRoute = activeBaseRoute.routes.find((r: Object) => {
                return splitAndCleanPathname(r.pattern)[1] === splittedLocationPathname[1];
            });
        }
        const activeRouteIsDetailed = activeRoute && activeRoute.isDetailed;

        if (activeRouteIsDetailed) {
            BackButton = (
                <Button
                    type="flat"
                    label="Close"
                    className="goBack"
                    rippleColor={deepBlueColor}
                    onClick={() => this.context.router.transitionTo(activeRoute.backURL)}
                    labelStyle={{ paddingLeft: 0, textTransform: 'capitalize' }}
                    icon={<Icon name="previous" style={{ color: 'white', padding: '0', fontSize: '15px', marginBottom: 1 }} />}
                />
            );
            if (typeof activeRoute.title === 'string') {
                TitleComponent = (
                    <fb className="grow noShrink jCenter aCenter">
                        <Text color="white">{activeRoute.title}</Text>
                    </fb>
                );
            } else {
                TitleComponent = <activeRoute.title location={location} params={props.params} />;
            }
        }

        if (routes && routes.length > 0) {
            firstLevelLinks = props.routes.filter(r => !r.invisible).map(r => <TopBarButton key={r.pattern} route={r} />);

            firstLevelNavigation = (<fb className="navigation">{firstLevelLinks}</fb>);

            const secondLevelRoutes: Array<*> = (activeRouteIsDetailed ? activeRoute : activeBaseRoute).routes || [];
            secondLevelLinks = secondLevelRoutes.filter(r => !r.invisible).map(r => <TopBarButton key={r.pattern} route={r} isForSecondLevel/>);
            secondLevelNavigation = (<fb className="navigation">{secondLevelLinks}</fb>);
        }

        return (
            <Media minWidth={1200}>
                {(matches: boolean) => {
                    if (matches) {
                        return (
                            <fb className="top_bar" style={props.style || {}}>
                                <fb className="firstLevel">
                                    {!activeRouteIsDetailed ? <fb>{props.leftComp}</fb> : BackButton}
                                    {!activeRouteIsDetailed ? <fb>{firstLevelNavigation}</fb> : TitleComponent}
                                    <fb>{props.rightComp}</fb>
                                    <fb
                                        onClick={this.openPopover}
                                        style={{
                                            padding: '0 1rem',
                                            flex: '0 0 auto',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Avatar
                                            isPerson
                                            path={user.PhotoPath}
                                        />
                                    </fb>
                                    <MenuFlyout
                                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        open={state.flyOutIsOpen}
                                        anchorEl={state.flyOutAnchorEl}
                                        onRequestClose={() => this.setState({ flyOutIsOpen: false })}
                                        animation={PopoverAnimationVertical}
                                        items={[
                                            {
                                                primaryText: 'Logout',
                                                onClick: props.logOut
                                            },
                                            {
                                                primaryText: 'My Profile',
                                                onClick: () => {}
                                            },
                                        ]}
                                        divider
                                    />
                                </fb>
                                <Condition has={secondLevelLinks.length || activeRoute && activeRoute.rightTabComponent || activeBaseRoute.rightTabComponent}>
                                    <fb className="secondLevel">
                                        <fb className="leftComp">{secondLevelLinks.length ? secondLevelNavigation : null}</fb>
                                        {activeBaseRoute && activeBaseRoute.rightTabComponent && <fb className="rightComp noGrow">
                                            {React.cloneElement(activeBaseRoute.rightTabComponent, {
                                                location,
                                                splittedLocation: splittedLocationPathname,
                                            })}
                                        </fb>}
                                        {activeRoute !== activeBaseRoute && activeRoute && activeRoute.rightTabComponent && <fb className="rightComp noGrow">
                                            {React.cloneElement(activeRoute.rightTabComponent, {
                                                location,
                                                splittedLocation: splittedLocationPathname,
                                            })}
                                        </fb>}
                                    </fb>
                                </Condition>
                            </fb>
                        );
                    } else {
                        return (
                            <fb className="top_bar" style={props.style || {}}>
                                <NavigationSidebar
                                    isOpen={this.state.sidebarNavigationIsOpen}
                                    closeSidebar={() => this.setState({ sidebarNavigationIsOpen: false })}
                                    routes={props.routes}
                                    header={props.leftComp}
                                />
                                <fb className="firstLevel">
                                    <Condition has={activeRouteIsDetailed}>
                                        {BackButton}
                                    </Condition>

                                    <Button
                                        type="flat"
                                        rippleColor={deepBlueColor}
                                        onClick={() => this.setState({ sidebarNavigationIsOpen: !this.state.sidebarNavigationIsOpen })}
                                        style={{ height: '100%', borderLeft: activeRouteIsDetailed ? `1px solid ${colors.secondaryColor}` : 'none' }}
                                        containerElement={<a className="noGrow noShrink fb"/>}
                                        icon={<Icon name="burger" color="white" style={{ padding: '0 1rem', width: '4rem' }}/>}
                                    />
                                    {!activeRouteIsDetailed ? <fb className="grow aCenter">{props.leftComp}</fb> : TitleComponent}
                                    <fb className="noGrow">{props.rightComp}</fb>
                                </fb>
                                <Condition has={activeRoute && activeRoute.rightTabComponent}>
                                    <fb className="secondLevel">
                                        <fb className="leftComp"></fb>
                                        {activeRoute && activeRoute.rightTabComponent && <fb className="rightComp noGrow">
                                            {React.cloneElement(activeRoute.rightTabComponent, {
                                                location,
                                                splittedLocation: splittedLocationPathname,
                                            })}
                                        </fb>}
                                    </fb>
                                </Condition>
                            </fb>
                        );
                    }
                }}
            </Media>
        );
    }
}
