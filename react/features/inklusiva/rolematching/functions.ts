import { IReduxState } from '../../app/types';

import { HIDE_ASSISTANCE_PANEL, HIDE_ROLEMATCHING, SHOW_ASSISTANCE_PANEL, SHOW_ROLEMATCHING, TOGGLE_ASSISTANCE_PANEL } from './actionTypes';

/**
 * Returns the visibility state of the role-matching menu.
 *
 * @param {Object} state - The state of the application.
 * @returns {boolean}
 */
export function getRoleMatchingVisibility(state: IReduxState) {
    return state['features/inklusiva/rolematching']?.visible || false;
}

export function showRoleMatching() {
    return {
        type: SHOW_ROLEMATCHING
    };
}

export function hideRoleMatching() {
    return {
        type: HIDE_ROLEMATCHING
    };
}

/**
 * Returns the visibility state of the assistance panel.
 *
 * @param {Object} state - The state of the application.
 * @returns {boolean}
 */
export function getAssistancePanelVisibility(state: IReduxState) {
    return state['features/inklusiva/rolematching']?.assistancePanel || false;
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
