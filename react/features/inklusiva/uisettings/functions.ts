import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';

/**
 * Gets value for fontSize.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} The fontSize value.
 */
export function getUISettingsFontSize(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].ui?.fontSize;
}

/**
 *  Gets UISettings Props.
 *
 * @param {IStateful} stateful - The redux state.
 * @returns {IUserData} The UISettings props.
 */
export function getUISettingsTabProps(stateful: IStateful) {
    const state = toState(stateful);

    const fontSize = getUISettingsFontSize(state);

    return {
        fontSize
    };
}
