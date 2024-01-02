import { IStore } from '../../app/types';
import { resetParticipantBrightness, resetParticipantContrast, resetParticipantOpacitySetting, resetParticipantSaturation, resetParticipantZoomLevel } from '../../filmstrip/actions.web';
import { SET_USERVIDEO_INTERPRETERS } from '../uservideo/actionTypes';
import {
    setUserVideoBrightnessValue,
    setUserVideoContrastValue,
    setUserVideoDimmingValue,
    setUserVideoSaturationValue,
    setUserVideoZoomValue,
    toggleInterpreters,
    toggleOtherParticipants,
    toggleScreensharing
} from '../uservideo/actions';
import { areOtherParticipantsEnabled } from '../uservideo/functions';

import {
    SET_AUDIO_CUES_ENABLED_STATE,
    SET_UI_FONTSIZE,
    SET_UI_ICONSIZE,
    SET_VISUAL_CUES_ENABLED_STATE,
} from './actionTypes';
import { getUISettingsTabProps, isAcousticCuesEnabled, isVisualCuesEnabled } from './functions';

/**
 * Submits new values to the state inside the project store.
 *
 * @param {any} newState - The new settings.
 * @returns {Function}
 */
export function submitUISettingsTabProps(newState: {
    acousticCues: boolean;
    brightness: number;
    contrast: number;
    dimming: number;
    fontSize: number;
    iconSize: number;
    interpreter: boolean;
    otherParticipants: boolean;
    saturation: number;
    screenreader: boolean;
    screensharing: boolean;
    visualCues: boolean;
    zoom: number;
}) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getUISettingsTabProps(getState());

        if (newState.fontSize !== currentState.fontSize) {
            dispatch(setUISettingsFontSize(newState.fontSize));
        }
        if (newState.iconSize !== currentState.iconSize) {
            dispatch(setUISettingsIconSize(newState.iconSize));
        }
        if (newState.visualCues !== currentState.visualCues) {
            dispatch(setVisualCuesEnabledState(newState.visualCues));
        }
        if (newState.brightness !== currentState.brightness) {
            dispatch(setUserVideoBrightnessValue(newState.brightness));
            dispatch(resetParticipantBrightness());
        }
        if (newState.contrast !== currentState.contrast) {
            dispatch(setUserVideoContrastValue(newState.contrast));
            dispatch(resetParticipantContrast());
        }
        if (newState.dimming !== currentState.dimming) {
            dispatch(setUserVideoDimmingValue(newState.dimming));
            dispatch(resetParticipantOpacitySetting());
        }
        if (newState.otherParticipants !== currentState.otherParticipants) {
            dispatch(toggleOtherParticipants());
        }
        if (newState.interpreter !== currentState.interpreter) {
            dispatch(toggleInterpreters());
        }
        if (newState.screensharing !== currentState.screensharing) {
            dispatch(toggleScreensharing());
        }
        if (newState.saturation !== currentState.saturation) {
            dispatch(setUserVideoSaturationValue(newState.saturation));
            dispatch(resetParticipantSaturation());
        }
        if (newState.zoom !== currentState.zoom) {
            dispatch(setUserVideoZoomValue(newState.zoom));
            dispatch(resetParticipantZoomLevel());
        }
    };
}

/**
 * Sets the font size for the UI.
 *
 * @param {number} value - The new value.
 * @returns {Function}
 */
export function setUISettingsFontSize(value: number): any {
    return {
        type: SET_UI_FONTSIZE,
        value
    };
}

/**
 * Sets the icon size for the UI.
 *
 * @param {number} value - The new value.
 * @returns {Function}
 */
export function setUISettingsIconSize(value: number): any {
    return {
        type: SET_UI_ICONSIZE,
        value
    };
}

/**
 * Sets the enabled state of the audio-cues.
 *
 * @param {enabled} enabled - The new value.
 * @returns {Object}
 */
export function setAcousticCuesEnabledState(enabled: boolean): any {
    return {
        type: SET_AUDIO_CUES_ENABLED_STATE,
        enabled
    };
}

/**
 * Sets the enabled state of the visual-cues.
 *
 * @param {enabled} enabled - The new value.
 * @returns {Object}
 */
export function setVisualCuesEnabledState(enabled: boolean): any {
    return {
        type: SET_VISUAL_CUES_ENABLED_STATE,
        enabled
    };
}

/**
 * Toggles the active state of the distress button.
 *
 * @returns {Function}
 */
export function toggleAcousticCues(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isAcousticCuesEnabled(getState())) {
            setAcousticCuesEnabledState(false);
        } else {
            setAcousticCuesEnabledState(true);
        }
    };
}

/**
 * Toggles the active state of the distress button.
 *
 * @returns {Function}
 */
export function toggleVisualCues(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isVisualCuesEnabled(getState())) {
            setVisualCuesEnabledState(false);
        } else {
            setVisualCuesEnabledState(true);
        }
    };
}
