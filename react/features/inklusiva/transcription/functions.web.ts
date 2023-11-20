import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';

/**
 *
 * @param state
 * @returns Whether TranscriptionTab is enabled.
 */
export function isTranscriptionEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].assistant?.transcription?.active;
}

/**
 *
 * @param state
 * @returns FontSize in transcription.
 */
export function getFontSize(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].assistant?.transcription?.fontSize;
}

/**
 *
 * History value determines for how long transcriptions will be shown on screen.
 *
 * @param state
 * @returns Size of history buffer in transcription.
 */
export function getHistory(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].assistant?.transcription?.history;
}

/** .........
 *  Returns all states of TranscriptionTab
 *
 * @param stateful
 */
export function getTranscriptionTabProps(stateful: IStateful) {
    const state = toState(stateful);
    const active = isTranscriptionEnabled(state);
    const fontSize = getFontSize(state);
    const history = getHistory(state);

    return {
        active,
        fontSize,
        history
    };
}
