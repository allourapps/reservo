/* @flow */

import type { Dispatch } from 'redux';
import _ from 'lodash';
import { makeActionCreator } from './index';
import type { IAction } from './index';

type ICreateUiActionCreatorProps = {
    suffix: string,
    argNames: Array<string>,
}

const uiPrefix = 'UI_';
export const createUiActionCreator = (props: ICreateUiActionCreatorProps) => {
    const { suffix, argNames } = props;
    if (_.includes(argNames, 'type')) {
        throw new Error(`invalid arg name (type) in ${suffix} action`);
    }
    return (...args: any) => (dispatch: Dispatch<*>) => {
        const uiAction = makeActionCreator(uiPrefix + suffix, ...argNames);
        dispatch(uiAction(...args));
    };
};

export const createUiReducer = (actionTypeSuffix: string) => (state: any = {}, action: IAction) => {
    switch (action.type) {
        case (`${uiPrefix}${actionTypeSuffix}`): {
            const stateChanges = _.omit(action, [ 'type' ]);
            return { ...state, ...stateChanges };
        }
        default:
            return state;
    }
};

export const createUISetReducer = (actionType: string, defaultState: any) => (state: any = defaultState, action: IAction) => {
    switch (action.type) {
        case (actionType): {
            const stateChanges = _.omit(action, [ 'type' ]);
            return { ...state, ...stateChanges };
        }
        default:
            return state;
    }
};
