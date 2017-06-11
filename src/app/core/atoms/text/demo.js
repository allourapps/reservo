import React from 'react';
import Txt from 'atoms/text';
import Panel from 'molecules/panel';


const Demo = () => (
    <fb className="marginTop marginBottom">
        <Panel title="Default Text" className="marginBottom">
            <Txt>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Txt>
        </Panel>
        <Panel title="Primary Text" className="marginBottom">
            <Txt color="primary">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Txt>
        </Panel>
        <Panel title="Secondary Large Text" className="marginBottom">
            <Txt large color="secondary">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Txt>
        </Panel>
        <Panel title="Alert xLarge Text" className="marginBottom">
            <Txt xlarge color="alert">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Txt>
        </Panel>
        <Panel title="Warning Text" className="marginBottom">
            <Txt color="warning">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Txt>
        </Panel>
        <Panel title="Success Small Text" className="marginBottom">
            <Txt small color="success">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Txt>
        </Panel>
        <Panel title="Soft Text" className="marginBottom">
            <Txt soft>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</Txt>
        </Panel>
        <Panel title="Hard Text" className="marginBottom">
            <Txt hard>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</Txt>
        </Panel>
        <Panel title="Headline Text" className="marginBottom">
            <Txt headline>Lorem ipsum</Txt>
        </Panel>
    </fb>
);


export { Demo };
