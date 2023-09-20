import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';

/**
 * Getting the eyesight setting.
 *
 * @param {IReduxState} state - Rhe redux state.
 * @returns {string} - A string indicating how severely eyesight is impaired or not.
 */
export function getEyesight(state: IReduxState): string | undefined {
    return state['features/inklusiva/userdata'].support?.eyesight;
}

/** ...........
 *
 *
 * @param state
 * @returns a string indicating how severely hearing is impaired or not
 */
export function getHearing(state: IReduxState): string {
    return state['features/inklusiva/userdata'].support?.hearing;
}

/**
 *
 * @param state
 * @returns Whether or not senses are impaired.
 */
export function areSensesEnabled(state: IReduxState): boolean {
    return state['features/inklusiva/userdata'].support?.senses;
}

/**
 *
 * @param state
 * @returns Whether learning difficulties are TRUE.
 */
export function areLearningDifficultiesEnabled(state: IReduxState): boolean {
    return state['features/inklusiva/userdata'].support?.learning_difficulties;
}

/**
 *
 * @param state
 * @returns Whether Screenreader is enabled.
 */
export function isScreenreaderEnabled(state: IReduxState): boolean {
    return state['features/inklusiva/userdata'].ui?.screenreader;
}

/** ....................
 *  Returns all states of SupportTab
 *
 * @param stateful
 */
export function getSupportTabProps(stateful: IStateful) {
    const state = toState(stateful);
    const eyesight = getEyesight(state);
    const hearing = getHearing(state);
    const senses = areSensesEnabled(state);
    const learning_difficulties = areLearningDifficultiesEnabled(state);
    const screenreader = isScreenreaderEnabled(state);

    return {
        eyesight,
        hearing,
        senses,
        learning_difficulties,
        screenreader
    };
}
