import React, { PureComponent } from 'react';

import Paper from 'atoms/paper';
import SingleTable from './table';

import { tables } from 'mockData/tables';

export default class Table extends PureComponent {
    render() {
        const { room } = this.props;
        return (
            <fb className="overflowHidden">
                <Paper
                    zDepth={1}
                >
                    <div
                        style={{
                            overflow: 'hidden',
                            position: 'relative',
                            background: 'red',
                            width: room.Size.Width,
                            height: room.Size.Height
                        }}
                    >
                        {
                            tables.map((obj) => <SingleTable key={obj.Guid} table={obj} />)
                        }
                    </div>
                </Paper>
            </fb>
        );
    }
}
