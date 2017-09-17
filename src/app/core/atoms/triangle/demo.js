import React from 'react';

import Triangle from 'atoms/triangle';

const sharedStyle = {
    border: '1px solid black',
    padding: '1.5rem',
    marginRight: '1rem'
};

const Demo = () => (
    <fb className="marginTop marginBottom" style={{ flexDirection: 'row' }}>
        <span style={sharedStyle}>
            <Triangle direction="up" width={50} height={50} />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="up" width={50} height={50} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="down" width={50} height={50} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="right" width={50} height={50} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="left" width={50} height={50} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="up-right" width={50} height={50} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="up-left" width={50} height={50} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="down-right" width={50} height={50} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="down-left" width={50} height={50} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="up" width={40} height={20} ratio={1.2} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="up" width={40} height={20} ratio={2.0} tag="div" />
        </span>

        <span style={sharedStyle}>
            <Triangle direction="down" width={50} height={50} ratio={1.5} color="red" tag="div" />
        </span>
    </fb>
);

export { Demo };
