// @flow
import React, { PureComponent } from 'react';
import Toast from 'molecules/toasts/';

type IToastProps = {
    type: string,
    open: boolean,
    icon: boolean,
    message: string,
    duration: number,
    removable: boolean,
};

export default class ToastComponent extends PureComponent<*, IToastProps, *> {
    __showToastMessage() {
        const { type = 'error', message = '', removable = false, duration = 1000, icon = false } = this.props;
        this.message = Toast[type]({ removable, message, duration, icon });
    }

    componentWillUnmount() {
        this.message && this.message.remove();
    }

    render() {

        return (
            <span>
               { this.__showToastMessage()}
           </span>
        );
    }
}
