import { IStore } from '../../app/types';

import { SET_UI_FONTSIZE } from './actionTypes';
import { getUISettingsTabProps } from './functions';

/**
 * Submits new values to the state inside the project store.
 *
 * @param {any} newState - The new settings.
 * @returns {Function}
 */
export function submitUISettingsTabProps(newState: { fontSize: number; }) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getUISettingsTabProps(getState());

        console.log('newState', newState);
        if (newState.fontSize !== currentState.fontSize) {
            dispatch(setUISettingsFontSize(newState.fontSize));
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
