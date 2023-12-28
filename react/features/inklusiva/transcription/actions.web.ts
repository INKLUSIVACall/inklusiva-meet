import { IStore } from '../../app/types';

import {
    SET_TRANSCRIPTION_ENABLED,
    SET_TRANSCRIPTION_FONTSIZE_VALUE,
    SET_TRANSCRIPTION_HISTORY_VALUE,
    UPDATE_TRANSCRIPT_LINK
} from './actionTypes';
import { isTranscriptionEnabled } from './functions.web';


/**
 * Action to toggle the transcription enabled flag.
 *
 * @returns {any}
 */
export function toggleActiveTranscription(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isTranscriptionEnabled(getState())) {
            dispatch(setTranscriptionEnabled(false));
        } else {
            dispatch(setTranscriptionEnabled(true));
        }
    };
}

/**
 * Action to set the transcription enabled flag.
 *
 * @param {boolean} transcriptionEnabled - The new value.
 * @returns {Object}
 * @private
 */
export function setTranscriptionEnabled(transcriptionEnabled: boolean): any {
    return {
        type: SET_TRANSCRIPTION_ENABLED,
        transcriptionEnabled
    };
}


/**
 * Action to set the transcription font size value.
 *
 * @param {number} fontSizeValue - The new value.
 * @returns {Object}
 */
export function setTranscriptionFontSizeValue(fontSizeValue: number): any {
    return {
        type: SET_TRANSCRIPTION_FONTSIZE_VALUE,
        fontSizeValue
    };
}

/**
 * Action to set the transcription history value.
 *
 * @param {number} historyValue - The new value.
 * @returns {Object}
 */
export function setTranscriptionHistoryValue(historyValue: number): any {
    return {
        type: SET_TRANSCRIPTION_HISTORY_VALUE,
        historyValue
    };
}

/**
 * Action to update the link to the transcription.
 *
 * @param {string} link - The new link to the transcription.
 * @returns {Object}
 */
export function updateTranscriptLink(link: string) {
    return {
        type: UPDATE_TRANSCRIPT_LINK,
        link
    };
}
