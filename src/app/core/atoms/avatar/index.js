/* @flow */

/** Avatar atom
*   @module atoms/avatar
*   @version v1.0.1
*/
import React, { PureComponent } from 'react';
import _ from 'lodash';

import Image from 'atoms/image';
import colors from 'atoms/colors';
import Text from 'atoms/text';

export type IAvatarProps = {
    path?: string,
    text?: string,
    style?: Object,
    className?: string,
    isPerson?: boolean,
    textStyle?: Object,
    textAvatarStyle?: Object,
    customSizes?: {width: number | string, height: number | string},
    onUnmount?: () => {}
}

/** Avatar for persons or vessels
*   @class Avatar
*   @extends React.PureComponent
*/
export default class Avatar extends PureComponent<*, IAvatarProps, *> {
    componentWillUnmount() {
        this.props.onUnmount && this.props.onUnmount();
    }

    render() {
        const {
            className = '',
            customSizes,
            isPerson = false,
            path,
            style,
            text,
            textAvatarStyle,
            textStyle,
            tooltip = '',
        } = this.props;

        const cleanedProps = _.omit(this.props, [
            'path',
            'className',
            'isPerson',
            'text',
            'textStyle',
            'textAvatarStyle',
            'onUnmount',
            'ext',
            'style',
            'customSizes',
            'tooltip'
        ]);

        const variant = isPerson ? 'round' : 'rounded';
        const width = customSizes && customSizes.width || '3rem';
        const height = customSizes && customSizes.height || '3rem';
        const customStyle = {
            width,
            height,
        };

        return (!path && text) ? (
            <fb
                {...cleanedProps}
                className={`avatar aCenter noGrow jCenter ${className}`}
                style={{
                    background: colors.softTextColor,
                    borderRadius: isPerson ? 50 : 0,
                    ...customStyle,
                    ...style,
                    ...textAvatarStyle,
                }}
            >
                <Text
                    title={tooltip}
                    large style={textStyle}
                    color={colors.altColor}>{text}
                </Text>
            </fb>
        ) : (
            <Image
                path={path}
                alt={tooltip}
                style={{
                    backgroundPosition: 'top center',
                    ...customStyle,
                    ...style,
                }}
                {...cleanedProps}
                variant={variant}
                className={`avatar ${className}`}
                customSizes={{ width, height }}
            />
        );
    }
}
