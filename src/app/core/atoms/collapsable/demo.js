import React from 'react';
import Collapsable from 'atoms/collapsable';
import Button from 'atoms/button';
import Panel from 'molecules/panel';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, open2: false };
    }

    triggerToggle = () => this.setState({ open: !this.state.open });
    triggerToggle2 = () => this.setState({ open2: !this.state.open2 });

    render() {
        return (<fb className="marginTop marginBottom">
            <Panel title="With animation">
                <Button onClick={this.triggerToggle} label="Trigger collapse" primary={!this.state.open} secondary={this.state.open}/>
                <Collapsable open={this.state.open}>
                    <fb>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    </fb>
                </Collapsable>
            </Panel>
            <Panel title="Without animation" className="marginTop">

                <Button onClick={this.triggerToggle2} label="Trigger collapse" primary={!this.state.open2} secondary={this.state.open2}/>
                <Collapsable open={this.state.open2} withAnimation={false}>
                    <fb>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    </fb>
                </Collapsable>
            </Panel>
        </fb>);
    }
}

export { Demo };
