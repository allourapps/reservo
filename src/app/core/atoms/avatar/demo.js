import React from 'react';
import Avatar from 'atoms/avatar';
import Panel from 'molecules/panel';

const Demo = () => (
    <fb className="marginTop marginBottom">
        <Panel title="Avatar for persons" className="marginBottom">
            <Avatar isPerson={true} path="https://pbs.twimg.com/profile_images/729890553416982529/lJbccgRf.jpg" />
        </Panel>
        <Panel title="Avatar for vessels / non-persons" className="marginBottom">
            <Avatar path="http://maritime-connector.com/images/platform-supply-vessel-16-wiki-19075.jpg" />
        </Panel>
        <Panel title="Avatar for vessels / non-persons" className="marginBottom">
            <Avatar text="R" />
        </Panel>
    </fb>
);

export { Demo };
