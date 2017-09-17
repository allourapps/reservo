import React from 'react';
import Image from 'atoms/image';
import Panel from 'molecules/panel';

const Demo = () => (
    <fb className="marginTop marginBottom">
        <Panel title="Default Image" className="marginBottom">
            <Image path="http://maritime-connector.com/images/platform-supply-vessel-16-wiki-19075.jpg" alt="vessel" />
        </Panel>
        <Panel title="Round Image" className="marginBottom">
            <Image variant="round" path="https://pbs.twimg.com/profile_images/729890553416982529/lJbccgRf.jpg" alt="avatar" />
        </Panel>
    </fb>
);


export { Demo };
