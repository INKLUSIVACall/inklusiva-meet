import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';

/**
 * Returns state of distressbutton.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {boolean} Whether distress button is enabled or disabled.
 */
export function isDistressBtnEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].distressbutton?.active;
}

/**
 * Gets value for dimming.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} The dimming value.
 */
export function getDistressBtnDimmingValue(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].distressbutton?.dimming ?? 0;
}

/**
 *  Gets value for volume.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} The volume value.
 */
export function getDistressBtnVolumeValue(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].distressbutton?.volume ?? 0;
}

/**
 *  Returns state of distressbutton message.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {boolean} Whether distress button message is enabled or disabled.
 */
export function isDistressBtnMessageEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].distressbutton?.message ?? false;
}

/**
 *  Gets value for message text.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {string} The message text.
 */
export function getDistressBtnMessageText(state: IReduxState): string | undefined {
    return state['features/inklusiva/userdata'].distressbutton?.message_text ?? '';
}

/**
 *  Gets DistressBtn Props.
 *
 * @param {IStateful} stateful - The redux state.
 * @returns {IUserData} The distress button props.
 */
export function getDistressBtnTabProps(stateful: IStateful) {
    const state = toState(stateful);

    const active = isDistressBtnEnabled(state);
    const dimming = getDistressBtnDimmingValue(state);
    const volume = getDistressBtnVolumeValue(state);
    const message = isDistressBtnMessageEnabled(state);
    const message_text = getDistressBtnMessageText(state);

    return {
        active,
        dimming,
        volume,
        message,
        message_text
    };
}
