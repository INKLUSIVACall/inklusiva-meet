import { SET_VIDEO_MUTED } from '../../base/media/actionTypes';
import { MEDIA_TYPE, VIDEO_MUTISM_AUTHORITY } from '../../base/media/constants';
import { getLocalParticipant } from '../../base/participants/functions';
import MiddlewareRegistry from '../../base/redux/MiddlewareRegistry';
import { setParticipantOpacitySetting, setVolume } from '../../filmstrip/actions.web';
import { getParticipantsOpacityByParticipantId } from '../../filmstrip/functions.web';
import { muteLocal } from '../../video-menu/actions.any';

import { SET_INDISTRESS_DISABLED, SET_INDISTRESS_ENABLED } from './actionTypes';

/**
 * The middleware of the feature Filmstrip.
 */
MiddlewareRegistry.register(store => next => action => {
    const state = store.getState();
    const userData = state['features/inklusiva/userdata'];
    const dimmingValue = userData?.distressbutton?.dimming ?? 50;
    const defaultOpacity = userData?.video?.dimming ?? 1;
    const localParticipant = getLocalParticipant(state);

    if (action.type === SET_INDISTRESS_ENABLED) {

        // apply dimming to all remote participants
        state['features/filmstrip'].remoteParticipants.forEach((participantId: string) => {
            store.dispatch(setParticipantOpacitySetting(participantId, dimmingValue));
            store.dispatch(setVolume(participantId, 0));
        });

        // apply dimming to local participant
        if (localParticipant) {
            store.dispatch(setParticipantOpacitySetting(localParticipant.id, dimmingValue));
        }

        // TODO: Direkte Message an Betreuer

        store.dispatch(muteLocal(true, MEDIA_TYPE.AUDIO, true));
        store.dispatch(muteLocal(true, MEDIA_TYPE.VIDEO, true));
    }

    if (action.type === SET_INDISTRESS_DISABLED) {
        // reset dimming for all remote participants
        state['features/filmstrip'].remoteParticipants.forEach((participantId: string) => {
            store.dispatch(setParticipantOpacitySetting(participantId, defaultOpacity));
            store.dispatch(setVolume(participantId, 100));
        });

        // reset dimming to local participant
        if (localParticipant) {
            store.dispatch(setParticipantOpacitySetting(localParticipant.id, defaultOpacity));
        }

        store.dispatch(muteLocal(false, MEDIA_TYPE.AUDIO, true));
        store.dispatch(muteLocal(false, MEDIA_TYPE.VIDEO, true));
    }

    return next(action);
});
