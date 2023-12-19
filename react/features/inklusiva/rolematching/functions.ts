import { IReduxState } from '../../app/types';

import { HIDE_ROLEMATCHING, SHOW_ROLEMATCHING } from './actionTypes';

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
