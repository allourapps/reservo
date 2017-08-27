import React, { PureComponent } from 'react';
import Paper from 'material-ui/Paper';
import _ from 'lodash';

export default class PaperAtom extends PureComponent {
    constructor(props) {
        super(props);

        this.styles = {
            padding: '1rem',
            display: 'flex',
            overflow: 'scroll',
            flexGrow: 1
        };
    }
    render() {
        return (
            <fb style={{ margin: '2rem', overflow: 'hidden' }}>
                <fb style={{ overflow: 'hidden' }}>
                    <Paper className="noGrow" style={{ ...this.styles, ...this.props.style }} {..._.omit(this.props, [ 'style' ])} />
                </fb>
            </fb>
        );
    }
}
