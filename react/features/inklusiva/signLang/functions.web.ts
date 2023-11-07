import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';

/**
 *
 * @param state
 * @returns  Booelan is SignLang Assistant enabled?
 */
export function isSignLangEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].assistant?.signLang?.active;
}

export function getDisplayString(state: IReduxState): string | undefined {
    return state['features/inklusiva/userdata'].assistant?.signLang?.display;
}

export function getWindowSize(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].assistant?.signLang?.windowSize;
}

/**
 *
 * @param stateful - Returns SignlanguagetabProps for options panel.
 */
export function getSignLangTabProps(stateful: IStateful) {
    const state = toState(stateful);
    const active = isSignLangEnabled(state);
    const display = getDisplayString(state);
    const windowSize = getWindowSize(state);

    return {
        active,
        display,
        windowSize
    };
}
