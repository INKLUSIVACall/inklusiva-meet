import ReducerRegistry from '../../base/redux/ReducerRegistry';
import { equals } from '../../base/redux/functions';

import { SET_USERDATA } from './actionTypes';

export interface IUserdataState {
    userData?: {
        support?: {
            sehen: string;
            hören: string;
        }
    };
}

/**
 * Reduces redux actions which affect the JSON Web Token (JWT) stored in the
 * redux store.
 *
 * @param {Object} state - The current redux state.
 * @param {Object} action - The redux action to reduce.
 * @returns {Object} The next redux state which is the result of reducing the
 * specified {@code action}.
 */
ReducerRegistry.register<IUserdataState>(
    'features/lag/userdata',
    (state = {}, action): IUserdataState => {
        switch (action.type) {
        case SET_USERDATA: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, ...payload } = action;
            const nextState = {
                ...payload
            };

            return equals(state, nextState) ? state : nextState;
        }
        }

        return state;
    });
