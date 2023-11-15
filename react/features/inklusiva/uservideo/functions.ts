import { IReduxState } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { toState } from '../../base/redux/functions';


/**
 * Returns state of user videos.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} The brightness value..
 */
export function getUserVideoBrightnessValue(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].video?.brightness;
}

/**
 * Returns state of user videos.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} The contrast value.
 */
export function getUserVideoContrastValue(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].video?.contrast;
}

/**
 * Returns state of user videos.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {boolean} Whether user videos are enabled or disabled.
 */
export function getUserVideoDimmingValue(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].video?.dimming;
}

/**
 * Returns state of user videos.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {boolean} Whether user videos are enabled or disabled.
 */
export function areOtherParticipantsEnabled(state: IReduxState): boolean | undefined {
    return state['features/inklusiva/userdata'].video?.otherParticipants;
}

/**
 * Returns state of user videos.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} The saturation value.
 */
export function getUserVideoSaturationValue(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].video?.saturation;
}

/**
 * Returns state of user videos.
 *
 * @param {IReduxState} state - The redux state.
 * @returns {number} The zoom value.
 */
export function getUserVideoZoomValue(state: IReduxState): number | undefined {
    return state['features/inklusiva/userdata'].video?.zoom;
}

/**
 *  Gets DistressBtn Props.
 *
 * @param {IStateful} stateful - The redux state.
 * @returns {IUserData} The user video props.
 */
export function getUserVideoTabProps(stateful: IStateful) {
    const state = toState(stateful);

    const brightness = getUserVideoBrightnessValue(state);
    const contrast = getUserVideoContrastValue(state);
    const dimming = getUserVideoDimmingValue(state);
    const otherParticipants = areOtherParticipantsEnabled(state);
    const saturation = getUserVideoSaturationValue(state);
    const zoom = getUserVideoZoomValue(state);

    return {
        brightness,
        contrast,
        dimming,
        otherParticipants,
        saturation,
        zoom
    };
}
