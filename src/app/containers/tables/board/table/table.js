import React, { PureComponent } from 'react';

import './styles.scss';

export default class SingleTable extends PureComponent {
    render() {
        const { table } = this.props;
        console.log(this.props);
        return (
            <fb
                style={{
                    width: table.Size.Width,
                    height: table.Size.Height,
                    top: table.Position.PositionY,
                    left: table.Position.PositionX,
                }}
                className="single-table"
            >
                yay
            </fb>
        );
    }
}
