import React, { Component } from 'react';

import TopBar from 'molecules/top-bar';

export default class TopMenu extends Component {
    render() {
        return (
            <div>
                <TopBar
                    routes={this.props.routes}
                    location={this.props.location}
                    leftComp={<Title title="Blog"/>}
                />
            </div>
        );
    }
}
