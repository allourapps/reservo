import React, { Component } from 'react';

import TopMenu from 'containers/top-menu';

export default class Root extends Component {
    render() {
        return (
            <fb className="grow" style={{ height: '100%', width: '100%' }}>
                <TopMenu {...this.props} />
                <fb className="grow">
                    {this.props.children}
                </fb>
            </fb>
        );
    }
}
