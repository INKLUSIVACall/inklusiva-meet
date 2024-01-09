import ReducerRegistry from '../../base/redux/ReducerRegistry';

import { HIDE_ASSISTANCE_PANEL, SHOW_ASSISTANCE_PANEL, TOGGLE_ASSISTANCE_PANEL } from './actionTypes';

export interface IRoleMatchingState {

    /**
     * The indicator that determines whether the assistance panel is visible.
     */
    assistancePanelVisible: boolean;

    /**
     * The indicator that determines whether the rolematching menu is visible.
     */
    visible: boolean;
}
export interface IRoleMatchingAction extends Partial<IRoleMatchingState> {

    /**
     * The action type.
     */
    type: string;
}

/**
 * Returns initial state for reactions' part of Redux store.
 *
 * @private
 * @returns {IReactionsState}
 */
function _getInitialState(): IRoleMatchingState {
    return {
        visible: false,
        assistancePanelVisible: false
    };
}

ReducerRegistry.register<IRoleMatchingState>(
    'features/inklusiva/rolematching',
    (state = _getInitialState(), action: IRoleMatchingAction): IRoleMatchingState => {
        switch (action.type) {
        case TOGGLE_ASSISTANCE_PANEL:
            return {
                ...state,
                assistancePanelVisible: !state.assistancePanelVisible
            };
        case SHOW_ASSISTANCE_PANEL:
            return {
                ...state,
                assistancePanelVisible: true
            };
        case HIDE_ASSISTANCE_PANEL:
            return {
                ...state,
                assistancePanelVisible: false
            };
        }

        return state;
    }
);
