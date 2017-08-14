/* @flow */

import _ from 'lodash';
import {
    FETCH_STATUS,
    requestPrefix,
    receivePrefix,
    failReceivePrefix,
    resetPrefix,
    setPrefix,
    updatePrefix,
    addPrefix,
    deletePrefix,
} from './index';

const defaultPayloadPreprocesser = (x) => x;

const getActionTypeWithoutPrefix = (actionType: string) => {
    return actionType.substring((actionType.indexOf('_') + 1), actionType.length);
};

export type IAction = {
    type: string;
    IDs: Array<string | number | {[key: string]: string | number}>;
    error?: any;
    payload: any;
    idKey: string;
    idValue: string;
}

export const createGetReducer = (actionTypeSuffix: string, payloadPreprocesser = defaultPayloadPreprocesser, defaultPayload = []) => (state = {
    status: FETCH_STATUS.none,
    payload: defaultPayload
}, action: IAction) => {
    switch (action.type) {
        case (requestPrefix + actionTypeSuffix):
            if (action.silent) {
                return state;
            }
            return { ...state, status: FETCH_STATUS.inProgress };
        case (receivePrefix + actionTypeSuffix):
            return { ...state, payload: payloadPreprocesser(action.payload), status: FETCH_STATUS.success };
        case (failReceivePrefix + actionTypeSuffix):
            return { ...state, status: FETCH_STATUS.fail, error: action.error };
        case (resetPrefix + actionTypeSuffix):
            return { payload: defaultPayload, status: FETCH_STATUS.none };
        case (setPrefix + actionTypeSuffix):
            return { ...state, payload: action.payload };
        case (addPrefix + actionTypeSuffix):
            return { ...state, payload: [ ...state.payload, action.payload ], status: FETCH_STATUS.success };
        case (updatePrefix + actionTypeSuffix):
            return {
                ...state,
                payload: [ ...(_.remove(state.payload, i => i[action.idKey] !== action.payload[action.idKey])), action.payload ]
            };
        case (deletePrefix + actionTypeSuffix):
            return { ...state, payload: _.remove(state.payload, i => i[action.idKey] !== action.idValue) };
        default:
            return state;
    }
};


