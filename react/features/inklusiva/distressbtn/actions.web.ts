import { IStore } from '../../app/types';

import {
    SET_DISTRESSBTN_DIMMING_VALUE,
    SET_DISTRESSBTN_ENABLED,
    SET_DISTRESSBTN_MESSAGE_ENABLED,
    SET_DISTRESSBTN_MESSAGE_TEXT,
    SET_DISTRESSBTN_VOLUME_VALUE
} from './actionTypes';
import {
    getDistressBtnTabProps,
    isDistressBtnEnabled,
    isDistressBtnMessageEnabled
} from './functions.web';

/**
 * Submits new values to the state inside the project store.
 *
 * @param {any} newState - The new values to be submitted.
 * @returns {Function}
 */
export function submitNewDistressBtnTab(newState: any) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getDistressBtnTabProps(getState());

        if (newState.active !== currentState.active) {
            dispatch(toggleActive());
        }
        if (newState.message !== currentState.message) {
            dispatch(toggleMessage());
        }
        if (newState.dimming !== currentState.dimming) {
            dispatch(setDistressBtnDimmingValue(newState.dimming));
        }
        if (newState.volume !== currentState.volume) {
            dispatch(setDistressBtnVolumeValue(newState.volume));
        }
        if (newState.message_text !== currentState.message_text) {
            dispatch(setDistressBtnMessageText(newState.message_text));
        }
    };
}

/**
 * Toggles the active state of the distress button.
 *
 * @returns {Function}
 */
export function toggleActive(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isDistressBtnEnabled(getState())) {
            dispatch(setDistressBtnEnabledState(false));
        } else {
            dispatch(setDistressBtnEnabledState(true));
        }
    };
}

/**
 * Toggles the message state of the distress button.
 *
 * @returns {Function}
 */
export function toggleMessage(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isDistressBtnMessageEnabled(getState())) {
            dispatch(setDistressBtnMessageEnabled(false));
        } else {
            dispatch(setDistressBtnMessageEnabled(true));
        }
    };
}

/**
 * Sets the enabled state of the distress button.
 *
 * @param {boolean} enabled - The new enabled state.
 * @returns {Object}
 */
export function setDistressBtnEnabledState(enabled: boolean): any {
    return {
        type: SET_DISTRESSBTN_ENABLED,
        enabled
    };
}

/**
 * Sets the dimming value of the distress button.
 *
 * @param {number} value - The new dimming value.
 * @returns {Object}
 */
export function setDistressBtnDimmingValue(value: number): any {
    return {
        type: SET_DISTRESSBTN_DIMMING_VALUE,
        value
    };
}

/**
 * Sets the volume value of the distress button.
 *
 * @param {number} value - The new volume value.
 * @returns {Object}
 */
export function setDistressBtnVolumeValue(value: number): any {
    return {
        type: SET_DISTRESSBTN_VOLUME_VALUE,
        value
    };
}

/**
 * Sets the enabled state of the distress button message.
 *
 * @param {boolean} enabled - The new enabled state.
 * @returns {Object}
 */
export function setDistressBtnMessageEnabled(enabled: boolean): any {
    return {
        type: SET_DISTRESSBTN_MESSAGE_ENABLED,
        enabled
    };
}

/**
 * Sets the text of the distress button message.
 *
 * @param {string} text - The new message text.
 * @returns {Object}
 */
export function setDistressBtnMessageText(text: string): any {
    return {
        type: SET_DISTRESSBTN_MESSAGE_TEXT,
        text
    };
}
