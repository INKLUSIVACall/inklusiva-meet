import { IReduxState } from '../../app/types';

/**
 * Returns the visibility state of the role-matching menu.
 *
 * @param {Object} state - The state of the application.
 * @returns {boolean}
 */
export function getRoleMatchingVisibility(state: IReduxState) {
    return state['features/inklusiva/rolematching']?.visible || false;
}
