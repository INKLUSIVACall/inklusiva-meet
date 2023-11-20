import {
    TOGGLE_ROLEMATCHIN_VISIBLE
} from './actionTypes';
import { IRoleMatchingAction } from './reducer';

/**
 * Toggles the visibility of the reactions menu.
 *
 * @returns {void}
 */
export function toggleRoleMatchingMenuVisibility(): IRoleMatchingAction {
    return {
        type: TOGGLE_ROLEMATCHIN_VISIBLE
    };
}
