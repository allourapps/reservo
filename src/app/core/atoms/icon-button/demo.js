import React from 'react';
import IconButton from 'atoms/iconButton';
import Panel from 'molecules/panel';

const containerStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
};

const Demo = () => (
    <Panel title="IconButtons in different sizes" className="marginTop">
      <fb style={containerStyles}>
          <IconButton name="cut" onClick={() => {}} size="xsmall" />
          <IconButton name="cut" onClick={() => {}} size="small" />
          <IconButton name="cut" onClick={() => {}} size="medium" />
          <IconButton name="cut" onClick={() => {}} size="large" />
      </fb>
    </Panel>
);


export { Demo };
