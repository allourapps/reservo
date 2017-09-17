import React from 'react';
import Flyout from 'atoms/flyout';
import Panel from 'molecules/panel';


import RaisedButton from 'material-ui/RaisedButton';

class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    openPopover = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const combinations = [ [ 'up', 'white' ] ];

        return (
            <fb className="marginTop marginBottom">
                <Panel title="The handler can be any element" className="marginBottom">
                    <div>
                        <RaisedButton
                            onClick={this.openPopover}
                            label="Button"
                        />
                    </div>
                </Panel>

                {combinations.map(x =>
                    <Flyout
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
                        direction={x[0]}
                        offset={{ top: -40, left: 0 }}
                        // eslint-disable-next-line no-undefined
                        triangleProps={{ color: x[1], direction: x[2] ? x[2] : x[0] }}
                        onRequestClose={this.handleRequestClose} >
                        <div style={{ padding: 10 }}>
                            <div>It can be any element or group of elements here.</div>
                            <div>It can be any element or group of elements here.</div>
                            <div>It can be any element or group of elements here.</div>
                            <div>It can be any element or group of elements here.</div>
                        </div>
                    </Flyout>
                )}
            </fb>
        );
    }
}

export { Demo };