export const createDynamicReducer = (suffix: string, payloadPreprocesser = defaultPayloadPreprocesser) => (mainState: any = {}, mainAction: IAction) => {
    if (_.startsWith(getActionTypeWithoutPrefix(mainAction.type), suffix)) {
        const reducer = (state: any = {}, action: IAction, nestingLevel: number = 0) => {
            let currentPath;
            if (action.IDs && action.IDs.length) {
                currentPath = action.IDs[nestingLevel];
                if ((nestingLevel < action.IDs.length - 1)) {
                    if (typeof currentPath === 'object') {
                        if (!_.isArray(state)) {
                            console.error(`IDs's item ${JSON.stringify(currentPath)} is wrong. currentPath is not Array. use string key as IDs's item.`);
                        }
                        const key = _.keys(currentPath)[0];
                        return _.map(state, (item) => {
                            if (item[key] === currentPath[key]) {
                                return reducer(item, action, (nestingLevel + 1));
                            } else {
                                return item;
                            }
                        });
                    } else {
                        return {
                            ...state,
                            [currentPath]: reducer(state[currentPath], action, (nestingLevel + 1))
                        };
                    }
                }
            }
            switch (action.type) {
                case (requestPrefix + suffix):
                    if (action.silent) {
                        return state;
                    }
                    if (currentPath !== undefined) {
                        return {
                            ...state,
                            [currentPath]: { ...(state[currentPath] || {}), status: FETCH_STATUS.inProgress }
                        };
                    } else {
                        return { ...state, status: FETCH_STATUS.inProgress };
                    }
                case (receivePrefix + suffix):
                    if (currentPath !== undefined) {
                        return {
                            ...state,
                            [currentPath]: { status: FETCH_STATUS.success, payload: payloadPreprocesser(action.payload) }
                        };
                    } else {
                        return { status: FETCH_STATUS.success, payload: payloadPreprocesser(action.payload) };
                    }
                case (failReceivePrefix + suffix):
                    if (currentPath !== undefined) {
                        return {
                            ...state,
                            [currentPath]: { status: FETCH_STATUS.fail, error: action.error }
                        };
                    } else {
                        return { ...state, status: FETCH_STATUS.fail, error: action.error };
                    }
                case (addPrefix + suffix):
                    if (_.isArray(state)) {
                        return [ ...state, payloadPreprocesser(action.payload) ];
                    } else {
                        return {
                            ...state,
                            [currentPath]: payloadPreprocesser(action.payload)
                        };
                    }
                case (updatePrefix + suffix):
                    if (typeof currentPath === 'object') {
                        if (!_.isArray(state)) {
                            console.error(`IDs's item ${JSON.stringify(currentPath)} is wrong. currentPath is not Array. use string key as IDs's item.`);
                        }
                        const key = _.keys(currentPath)[0];
                        return _.map(state, (item) => {
                            if (item[key] === currentPath[key]) {
                                return payloadPreprocesser(action.payload);
                            } else {
                                return item;
                            }
                        });
                    } else {
                        return {
                            ...state,
                            [currentPath]: payloadPreprocesser(action.payload)
                        };
                    }
                case (deletePrefix + suffix):
                    if (typeof currentPath === 'object') {
                        if (!_.isArray(state)) {
                            console.error(`IDs's item ${JSON.stringify(currentPath)} is wrong. currentPath is not Array. use string key as IDs's item.`);
                        }
                        const key = _.keys(currentPath)[0];
                        return _.filter(state, (item) => item[key] !== currentPath[key]);
                    } else {
                        return _.omit(state, [ String(currentPath) ]);
                    }
                default: return state;
            }
        };

        const { IDs = []} = mainAction;

        let payloadNeeded: boolean;
        if (
            mainAction.type === requestPrefix + suffix ||
            mainAction.type === receivePrefix + suffix ||
            mainAction.type === failReceivePrefix + suffix
        ) {
            payloadNeeded = false;
        } else {
            payloadNeeded = !!mainState.payload;
        }

        return reducer(
            mainState,
            payloadNeeded ? { ...mainAction, IDs: [ 'payload', ...IDs ]} : mainAction,
            0
        );
    } else {
        return mainState;
    }
};


export const createDynamicGetReducer = (suffix: string, payloadPreprocesser: any = defaultPayloadPreprocesser) => {
    return (mainState: any = {}, mainAction: IAction) => {
        if (_.startsWith(getActionTypeWithoutPrefix(mainAction.type), suffix)) {
            const reducer = (state: any = {}, action: IAction, nestingLevel: number = 0) => {
                const ID = action.IDs[nestingLevel];
                if ((nestingLevel < action.IDs.length - 1)) {
                    return {
                        ...state,
                        [ID]: { ...state[ID], payload: state[ID] ? reducer(state[ID].payload, action, (nestingLevel + 1)) : action.payload },
                    };
                } else {
                    switch (action.type) {
                        case (requestPrefix + suffix):
                            if (action.silent) {
                                return state;
                            }
                            return {
                                ...state,
                                [ID]: { ...(state[ID] || {}), status: FETCH_STATUS.inProgress }
                            };
                        case (receivePrefix + suffix):
                            return {
                                ...state,
                                [ID]: { status: FETCH_STATUS.success, payload: payloadPreprocesser(action.payload) }
                            };
                        case (failReceivePrefix + suffix):
                            return {
                                ...state,
                                [ID]: { status: FETCH_STATUS.fail, error: action.error }
                            };
                        case (resetPrefix + suffix):
                            return {
                                ...state,
                                [ID]: { status: FETCH_STATUS.none }

                            };
                        case (addPrefix + suffix):
                            return {
                                ...state,
                                [ID]: { status: FETCH_STATUS.success, payload: payloadPreprocesser(action.payload) }
                            };
                        case (updatePrefix + suffix):
                            return {
                                ...state,
                                [ID]: { status: FETCH_STATUS.success, payload: payloadPreprocesser(action.payload) }
                            };
                        case (deletePrefix + suffix):
                            return _.omit(state, [ String(ID) ]);
                        default: return state;
                    }
                }
            };
            return reducer(mainState, mainAction, 0);
        } else {
            return mainState;
        }
    };
};
