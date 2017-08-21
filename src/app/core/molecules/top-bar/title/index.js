/* @flow */

/**
*   Title of top bar
*   @module molecules/top-bar/title
*   @version v1.0.1
*/
import React from 'react';
import colors from 'atoms/colors';
import Icon from 'atoms/icon';
import Text from 'atoms/text';


const defaultStyle = { paddingLeft: '17px', margin: 'auto 0' };

const iconStyle = { color: colors.white, width: '3.3rem', height: '3.3rem', marginBottom: '-1.5rem' };
const padding = { paddingLeft: '0.4rem' };

type ITitleProps = {
    title: string,
    style: Object
}

/**
*   Represents top bar title
*   @const Title
*   @returns {HTMLElement} <fb>
*/
const Title = ({ title, style }: ITitleProps) => {
    const customStyle = { ...defaultStyle, style };

    return (
        <fb style={customStyle} className="row noShrink aCenter jStart">
            <fb className="noShrink noGrow" style={padding}>
                <Text fontSize="1.6rem" color="white" fontWeight={300}>{title}</Text>
            </fb>
        </fb>
    );
};

export { Title };
