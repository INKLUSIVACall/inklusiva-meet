import ReducerRegistry from '../../base/redux/ReducerRegistry';

import { SET_INDISTRESS_DISABLED, SET_INDISTRESS_ENABLED, SET_MEETING_NAME } from './actionTypes';

export interface ISessionData {
    inDistress: boolean;
    meetingName: string;
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
ReducerRegistry.register<ISessionData>(
    'features/inklusiva/sessiondata',
    (
            state = {
                inDistress: false,
                meetingName: ''
            }, action
    ): ISessionData => {
        const nextState = state;

        switch (action.type) {
        case SET_INDISTRESS_ENABLED: {
            nextState.inDistress = true;

            return { ...nextState };
        }
        case SET_INDISTRESS_DISABLED: {
            nextState.inDistress = false;

            return { ...nextState };
        }
        case SET_MEETING_NAME: {
            nextState.meetingName = action.meetingName;

            return { ...nextState };
        }
        default:
            return state;
        }
    }
);
