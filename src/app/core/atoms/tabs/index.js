import React, { PureComponent } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import _ from 'lodash';

export default class TabsAtom extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: props.tabs[0],
        };
    }

    componentWillReceiveProps(nextProps) {
        _.isEmpty(this.state.slideIndex) && this.setState({ slideIndex: nextProps.tabs[0] });
    }

    handleChange = (value) => {
        this.setState({ slideIndex: value }, () => this.props.onChange(value));
    };

    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    { this.props.tabs.map(obj => <Tab key={obj.key} label={obj.label} value={obj} />)}
                </Tabs>
            </div>
        );
    }
}