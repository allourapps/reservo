import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppUser } from 'selectors/index';

import TopBar, { Title } from 'molecules/top-bar';

const mapStateToProps = (state) => ({
    auth: getAppUser(state)
});

@connect(mapStateToProps)
export default class TopMenu extends Component {
    render() {
        console.log(this.props);
        return (
            <TopBar
                logOut={() => {}}
                user={this.props.auth}
                routes={this.props.routes}
                location={this.props.location}
                leftComp={<Title title="Reservo"/>}
            />
        );
    }
}
