import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppUser } from 'selectors/index';

import IconButton from 'atoms/icon-button';

import TopBar, { Title } from 'molecules/top-bar';

const mapStateToProps = (state) => ({
    auth: getAppUser(state)
});

@connect(mapStateToProps)
export default class TopMenu extends Component {
    render() {
        return (
            <TopBar
                logOut={() => {}}
                user={this.props.auth}
                routes={this.props.routes}
                location={this.props.location}
                leftComp={
                    <fb className="row" style={{ paddingLeft: '2rem' }}>
                        <IconButton
                            large
                            color="white"
                            name="burger"
                        />
                        <Title title="Reservo"/>
                    </fb>
                }
            />
        );
    }
}
