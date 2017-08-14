/* @flow */

/**
*   Collapsable atom
*   @module atoms/collapsable
*   @version v1.0.1
*/
import React from 'react';
import Collapse from 'react-collapse';
import _ from 'lodash';

type ICollapsableProps = {
    withAnimation?: boolean,
    isOpened?: boolean,
    open?: boolean
}

/**
*   Represents react-collapse element
*   @const Collapsable
*   @param {Object} props - props
*   @returns {HTMLElement} <Collapse>
*/
const Collapsable = (props: ICollapsableProps) => {
    const cleanedProps = _.omit(props, [ 'withAnimation', 'isOpened', 'open' ]);

    if (!props.withAnimation) {
        return props.open ? <div {...cleanedProps} /> : <div {..._.omit(cleanedProps, [ 'children' ])} />;
    }

    return <Collapse isOpened={props.open} {...cleanedProps} />;
};

Collapsable.defaultProps = {
    withAnimation: true,
};

export default Collapsable;
