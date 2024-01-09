import { IReduxState } from '../../app/types';

import { HIDE_ASSISTANCE_PANEL, SHOW_ASSISTANCE_PANEL, TOGGLE_ASSISTANCE_PANEL } from './actionTypes';

/**
 * Returns the visibility state of the assistance panel.
 *
 * @param {Object} state - The state of the application.
 * @returns {boolean}
 */
export function getAssistancePanelVisibility(state: IReduxState) {
    return state['features/inklusiva/rolematching']?.assistancePanelVisible || false;
}

export function toggleAssistancePanel() {
    return {
        type: TOGGLE_ASSISTANCE_PANEL
    };
}

export function showAssistancePanel() {
    return {
        type: SHOW_ASSISTANCE_PANEL
    };
}

export function hideAssistancePanel() {
    return {
        type: HIDE_ASSISTANCE_PANEL
    };
}
