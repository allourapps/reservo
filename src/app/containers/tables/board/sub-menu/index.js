import React, { PureComponent } from 'react';

import Tabs from 'atoms/tabs';

export default class SubMenu extends PureComponent {
    render() {
        return (
            <fb className="noGrow">
                <Tabs
                    tabs={this.props.rooms.map(obj => ({
                        ...obj,
                        label: obj.Name,
                        value: obj.Guid,
                        key: obj.Guid,
                    }))}
                    onChange={this.props.onChange}
                />
            </fb>
        );
    }
}
