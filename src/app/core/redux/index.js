/* @flow */

import type { Dispatch } from 'redux';
import _ from 'lodash';
import React from 'react';
import type ICreateGetActionCreatorProps from './crudActionCreators';
import { createGetReducer, createDynamicReducer, createDynamicGetReducer } from './reducers';
import {
    createUpdateActionCreator,
    createAddActionCreator,
    createDeleteActionCreator,
    createGetActionCreator,
    createFetchAndResetActionCreator
} from './crudActionCreators';

import { createUISetReducer, createUiReducer, createUiActionCreator } from './uiActionCreators';

export const makeActionCreator = (type: string, ...argNames) => (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index];
    });
    return action;
};

export const FETCH_STATUS = {
    none: 0,
    inProgress: 1,
    success: 2,
    fail: 3
};

export const getCombinedFetchStatus = (statuses) => {
    let combinedStatus = FETCH_STATUS.none;
    for (let i = 0; i < statuses.length; i++) {
        if (statuses[i] === FETCH_STATUS.fail) {
            combinedStatus = FETCH_STATUS.fail;
            break;
        } else if (statuses[i] === FETCH_STATUS.inProgress) {
            combinedStatus = FETCH_STATUS.inProgress;
        }
    }
    let allStatusesAreSuccessful = true;
    statuses.forEach(s => {
        if (s !== FETCH_STATUS.success) {
            allStatusesAreSuccessful = false;
        }
    });
    if (allStatusesAreSuccessful) {
        combinedStatus = FETCH_STATUS.success;
    }

    return combinedStatus;
};

export const setPrefix = 'SET_';
export const requestPrefix = 'REQUEST_';
export const receivePrefix = 'RECEIVE_';
export const failReceivePrefix = 'FAIL_RECEIVE_';
export const resetPrefix = 'RESET_';
export const deletePrefix = 'DELETE_';
export const addPrefix = 'ADD_';
export const updatePrefix = 'UPDATE_';
export const successfulAdd = 'SUCCESSFUL_ADD';
export const failReceive = 'FAIL_RECEIVE';

export const defaultPayloadPreprocesser = (p) => p;

type ICreateOptimisticSetActionCreatorProps = ICreateGetActionCreatorProps & {
    getExpectedPayload: (payload: any) => any
}

export const createOptimisticSetActionCreator = (props: ICreateOptimisticSetActionCreatorProps): void => {
    const { suffix, getStoreItem, getExpectedPayload, apiCall, apiCallArgs } = props;
    return () => (dispatch: Dispatch<*>, getState: () => any) => {
        const currentStoreItem = getStoreItem(getState());

        if (!currentStoreItem || (currentStoreItem.status == FETCH_STATUS.inProgress)) {
            return;
        }

        const setAction = makeActionCreator(setPrefix + suffix, 'payload');

        let timer;
        let tryCounter = 0;
        const excpectedSetPayload = getExpectedPayload(currentStoreItem.payload);
        dispatch(setAction(excpectedSetPayload));
        const r = () => {
            return apiCall.apply(this, apiCallArgs).then(() => {
                if (tryCounter > 0) {
                    dispatch(setAction(excpectedSetPayload));
                }
            }, e => {
                console.error(e);
                dispatch(setAction(currentStoreItem.payload));
                if (!timer || tryCounter > 5) {
                    tryCounter++;
                    timer = setTimeout(() => r(), 5000);
                }
            });
        };
        r();
    };
};

export const needsToFetch = (item: IFetchData<any> | number): boolean => {
    if (typeof item === 'undefined') {
        return true;
    }
    const itemToCheck = typeof item.status === 'number' ? item.status : item;
    return itemToCheck === FETCH_STATUS.none || itemToCheck === FETCH_STATUS.inProgress;
};

type ICreateExportActionCreatorProps = {
    apiCall: () => Promise<T>,
    apiCallArgs?: [any]
}

export const createExportActionCreator = (props: ICreateExportActionCreatorProps): void => {
    const { apiCall, apiCallArgs } = props;
    return () => apiCall.apply(this, apiCallArgs);
};

export const mapToNestedFetchResponse = (response: Array<T>, currentState: Object = {}, idKey: string = 'Guid') => {
    return _.mapValues(
        _.keyBy(response, (o) => o[idKey]),
        (o) => ({ status: FETCH_STATUS.success, payload: o })
    );
};

export const createCRUD = (description) => {
    const { suffix, title, methods, getStoreItem, listSuffix } = description;
    const { Get, Create, Delete, Update, GetList } = methods;

    return {
        [`fetch${title}s`]: createGetActionCreator({
            suffix: listSuffix,
            getStoreItem: (s) => getStoreItem(s),
            apiCall: GetList,
        }),
        [`${title.toLowerCase()}sReducer`]: createGetReducer(listSuffix),
        [`fetch${title}`]: (guid: string) => createGetActionCreator({
            suffix,
            getStoreItem: (s) => getStoreItem(s, guid),
            IDs: [ guid ],
            apiCall: Get,
            apiCallArgs: [ guid ],
        })(),
        [`create${title}`]: (entity) => createAddActionCreator({
            actionTypeOptions: [{ suffix }, { suffix: listSuffix }],
            newIDKey: 'Guid',
            apiCall: Create,
            apiCallArgs: [ entity ],
        })(),
        [`update${title}`]: (entity) => createUpdateActionCreator({
            actionTypeOptions: [{ suffix, IDs: [ entity.Guid ]}, { suffix: listSuffix }],
            apiCall: Update,
            apiCallArgs: [ entity.Guid, entity ],
        })(),
        [`delete${title}`]: (guid: string) => createDeleteActionCreator({
            actionTypeOptions: [{ suffix, IDs: [ guid ]}, { suffix: listSuffix }],
            apiCall: Delete,
            idKey: 'Guid',
            idValue: guid,
            apiCallArgs: [ guid ],
        })(),
        [`single${title}Reducer`]: createDynamicGetReducer(suffix),
    };
};

export const extendBy = (firstArray, seondArray, firstItemIDKey, secondItemIDKey, newPropName) => {
    return _.map(firstArray, (item) => ({
        ...item,
        [newPropName]: seondArray.find(sI => sI[secondItemIDKey] == item[firstItemIDKey])
    }));
};

class PureAsyncComponent<DefaultProps, Props, State> extends React.PureComponent<DefaultProps, Props, State> {
    fetch: () => any;
    needsToFetch: (oldProps: any) => boolean;

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(oldProps) {
        if (this.needsToFetch(oldProps)) {
            this.fetch();
        }
    }
}


export {
    createGetReducer,
    createDynamicReducer,
    createDynamicGetReducer,
    createUpdateActionCreator,
    createAddActionCreator,
    createDeleteActionCreator,
    createGetActionCreator,
    createUISetReducer,
    createUiReducer,
    createUiActionCreator,
    createFetchAndResetActionCreator,
    PureAsyncComponent
};
