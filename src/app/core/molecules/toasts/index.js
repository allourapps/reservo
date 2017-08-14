/* @flow */

/**
 * Toast organism.
 * This module is singleton, it's return instance of class.
 * @module organisms/toasts
 * @version 1.0.0
 * @author @suren.atoyan
 * @author @levon.azizyan
 */

import './index.scss';

import * as icons from './toast-icons';

/**
 * The Toast class
 */
class Toast {

    __container: { querySelectorAll: (string) => Array<*>, length: number, append: (Object) => {} };

    /**
     * Create a container for toasts and set some classes.
     */
    constructor() {
        const container = this.__generateDivElem();
        this.__removeAdditionalContainers();
        container.className = 'toast-container';
        container.id = 'toasts';
        this.__container = container;
        window.document.body.appendChild(container);
    }

    /**
     * Toast type - alert ::: Simple message box.
     * @param {Object} options - The options for message box content, position and type.
     * @returns {Object} - The object, which can use from outside.
     */
    alert(options: Object): Object {
        const alertOptions = { ...options };
        alertOptions.type = 'alert';
        return this.__showMessage(alertOptions);
    }

    /**
     * Toast type - warnning ::: Message box for warnnings.
     * @param {Object} options - The options for message box content, position and type.
     * NOTE ::: You can also send it to server.
     * @returns {Object} - The object, which can use from outside.
     */
    warn(options: { message: Object }): Object {
        const warnOptions = { ...options };
        warnOptions.type = 'warn';
        console.warn(options.message);
        return this.__showMessage(warnOptions);
    }

    /**
     * Toast type - error ::: Message box for errors.
     * @param {Object} options - The options for message box content, position and type.
     * NOTE ::: You can also send it to server.
     * @returns {Object} - The object, which can use from outside.
     */
    error(options: { message: Object }): Object {
        const errorOptions = { ...options };
        errorOptions.type = 'error';

        if (options && options.message) {
            console.error(options.message);
        }

        return this.__showMessage(errorOptions);
    }

    /**
     * Private method for show message box.
     * @param {Object} options - The options for message box content, position and type (modified from current toast type).
     * @returns {Object} - The object, which can use from outside.
     */
    __showMessage(options: { type: string, message?: Object, duration?: number, removable?: boolean, position?: string, icon?: Object, cancelButton?: boolean }): Object {
        const toast: { className: string, append: (innerToast: Object) => {}, style: { top: string, bottom: string }, remove: () => {} } = this.__generateDivElem();
        const innerToast = this.__generateDivElem();

        const {
            type,
            message,
            duration,
            removable,
            position = 'top-right',
            icon,
            cancelButton
        } = options;

        toast.className += `toast ${type} ${position}`;
        innerToast.innerHTML = message;
        toast.append(innerToast);

        const allocation = this.__getAllocation(position);

        if (position.includes('top')) {
            toast.style.top = allocation;
        } else if (position.includes('bottom')) {
            toast.style.bottom = allocation;
        }

        this.__container.append(toast);

        if (icon) {
            toast.append(this.__generateIcon(type));
        }

        removable && !cancelButton && this.__hideAndTriggerToRemove(toast, duration);

        if (cancelButton) {
            const xButton: { append: (Object) => {}, className: string, addEventListener: (string, Function, boolean) => {}, removeEventListener: (string, Function) => {} } = this.__generateSpanElem();
            const cancelIconLeft = this.__generateSpanElem();
            const cancelIconRight = this.__generateSpanElem();
            xButton.className = 'toast-cancel-button';
            xButton.append(cancelIconLeft);
            xButton.append(cancelIconRight);
            toast.append(xButton);
            this.__setListenerToClose(xButton, toast);
        }

        return {
            remove: this.__curryingForOutSideCall(toast)
        };
    }

    /**
     * Private method ::: It's implementation of design pattern currying, which can encapsulate toast and let use it after.
     * @param {Object} toast - The message box
     * @returns {Function} - The function, which can remove toast.
     */
    __curryingForOutSideCall(toast: Object) {
        return () => {
            this.__hideAndTriggerToRemove(toast);
        };
    }

    /**
     * Private method for hide message box, after that trigger to remove.
     * @param {Object} toast - The message box
     * @param {number} duration - duration (ms)
     * @returns {undefined}
     */
    __hideAndTriggerToRemove(toast: { className: string, remove: () => {} }, duration?: number): void {
        setTimeout(() => {
            toast.className += ' hide';
            this.__removeMessage(toast);
        }, duration ? duration - 300 : 0);
    }

    /**
     * Private method for setting event listener on close button.
     * @param {Object} xButton - The cancel button
     * @param {Object} toast - The message box
     * @returns {undefined}
     */
    __setListenerToClose(xButton: { addEventListener: (string, Function, boolean) => {}, removeEventListener: (string, Function) => {} }, toast: Object): void {
        const listener = () => {
            this.__hideAndTriggerToRemove(toast);
        };
        xButton.addEventListener('click', listener, true);
        this.__removeListenerToClose(xButton, listener);
    }

    __generateIcon(type: string) {
        const iconBox: { innerHTML: string, className: string } = this.__generateSpanElem();
        iconBox.className = 'toast-icon';
        iconBox.innerHTML = icons[type];
        return iconBox;
    }

    /**
     * Private method for remove event listener on close button.
     * @param {Object} xButton - The cancel button
     * @param {Function} listener - The function wich shoild be removed from elem.
     * @returns {undefined}
     */
    __removeListenerToClose(xButton: { removeEventListener: (string, Function) => {} }, listener: Function): void {
        xButton.removeEventListener('click', listener);
    }

    /**
     * Private method for gererate div element.
     * @returns {Object} - DIV element
     */
    __generateDivElem(): Object {
        return document.createElement('div');
    }

    /**
     * Private method for gererate span element.
     * @returns {Object} - SPAN element
     */
    __generateSpanElem(): Object {
        return document.createElement('span');
    }

    /**
     * Private method for remove message box.
     * @param {Object} elem - The elem which shold be removed.
     * @returns {undefined}
     */
    __removeMessage(elem: { remove: () => {} }): void {
        setTimeout(() => elem.remove(), 300);
    }

    /**
     * Private method for getting message box allocation.
     * @param {string} position - The message box - ex. top-left
     * @returns {string} allocation - The message box allocation.
     */
    __getAllocation(position: string): string {
        const result: Array<*> = this.__container.querySelectorAll(`.${position}`);
        const allocation = result.length * 50;
        return allocation ? `${allocation + 10}px` : '10px';
    }

    /**
     * Remove additional containers with toasts di.
     * NOTE: When we use react-hot-loader the constructor can be called many times
     * @returns {undefined}
     */
    __removeAdditionalContainers(): void {
        const toasts: { remove: () => {} } = window.toasts;
        toasts && toasts.remove && toasts.remove();
    }
}

export default new Toast();
