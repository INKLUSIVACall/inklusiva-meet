import { IStore } from '../../app/types';
import { IStateful } from '../../base/app/types';
import { getRemoteParticipants } from '../../base/participants/functions';
import {
    setParticipantBrightness,
    setParticipantContrast,
    setParticipantOpacitySetting,
    setParticipantSaturation,
    setParticipantZoomLevel
} from '../../filmstrip/actions.web';

import {
    SET_USERVIDEO_BRIGHTNESS,
    SET_USERVIDEO_CONTRAST,
    SET_USERVIDEO_DIMMING,
    SET_USERVIDEO_INTERPRETERS,
    SET_USERVIDEO_OTHER_PARTICIPANTS,
    SET_USERVIDEO_SATURATION,
    SET_USERVIDEO_SCREESHARING,
    SET_USERVIDEO_ZOOM
} from './actionTypes';
import {
    areInterpretersEnabled,
    areOtherParticipantsEnabled,
    getUserVideoTabProps,
    isScreensharingEnabled
} from './functions';


/**
 * Submits new values to the state inside the project store.
 *
 * @param {any} newState - The new state.
 * @returns {Function}
 */
export function submitNewUserVideoTab(newState: any) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getUserVideoTabProps(getState());

        if (newState.brightness !== currentState.brightness) {
            dispatch(setUserVideoBrightnessValue(newState.brightness));
        }
        if (newState.contrast !== currentState.contrast) {
            dispatch(setUserVideoContrastValue(newState.contrast));
        }
        if (newState.dimming !== currentState.dimming) {
            dispatch(setUserVideoDimmingValue(newState.dimming));
        }
        if (newState.otherParticipants !== currentState.otherParticipants) {
            dispatch(toggleOtherParticipants());
        }
        if (newState.saturation !== currentState.saturation) {
            dispatch(setUserVideoSaturationValue(newState.saturation));
        }
        if (newState.zoom !== currentState.zoom) {
            dispatch(setUserVideoZoomValue(newState.zoom));
        }
    };
}

/**
 * Toggles the state of otherParticipants.
 *
 * @returns {Function}
 */
export function toggleOtherParticipants(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (areOtherParticipantsEnabled(getState())) {
            dispatch(setUserVideoOtherParticipantsState(false));
        } else {
            dispatch(setUserVideoOtherParticipantsState(true));
        }
    };
}

/**
 * Toggles the state of interpreters.
 *
 * @returns {Function}
 */
export function toggleInterpreters(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (areInterpretersEnabled(getState())) {
            dispatch(setUserVideoInterpretersState(false));
        } else {
            dispatch(setUserVideoInterpretersState(true));
        }
    };
}

/**
 * Toggles the state of screensharing.
 *
 * @returns {Function}
 */
export function toggleScreensharing(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isScreensharingEnabled(getState())) {
            dispatch(setUserVideoScreensharingState(false));
        } else {
            dispatch(setUserVideoScreensharingState(true));
        }
    };
}

/**
 * Sets the value of brightness.
 *
 * @param {number} value - The new value.
 * @returns {property}
 */
export function setUserVideoBrightnessValue(value: number): any {
    return {
        type: SET_USERVIDEO_BRIGHTNESS,
        value
    };
}

/**
 * Sets the value of contrast.
 *
 * @param {number} value - The new value.
 * @returns {property}
 */
export function setUserVideoContrastValue(value: number): any {
    return {
        type: SET_USERVIDEO_CONTRAST,
        value
    };
}

/**
 * Sets the value of dimming.
 *
 * @param {number} value - The new value.
 * @returns {property}
 */
export function setUserVideoDimmingValue(value: number): any {
    return {
        type: SET_USERVIDEO_DIMMING,
        value
    };
}

/**
 * Sets the state of otherParticipants.
 *
 * @param {boolean} enabled - The new state.
 * @returns {property}
 */
export function setUserVideoOtherParticipantsState(enabled: boolean): any {
    return {
        type: SET_USERVIDEO_OTHER_PARTICIPANTS,
        enabled
    };
}

/**
 * Sets the state of otherParticipants.
 *
 * @param {boolean} enabled - The new state.
 * @returns {property}
 */
export function setUserVideoInterpretersState(enabled: boolean): any {
    return {
        type: SET_USERVIDEO_INTERPRETERS,
        enabled
    };
}

/**
 * Sets the state of otherParticipants.
 *
 * @param {boolean} enabled - The new state.
 * @returns {property}
 */
export function setUserVideoScreensharingState(enabled: boolean): any {
    return {
        type: SET_USERVIDEO_SCREESHARING,
        enabled
    };
}

/**
 * Sets the value of saturation.
 *
 * @param {number} value - The new value.
 * @returns {property}
 */
export function setUserVideoSaturationValue(value: number): any {
    return {
        type: SET_USERVIDEO_SATURATION,
        value
    };
}

/**
 * Sets the value of zoom.
 *
 * @param {number} value - The new value.
 * @returns {property}
 */
export function setUserVideoZoomValue(value: number): any {
    return {
        type: SET_USERVIDEO_ZOOM,
        value
    };
}
