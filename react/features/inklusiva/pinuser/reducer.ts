import ReducerRegistry from '../../base/redux/ReducerRegistry';

import { PIN_USER, UNPIN_USER } from './actionTypes';

export interface IPinnedUser {

    /**
     * Array of participant IDs of the pinned participants.
     */
    pinnedParticipants: string[];
}

ReducerRegistry.register<IPinnedUser>(
    'features/inklusiva/pinneduser',
    (state = { pinnedParticipants: [] }, action): IPinnedUser => {
        const nextState = state;

        switch (action.type) {
        case PIN_USER: {
            if (action.participantId !== null && !state.pinnedParticipants.includes(action.participantId)) {
                nextState.pinnedParticipants.push(action.participantId);
            }

            return { ...nextState };
        }
        case UNPIN_USER: {
            if (action.participantId !== null) {
                const index = state.pinnedParticipants.indexOf(action.participantId);

                if (index > -1) {
                    nextState.pinnedParticipants.splice(index, 1);
                }
            }

            return { ...nextState };
        }
        default:
            return state;
        }
    }
);
