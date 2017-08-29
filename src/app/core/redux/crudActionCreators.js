/* @flow */
import type { Dispatch } from 'redux';
import Toast from 'molecules/toasts';
import _ from 'lodash';
import {
    FETCH_STATUS,
    requestPrefix,
    receivePrefix,
    // failReceivePrefix,
    resetPrefix,
    deletePrefix,
    addPrefix,
    updatePrefix,
    successfulAdd,
    failReceive,
    defaultPayloadPreprocesser,
} from './index';
// import type { IAction } from './index';


type IActionTypeOption = {
    suffix: string,
    forceReset?: boolean,
    IDs?: [string | number],
}

type IApiCallApplyerOptions = {
    dispatch: Dispatch<*>,
    actionTypeOptions: IActionTypeOption[],
    apiCall: any,
    apiCallArgs?: any[],
    beforeApiCallCallback?: any,
    receiveCallback: (p: any) => any,
}

type ICreateCrudActionCreatorBaseProps = {
    apiCall: () => Promise<*>,
    apiCallArgs?: [any],
}

export const handleApiActionCreatorError = (e: IServiceResult1) => {
    Toast.error({
        removable: true,
        icon: true,
        position: 'top-right',
        duration: 9000,
        message: e.ResultMessage
    });
};

export const apiCallApplyer = (options: IApiCallApplyerOptions) => {
    const { /** dispatch, actionTypeOptions, */ apiCall, apiCallArgs = [], beforeApiCallCallback, receiveCallback } = options;
    // let timer;
    // let tryCounter = 0;
    const r = () => {
        if (beforeApiCallCallback) {
            beforeApiCallCallback();
        }
        const isSingleCall = !_.isArray(apiCall);
        const apiCallWithArgs = isSingleCall
            ? apiCall.apply(this, apiCallArgs)
            : apiCall.map((singleCall, i) => singleCall.apply(this, apiCallArgs[i]));

        return Promise.all(isSingleCall ? [ apiCallWithArgs ] : apiCallWithArgs).then((responses) => {
            if (isSingleCall) {
                if (responses[0] && !responses[0].Success) {
                    handleApiActionCreatorError(responses[0]);
                    return;
                } else {
                    responses.forEach(response => {
                        if (!response.Success) {
                            handleApiActionCreatorError(response);
                            return;
                        }
                    });
                }
            }
            receiveCallback(isSingleCall ? (responses[0].Result || responses[0]) : responses.map(response => response.Result || response));
            return isSingleCall ? responses[0] : responses;
        }, e => {
            Toast.error({
                removable: true,
                icon: true,
                position: 'bottom-right',
                duration: 9000,
                message: e
            });
            // disabling the reset for now because this can cause an endless loop of re-renderings if you do the fetch call in componentWillMount
            // actionTypeOptions.forEach(a => dispatch({
            //     type: failReceivePrefix + a.suffix,
            //     ...(_.omit(a, [ 'forceReset', 'suffix' ])),
            // }));
            // if (!timer || tryCounter > 5) {
            //     tryCounter++;
            //     timer = setTimeout(() => r(), 5000);
            // }
        });
    };
    return r();
};

export type ICreateGetActionCreatorProps = ICreateCrudActionCreatorBaseProps & {
    suffix: string,
    IDs: Array<string | number>,
    getStoreItem: (s: Object) => Object,
    forceApiCall: boolean,
    // you will have to set deepStore as true, when the single storeItem is nested in a dictionary by the ID
    deepStore?: boolean,
    payloadPreprocesser: (payload: *, currentState: Object) => any,
}

export const createGetActionCreator = (props: ICreateGetActionCreatorProps) => {
    const { suffix, IDs, getStoreItem, forceApiCall, payloadPreprocesser = defaultPayloadPreprocesser, deepStore } = props;
    return (preventSilent: boolean = false) => (dispatch: Dispatch<*>, getState: () => Object) => {
        let silent = false;
        let storeItem = getStoreItem(getState());
        if (deepStore && !_.isEmpty(IDs)) {
            IDs.some((id) => {
                storeItem = storeItem[id];
                return storeItem === undefined;
            });
        }
        if (storeItem && !forceApiCall) {
            if (storeItem.status == FETCH_STATUS.inProgress) {
                return new Promise(() => true);
            }

            if (!forceApiCall && storeItem.status == FETCH_STATUS.success && !preventSilent) {
                silent = true;
            }
        }

        return apiCallApplyer({
            ...props,
            actionTypeOptions: [{ suffix, IDs }],
            dispatch,
            beforeApiCallCallback: () => dispatch({ type: requestPrefix + suffix, IDs, silent }),
            receiveCallback: (p) => {
                dispatch({ type: receivePrefix + suffix, payload: payloadPreprocesser(typeof p.Result !== 'undefined' ? p.Result : p, getState()), IDs });
            },
        });
    };
};

