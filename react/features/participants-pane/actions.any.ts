import { IStore } from '../app/types';

import { PARTICIPANTS_PANE_CLOSE } from './actionTypes';
import { open } from './actions.web';

/**
 * Action to close the participants pane.
 *
 * @returns {Object}
 */
export const close = () => {
    return {
        type: PARTICIPANTS_PANE_CLOSE
    };
};

export function toggleParticipantsPane() {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const isOpen = getState()['features/participants-pane'].isOpen;

        if (isOpen) {
            dispatch(close());
        } else {
            dispatch(open());
        }
    };
}
