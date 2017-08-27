import React, { PureComponent } from 'react';

import SubMenu from './sub-menu';
import Table from './table';

import { rooms } from 'mockData/Rooms';

export default class Board extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedRoom: rooms[0]
        };
    }

    onChange = (obj) => this.setState({ selectedRoom: obj });

    render() {
        return (
            <fb>
                <SubMenu onChange={this.onChange} rooms={rooms}/>
                <Table room={this.state.selectedRoom} />
            </fb>
        );
    }
}
