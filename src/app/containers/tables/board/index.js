import React, { Component } from 'react';

import SubMenu from './sub-menu';
import Table from './table';

export default class Board extends Component {
    render() {
        console.log(this.props);
        return (
            <fb>
                <SubMenu/>
                <Table/>
            </fb>
        );
    }
}
