import { IStore } from '../../app/types';
import { IC_ROLES } from '../../base/conference/icRoles';
import { IJitsiConference } from '../../base/conference/reducer';
import { MEDIA_TYPE } from '../../base/media/constants';
import {
    getLocalParticipant,
    getParticipantWithICRoleAndPartner,
    participantHasRole
} from '../../base/participants/functions';
import MiddlewareRegistry from '../../base/redux/MiddlewareRegistry';
import { setParticipantOpacitySetting, setVolume } from '../../filmstrip/actions.web';
import { showNotification } from '../../notifications/actions';
import { NOTIFICATION_TIMEOUT_TYPE } from '../../notifications/constants';
import { muteLocal } from '../../video-menu/actions.any';

import { SET_INDISTRESS_DISABLED, SET_INDISTRESS_ENABLED } from './actionTypes';
import { persistSentPrivateMessage } from './functions';

/**
 * The middleware of the feature Filmstrip.
 */
MiddlewareRegistry.register(store => next => action => {
    const state = store.getState();
    const userData = state['features/inklusiva/userdata'];
    const dimmingValue = userData?.distressbutton?.dimming ?? 50;
    const defaultOpacity = userData?.video?.dimming ?? 1;
    const defaultVolume = userData?.audio?.volume ?? 1;
    const localParticipant = getLocalParticipant(state);
    const conference = state['features/base/conference'].conference;

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

        // if the local participant is assisted...
        if (participantHasRole(state, localParticipant?.id, IC_ROLES.ASSISTED)) {
            // get message from user data
            const message = userData?.distressbutton?.message_text ?? '';

            // get his assistant
            const rolePartner = getParticipantWithICRoleAndPartner(
                state,
                IC_ROLES.ASSISTANT,
                localParticipant ? localParticipant.id : ''
            );

            // send his assistant a private message
            if (rolePartner && message) {
                _sendPrivateMessageWithNotification(
                    store,
                    conference,
                    rolePartner.id,
                    message,
                    'Sie haben den Notfallknopf gedrückt',
                    'Ihre Nachricht wurde an Ihre Begleitperson gesendet.'
                );
            }
        }

        store.dispatch(muteLocal(true, MEDIA_TYPE.AUDIO, true));
        store.dispatch(muteLocal(true, MEDIA_TYPE.VIDEO, true));
    }

    if (action.type === SET_INDISTRESS_DISABLED) {
        // reset dimming for all remote participants
        state['features/filmstrip'].remoteParticipants.forEach((participantId: string) => {
            store.dispatch(setParticipantOpacitySetting(participantId, defaultOpacity));
            store.dispatch(setVolume(participantId, defaultVolume));
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

/**
 * Sends a private message to a participant, shows a notification and persists the message.
 *
 * @param {IStore} store - The redux store.
 * @param {IJitsiConference | undefined} conference - The conference.
 * @param {string} recipientID - The ID of the message-recipient.
 * @param {string} message - The message to send.
 * @param {string} notificationTitle - The title of the notification.
 * @param {string} notificationDescription - The description of the notification.
 * @returns {void}
 */
function _sendPrivateMessageWithNotification(
        store: IStore,
        conference: IJitsiConference | undefined,
        recipientID: string,
        message: string,
        notificationTitle: string,
        notificationDescription: string
) {
    store.dispatch(showNotification({
        description: notificationDescription,
        title: notificationTitle
    }, NOTIFICATION_TIMEOUT_TYPE.MEDIUM));
    persistSentPrivateMessage(store, recipientID, message);
    conference?.sendPrivateTextMessage(recipientID, message);
}
