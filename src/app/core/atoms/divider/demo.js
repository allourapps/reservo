import React from 'react';
import Text from 'atoms/text';
import Panel from 'molecules/panel';
import Divider from 'atoms/divider';


const Demo = () => (
    <fb className="marginTop marginBottom">
        <Panel title="Divider without inset" className="marginBottom">
            <Text>Random text here</Text>
            <Divider />
            <Text>Random text here, too</Text>
        </Panel>
        <Panel title="Divider with default inset">
            <Text>Random text here</Text>
            <Divider inset />
            <Text>Random text here, too</Text>
        </Panel>
        <Panel title="Divider with custom inset" className="marginTop marginBottom">
            <Text>Random text here</Text>
            <Divider inset={{ left: '3rem' }} />
            <Text>Random text here, too</Text>
        </Panel>
    </fb>
);


export { Demo };
