
/**
 * The type of (redux) action which indicates that an endpoint message
 * sent by another participant to the data channel is received.
 *
 * {
 *     type: ENDPOINT_MESSAGE_RECEIVED,
 *     participant: Object,
 *     json: Object
 * }
 */
export const ENDPOINT_MESSAGE_RECEIVED = 'ENDPOINT_MESSAGE_RECEIVED';

/**
 * The type of (redux) action which indicates that an existing transcript
 * has to be removed from the state.
 *
 * {
 *      type: REMOVE_TRANSCRIPT_MESSAGE,
 *      transciptMessageID: string,
 * }
 */
export const REMOVE_TRANSCRIPT_MESSAGE = 'REMOVE_TRANSCRIPT_MESSAGE';

/**
 * The type of (redux) action which indicates that a transcript with an
 * given message_id to be added or updated is received.
 *
 * {
 *      type: UPDATE_TRANSCRIPT_MESSAGE,
 *      transcriptMessageID: string,
 *      newTranscriptMessage: Object
 * }
 */
export const UPDATE_TRANSCRIPT_MESSAGE = 'UPDATE_TRANSCRIPT_MESSAGE';

/**
 * The type of (redux) action which indicates that a transcript with an
 * given message_id to be added or updated is received.
 *
 * {
 *      type: UPDATE_TRANSLATION_LANGUAGE,
 *      transcriptMessageID: string,
 *      newTranscriptMessage: Object
 * }
 */
export const UPDATE_TRANSLATION_LANGUAGE = 'UPDATE_TRANSLATION_LANGUAGE';

/**
 * The type of (redux) action which indicates that the user pressed the
 * ClosedCaption button, to either enable or disable subtitles based on the
 * current state.
 *
 * {
 *      type: TOGGLE_REQUESTING_SUBTITLES
 * }
 */
export const TOGGLE_REQUESTING_SUBTITLES
    = 'TOGGLE_REQUESTING_SUBTITLES';

/**
 * The type of (redux) action which indicates if the user set the state of
 * the subtitles to enabled or disabled.
 *
 * {
 *      type: SET_REQUESTING_SUBTITLES
 *      enabled: boolean
 * }
 */
export const SET_REQUESTING_SUBTITLES
    = 'SET_REQUESTING_SUBTITLES';

/**
 * The type of (redux) action which indicates that a transciption message
 * needs to be set to compare two transcript messages with each other.
 *
 * {
 *     type: SET_OLD_TRANSCRIPT_MESSAGE,
       oldTranscriptMessageKey,
       oldTranscriptMessageValue
 * }
 */
export const SET_OLD_TRANSCRIPT_MESSAGE = 'SET_OLD_TRANSCRIPT_MESSAGE';

/**
 * The type of (redux) action which indicates that te transcription history needs to be updated
 * so that the whole transcript of the meeting is saved.
 *
 * {
 *     type: UPDATE_TRANSCRIPTION_HISTORY,
       transcriptionHistory
 * }
 */
export const UPDATE_TRANSCRIPTION_HISTORY = 'UPDATE_TRANSCRIPTION_HISTORY';

/**
 * The type of (redux) action which sets the popup visibility,
 *
 * {
 *     type: SET_POPUP_VISIBILITY,
       visibility
 * }
 */
export const SET_POPUP_VISIBILITY = 'SET_POPUP_VISIBILITY';

/**
 * The type of (redux) action which indicates that the button to open the CC history
 * has been clicked.
 * 
 * {
 *     type: SET_HISTORY_VISIBILITY,
       historyVisibility
 * }
 */
export const SET_HISTORY_VISIBILITY = 'SET_HISTORY_VISIBILITY';