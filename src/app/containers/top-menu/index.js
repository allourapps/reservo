import React, { Component } from 'react';

import TopBar, { Title } from 'molecules/top-bar';

export default class TopMenu extends Component {
    render() {
        return (
            <TopBar
                routes={this.props.routes}
                location={this.props.location}
                leftComp={<Title title="Reservo"/>}
            />
        );
    }
}
