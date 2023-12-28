import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';
import { getUserVideoTabProps } from '../uservideo/functions';

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
 * Gets value for iconSize.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} - The iconSize value.
 */
export function getUISettingsIconSize(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].ui?.iconSize;
}

/**
 * Returns state of VisualCues.
 *
 * @param {IReduxState} state - The Redux state.
 * @returns {boolean} Whether VisualCues is enabled or disabled.
 */
export function isVisualCuesEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].ui?.visualCues;
}

/**
 * Returns state of AcousticCues.
 *
 * @param {IReduxState} state - The Redux state.
 * @returns {boolean} Whether AcousticCues is enabled or disabled.
 */
export function isAcousticCuesEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].ui?.acousticCues;
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
    const iconSize = getUISettingsIconSize(state);
    const visualCues = isVisualCuesEnabled(state);
    const acousticCues = isAcousticCuesEnabled(state);
    const videoProps = getUserVideoTabProps(state);

    return {
        fontSize,
        iconSize,
        visualCues,
        acousticCues,
        ...videoProps
    };
}
