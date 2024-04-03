import { IStore } from '../app/types';
import { toggleDialog } from '../base/dialog/actions';

import { setHistoryVisibility, setPopupVisibility } from './actions.any';
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
 * @returns {{
 *      type: SET_POPUP_VISIBILITY
 * }}
 */
export function toggleClosedCaptionPopup() {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const value = getState()['features/subtitles']._popupVisibility;

        dispatch(setPopupVisibility(!value));
    };
}

/**
 * Toggles the visibility of the cc panel.
 *
 * @returns {{
 *      type: SET_HISTORY_VISIBILITY
 * }}
 */
export function toggleCCHistoryPanel() {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const value = getState()['features/subtitles']._historyVisibility;

        dispatch(setHistoryVisibility(!value));
    };
}