type ICreateAddActionCreatorProps = ICreateCrudActionCreatorBaseProps & {
    actionTypeOptions: IActionTypeOption[],
    newIDKey?: string,
    newIDValue?: string,
    alternativeResponse?: any,
}

type Payload<T> = {
    ErrorCode: string,
    InputError: boolean,
    ResultMessage: string,
    Success: boolean,
    Result: T,
};

const handleNotifications = <T>(dispatch, payload: Payload<T>) => {
    const { InputError, ResultMessage, Success } = payload;

    if (!InputError && !Success && ResultMessage) {
        dispatch({ type: failReceive, payload: ResultMessage });
    }
};

export const createAddActionCreator = (props: ICreateAddActionCreatorProps) => {
    const { actionTypeOptions, newIDKey = 'Guid', newIDValue, alternativeResponse } = props;
    return () => (dispatch: Dispatch<*>) => {
        return apiCallApplyer({
            ...props,
            dispatch,
            receiveCallback: (p) => {
                console.log('receiveCallback', p);
                actionTypeOptions.forEach(aT => dispatch({
                    type: aT.forceReset ? resetPrefix + aT.suffix : addPrefix + aT.suffix,
                    IDs: aT.forceReset ? aT.IDs || [] : [ ...(aT.IDs || []), newIDValue ? newIDValue : p[newIDKey] ],
                    payload: alternativeResponse || p,
                    inputError: p.InputError,
                    message: p.ResultMessage,
                }));

                const { Success } = p;

                if (Success) {
                    dispatch({ type: successfulAdd, payload: p });
                }

                handleNotifications(dispatch, p);
            },
        });
    };
};

type ICreateUpdateActionCreatorProps = ICreateCrudActionCreatorBaseProps & {
    actionTypeOptions: IActionTypeOption[],
    idKey?: string,
    alternativeResponse?: any,
    payloadPreprocesser: (payload: *, currentState: Object) => any,
}

export const createUpdateActionCreator = (props: ICreateUpdateActionCreatorProps) => {
    const { actionTypeOptions, idKey = 'Guid', alternativeResponse, payloadPreprocesser = defaultPayloadPreprocesser } = props;
    return () => (dispatch: Dispatch<*>, getState: () => Object) => {
        if (!props.apiCall) {
            actionTypeOptions.forEach(aT => dispatch({
                type: aT.forceReset ? resetPrefix + aT.suffix : updatePrefix + aT.suffix,
                IDs: aT.IDs,
                payload: alternativeResponse,
                idKey
            }));
            return new Promise(() => true);
        } else {
            return apiCallApplyer({
                ...props,
                dispatch,
                receiveCallback: (p) => {
                    actionTypeOptions.forEach(aT => dispatch({
                        type: aT.forceReset ? resetPrefix + aT.suffix : updatePrefix + aT.suffix,
                        IDs: aT.IDs,
                        inputError: p.InputError,
                        message: p.ResultMessage,
                        payload: alternativeResponse || (payloadPreprocesser ? payloadPreprocesser(p.Result || p, getState()) : p),
                        idKey
                    }));

                    handleNotifications(dispatch, p);
                },
            });
        }
    };
};

type ICreateDeleteActionCreatorProps = ICreateCrudActionCreatorBaseProps & {
    actionTypeOptions: IActionTypeOption[],
    idKey?: string,
    idValue?: string,
}

export const createDeleteActionCreator = (props: ICreateDeleteActionCreatorProps) => {
    const { actionTypeOptions, idKey = 'Guid', idValue } = props;
    return () => (dispatch: Dispatch<*>) => {
        return apiCallApplyer({
            ...props,
            dispatch,
            receiveCallback: (p) => {

                actionTypeOptions.forEach(aT => dispatch({
                    type: aT.forceReset ? resetPrefix + aT.suffix : deletePrefix + aT.suffix,
                    IDs: aT.IDs,
                    inputError: p.InputError,
                    message: p.ResultMessage,
                    idValue: idValue || aT.IDs[0],
                    idKey,
                }));

                handleNotifications(dispatch, p);
            },
        });
    };
};


type ICreateFetchAndResetActionCreatorProps = ICreateCrudActionCreatorBaseProps & {
    actionTypeOptions: IActionTypeOption[],
};

export const createFetchAndResetActionCreator = (props: ICreateFetchAndResetActionCreatorProps) => {
    const { actionTypeOptions } = props;
    return () => (dispatch: Dispatch<*>) => {
        return apiCallApplyer({
            ...props,
            dispatch,
            receiveCallback: () => actionTypeOptions.forEach(aT => dispatch({
                type: resetPrefix + aT.suffix,
            })),
        });
    };
};
