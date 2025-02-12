import {
    ENDPOINT_MESSAGE_RECEIVED,
    REMOVE_TRANSCRIPT_MESSAGE,
    SET_HISTORY_VISIBILITY,
    SET_OLD_TRANSCRIPT_MESSAGE,
    SET_POPUP_VISIBILITY,
    SET_REQUESTING_SUBTITLES,
    SET_TRANSCRIPT_WINDOW_VISIBILITY,
    TOGGLE_REQUESTING_SUBTITLES,
    UPDATE_TRANSCRIPTION_HISTORY,
    UPDATE_TRANSCRIPT_MESSAGE, UPDATE_TRANSLATION_LANGUAGE
} from './actionTypes';

/**
 * Signals that a participant sent an endpoint message on the data channel.
 *
 * @param {Object} participant - The participant details sending the message.
 * @param {Object} json - The json carried by the endpoint message.
 * @returns {{
 *      type: ENDPOINT_MESSAGE_RECEIVED,
 *      participant: Object,
 *      json: Object
 * }}
 */
export function endpointMessageReceived(participant: Object, json: Object) {
    return {
        type: ENDPOINT_MESSAGE_RECEIVED,
        participant,
        json
    };
}

/**
 * Signals that a transcript has to be removed from the state.
 *
 * @param {string} transcriptMessageID - The message_id to be removed.
 * @returns {{
 *      type: REMOVE_TRANSCRIPT_MESSAGE,
 *      transcriptMessageID: string,
 * }}
 */
export function removeTranscriptMessage(transcriptMessageID: string) {
    return {
        type: REMOVE_TRANSCRIPT_MESSAGE,
        transcriptMessageID
    };
}

/**
 * Signals that a transcript with the given message_id to be added or updated
 * is received.
 *
 * @param {string} transcriptMessageID -The transcript message_id to be updated.
 * @param {Object} newTranscriptMessage - The updated transcript message.
 * @returns {{
 *      type: UPDATE_TRANSCRIPT_MESSAGE,
 *      transcriptMessageID: string,
 *      newTranscriptMessage: Object
 * }}
 */
export function updateTranscriptMessage(transcriptMessageID: string,
        newTranscriptMessage: Object) {
    return {
        type: UPDATE_TRANSCRIPT_MESSAGE,
        transcriptMessageID,
        newTranscriptMessage
    };
}

/**
 * Signals that the local user has toggled the ClosedCaption button.
 *
 * @returns {{
 *      type: TOGGLE_REQUESTING_SUBTITLES
 * }}
 */
export function toggleRequestingSubtitles() {
    return {
        type: TOGGLE_REQUESTING_SUBTITLES
    };
}

/**
 * Signals that the local user has enabled or disabled the subtitles.
 *
 * @param {boolean} enabled - The new state of the subtitles.
 * @returns {{
 *    type: SET_REQUESTING_SUBTITLES,
 *    enabled: boolean
 * }}
 */
export function setRequestingSubtitles(enabled: boolean) {
    return {
        type: SET_REQUESTING_SUBTITLES,
        enabled
    };
}

/**
 * Signals that the local user has selected language for the translation.
 *
 * @param {string} value - The selected language for translation.
 * @returns {{
 *      type: UPDATE_TRANSLATION_LANGUAGE
 * }}
 */
export function updateTranslationLanguage(value: string) {
    return {
        type: UPDATE_TRANSLATION_LANGUAGE,
        value
    };
}

/**
 * Signals that the old transcript message has to be set to compare it with the new transcript message.
 *
 * @param {any} oldTranscriptMessage - The old transcript's message.
 * @returns {{
 *      type: SET_OLD_TRANSCRIPT_MESSAGE,
 *      oldTranscriptMessage
 * }}
*/
export function setOldTranscriptMessage(oldTranscriptMessage: any) {
    return {
        type: SET_OLD_TRANSCRIPT_MESSAGE,
        oldTranscriptMessage
    };
}

/**
 * The complete history of the meeting's transcription.
 *
 * @param {any[]} transcriptionHistory - The whole history of the meeting's transcript.
 * @returns {{
 *      type: UPDATE_TRANSCRIPTION_HISTORY,
 *      transcriptionHistory
 * }}
 */
export function updateTranscriptionHistory(transcriptionHistory: any[]) {
    return {
        type: UPDATE_TRANSCRIPTION_HISTORY,
        transcriptionHistory
    };
}

/**
 * Sets the visibility of the popup.
 *
 * @param {boolean} visibility - The visibility of the popup.
 * @returns {{
 *      type: SET_POPUP_VISIBILITY,
 *      visibility
 * }}
 */
export function setPopupVisibility(visibility: boolean) {
    return {
        type: SET_POPUP_VISIBILITY,
        visibility
    };
}

/**
 * Sets the visibility of the history panel.
 *
 * @param {boolean} historyVisibility
 * @returns {{
 *      type: SET_HISTORY_VISIBILITY,
 *      historyVisibility
 * }}
 */
export function setHistoryVisibility(historyVisibility: boolean) {
    return {
        type: SET_HISTORY_VISIBILITY,
        historyVisibility
    };
}

/**
 * Sets the visibility of the transcription window.
 *
 * @param {boolean} visibility - The visibility of the transcription window.
 * @returns {{
 *     type: SET_TRANSCRIPT_WINDOW_VISIBILITY,
 *     isTranscriptionWindowVisible: boolean
 * }}
 */
export function setTranscriptWindowVisibility(visibility: boolean) {
    return {
        type: SET_TRANSCRIPT_WINDOW_VISIBILITY,
        isTranscriptionWindowVisible: visibility
    };
}
