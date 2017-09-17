import React, { Component } from 'react';

import TopMenu from 'containers/top-menu';
import { SlideInSidebar } from 'molecules/sidebar';

export default class Root extends Component {
    render() {
        return (
            <fb className="grow" style={{ height: '100%', width: '100%' }}>
                <SlideInSidebar
                    isOpen={true}
                    width={400}
                >
                    asdfasd
                </SlideInSidebar>
                <TopMenu {...this.props} />
                <fb className="grow">
                    {this.props.children}
                </fb>
            </fb>
        );
    }
}
