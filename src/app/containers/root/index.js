import React, { Component } from 'react';
import Login from 'containers/root/login';

export default class Root extends Component {
    render() {
        return (
            <fb className="grow aCenter jCenter">
                <Login />
            </fb>
        );
    }
}
