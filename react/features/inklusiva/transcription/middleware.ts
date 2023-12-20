import { getCurrentConference } from '../../base/conference/functions';
import MiddlewareRegistry from '../../base/redux/MiddlewareRegistry';

import { UPDATE_TRANSCRIPT_LINK } from './actionTypes';

/**
 * Implements the middleware of the transcription feature.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const { dispatch, getState } = store;

    // const localParticipant = getLocalParticipant(getState());

    switch (action.type) {
    case UPDATE_TRANSCRIPT_LINK: {
        const state = store.getState();
        const conference = getCurrentConference(state);
        console.log('123456', conference);
        if (conference) {
            conference.updateTranscriptLink(action.link);
        }
        break;
    }
    }

    return next(action);
});
