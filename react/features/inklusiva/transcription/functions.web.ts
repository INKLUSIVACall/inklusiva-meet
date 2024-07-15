import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { getCurrentConference } from '../../base/conference/functions';
import { toState } from '../../base/redux/functions';

/**
 * Returns whether TranscriptionTab is enabled.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {boolean} Whether TranscriptionTab is enabled.
 */
export function isTranscriptionEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].assistant?.transcription?.active;
}

/**
 * Returns font size of transcription.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} Font size of transcription.
 */
export function getFontSize(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].assistant?.transcription?.fontSize;
}

/**
 * History value determines for how long transcriptions will be shown on screen.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} History value.
 */
export function getHistory(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].assistant?.transcription?.history;
}

/**
 * Returns link to the transcription.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {string} Link to transcription.
 */
export function getTranscriptionLink(state: IReduxState): string | undefined {
    const conference = getCurrentConference(state);

    return conference?.transcriptionLink ?? '';
}

/**
 *  Returns all states of TranscriptionTab.
 *
 * @param {IStateful} stateful - The redux state.
 * @returns {Object} All states of TranscriptionTab.
 */
export function getTranscriptionTabProps(stateful: IStateful) {
    const state = toState(stateful);
    const transcriptionActive = isTranscriptionEnabled(state);
    const transcriptionFontSize = getFontSize(state);
    const transcriptionHistory = getHistory(state);

    return {
        transcriptionActive,
        transcriptionFontSize,
        transcriptionHistory
    };
}
