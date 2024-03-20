import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    REMOVE_TRANSCRIPT_MESSAGE,
    SET_HISTORY_VISIBILITY,
    SET_OLD_TRANSCRIPT_MESSAGE,
    SET_POPUP_VISIBILITY,
    SET_REQUESTING_SUBTITLES,
    UPDATE_TRANSCRIPTION_HISTORY,
    UPDATE_TRANSCRIPT_MESSAGE,
    UPDATE_TRANSLATION_LANGUAGE
} from './actionTypes';

/**
 * Default State for 'features/transcription' feature.
 */
const defaultState = {
    _transcriptMessages: new Map(),
    _requestingSubtitles: false,
    _language: 'transcribing.subtitlesOff',
    _oldTranscriptMessage: null,
    _popupVisibility: false,
    _transcriptionHistory: [],
    _historyVisibility: false,
    _visibility: false
};

interface ITranscriptMessage {
    final: string;
    participantName: string;
    stable: string;
    unstable: string;
}

export interface ISubtitlesState {
    _language: string;
    _requestingSubtitles: boolean;
    _transcriptMessages: Map<string, ITranscriptMessage> | any;
    _oldTranscriptMessage: any;
    _transcriptionHistory: any[];
    _historyVisibility: boolean;
    _popupVisibility: boolean;
}

/**
 * Listen for actions for the transcription feature to be used by the actions
 * to update the rendered transcription subtitles.
 */
ReducerRegistry.register<ISubtitlesState>('features/subtitles', (state = defaultState, action): ISubtitlesState => {     
    
    switch (action.type) {
        case REMOVE_TRANSCRIPT_MESSAGE:
            return _removeTranscriptMessage(state, action);
        case UPDATE_TRANSCRIPT_MESSAGE:
            return _updateTranscriptMessage(state, action);
        case UPDATE_TRANSLATION_LANGUAGE:
            return {
                ...state,
                _language: action.value
            };
        case SET_REQUESTING_SUBTITLES:
            return {
                ...state,
                _requestingSubtitles: action.enabled
            };
        case UPDATE_TRANSCRIPTION_HISTORY:
            return _updateTranscriptionHistory(state, action);
        case SET_OLD_TRANSCRIPT_MESSAGE:
            return {
                ...state,
                _oldTranscriptMessage: action.oldTranscriptMessage
            };
        case SET_POPUP_VISIBILITY:
            return {
                ...state,
                _popupVisibility: action.visibility
            };
        case SET_HISTORY_VISIBILITY:
            return {
                ...state,
                _historyVisibility: action.historyVisibility
            };
    }

    return state;
});

/**
 * Reduces a specific Redux action REMOVE_TRANSCRIPT_MESSAGE of the feature
 * transcription.
 *
 * @param {Object} state - The Redux state of the feature transcription.
 * @param {Action} action -The Redux action REMOVE_TRANSCRIPT_MESSAGE to reduce.
 * @returns {Object} The new state of the feature transcription after the
 * reduction of the specified action.
 */
function _removeTranscriptMessage(state: ISubtitlesState, { transcriptMessageID }: { transcriptMessageID: string; }) {
    const newTranscriptMessages = new Map(state._transcriptMessages);

    // Deletes the key from Map once a final message arrives.
    newTranscriptMessages.delete(transcriptMessageID);

    return {
        ...state,
        _transcriptMessages: newTranscriptMessages
    };
}

/**
 * Reduces a specific Redux action UPDATE_TRANSCRIPT_MESSAGE of the feature
 * transcription.
 *
 * @param {Object} state - The Redux state of the feature transcription.
 * @param {Action} action -The Redux action UPDATE_TRANSCRIPT_MESSAGE to reduce.
 * @returns {Object} The new state of the feature transcription after the
 * reduction of the specified action.
 */
function _updateTranscriptMessage(state: ISubtitlesState, { transcriptMessageID, newTranscriptMessage }:
    { newTranscriptMessage: ITranscriptMessage; transcriptMessageID: string; }) {
    const newTranscriptMessages = new Map(state._transcriptMessages);

    // Updates the new message for the given key in the Map.
    newTranscriptMessages.set(transcriptMessageID, newTranscriptMessage);

    return {
        ...state,
        _transcriptMessages: newTranscriptMessages
    };
}

/**
 * Reduces a specific Redux action UPDATE_TRANSCRIPTION_HISTORY of the feature
 * transcription.
 * 
 * @param {Object} state 
 * @param {any} transcriptionHistory 
 * @returns {Object} The new state of the feature transcription after the
 * reduction of the specified action.
 */
function _updateTranscriptionHistory(state: ISubtitlesState, transcriptionHistory: any) {
    let newTranscriptionHistory = state._transcriptionHistory;
    const length = newTranscriptionHistory.length; 

    newTranscriptionHistory[length] = transcriptionHistory;

    return {
        ...state,
        _transcriptionHistory: newTranscriptionHistory
    }
}
