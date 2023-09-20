import MiddlewareRegistry from '../../base/redux/MiddlewareRegistry';
import { setParticipantOpacitySetting } from '../../filmstrip/actions.web';

import { SET_INDISTRESS_DISABLED, SET_INDISTRESS_ENABLED } from './actionTypes';

/**
 * The middleware of the feature Filmstrip.
 */
MiddlewareRegistry.register(store => next => action => {
    const state = store.getState();
    const userData = state['features/inklusiva/userdata'];
    const dimmingValue = userData?.distressbutton?.dimming ?? 50;

    if (action.type === SET_INDISTRESS_ENABLED) {
        state['features/filmstrip'].remoteParticipants.forEach(
            (participantId: string) => {
                store.dispatch(
                    setParticipantOpacitySetting(
                        false,
                        participantId,
                        dimmingValue / 100.0
                    )
                );
            }
        );

        // setParticipantOpacitySetting(true, null, dimmingValue / 100.0);
    }

    if (action.type === SET_INDISTRESS_DISABLED) {
        state['features/filmstrip'].remoteParticipants.forEach(
            (participantId: string) => {
                store.dispatch(
                    setParticipantOpacitySetting(false, participantId, 0)
                );
            }
        );
    }

    return next(action);
});
