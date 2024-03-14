import { IStore } from '../app/types';
import { toggleDialog } from '../base/dialog/actions';
import ClosedCaptionButtonPopup from './components/web/ClosedCaptionButtonPopup';

import LanguageSelectorDialog from './components/web/LanguageSelectorDialog';

export * from './actions.any';

/**
 * Signals that the local user has toggled the LanguageSelector button.
 *
 * @returns {{
 *      type: UPDATE_TRANSLATION_LANGUAGE
 * }}
 */
export function toggleLanguageSelectorDialog() {
    return function(dispatch: IStore['dispatch']) {
        dispatch(toggleDialog(LanguageSelectorDialog));
    };
}

/**
 * Toggles the visibility of the cc popup.
 *
 * @returns {void}
 */
export function toggleClosedCaptionPopup() {
    return function(dispatch: IStore['dispatch']) {
        dispatch(toggleDialog(ClosedCaptionButtonPopup));
    };
}
