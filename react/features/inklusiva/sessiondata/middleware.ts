import { MEDIA_TYPE } from '../../base/media/constants';
import MiddlewareRegistry from '../../base/redux/MiddlewareRegistry';
import { setParticipantOpacitySetting, setVolume } from '../../filmstrip/actions.web';
import { muteLocal } from '../../video-menu/actions.any';

import { SET_INDISTRESS_DISABLED, SET_INDISTRESS_ENABLED } from './actionTypes';

/**
 * The middleware of the feature Filmstrip.
 */
MiddlewareRegistry.register(store => next => action => {
    const state = store.getState();
    const userData = state['features/inklusiva/userdata'];
    const dimmingValue = userData?.distressbutton?.dimming ?? 50;

    if (action.type === SET_INDISTRESS_ENABLED) {
        console.log(state['features/base/tracks']);
        state['features/filmstrip'].remoteParticipants.forEach(
            (participantId: string) => {
                store.dispatch(
                    setParticipantOpacitySetting(
                        false,
                        participantId,
                        dimmingValue / 100.0
                    )
                );
                store.dispatch(
                    setVolume(participantId, 0)
                );
            }
        );

        store.dispatch(setParticipantOpacitySetting(true, null, dimmingValue / 100.0));
        store.dispatch(muteLocal(true, MEDIA_TYPE.AUDIO, true));
    }

    if (action.type === SET_INDISTRESS_DISABLED) {
        state['features/filmstrip'].remoteParticipants.forEach(
            (participantId: string) => {
                store.dispatch(
                    setParticipantOpacitySetting(false, participantId, 1)
                );
                store.dispatch(
                    setVolume(participantId, 100)
                );
            }
        );
        store.dispatch(setParticipantOpacitySetting(true, null, 1));
        store.dispatch(muteLocal(false, MEDIA_TYPE.AUDIO, true));
    }

    return next(action);
});
