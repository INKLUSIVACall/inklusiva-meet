import ReducerRegistry from '../../base/redux/ReducerRegistry';

import {
    ASSISTANCE_BREAKOUT_ROOM_HANDLED,
    ASSISTANCE_BREAKOUT_ROOM_UNHANDLED,
    HIDE_ASSISTANCE_PANEL,
    SHOW_ASSISTANCE_PANEL,
    TOGGLE_ASSISTANCE_PANEL
} from './actionTypes';

export interface IRoleMatchingState {

    /**
     * The indicator that determines whether the assistance panel is visible.
     */
    assistancePanelVisible: boolean;

    /**
     * The indicator that determines whether the local participant was sent to
     * the breakout room.
     */
    breakOutRoomHandled: boolean;

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

        assistancePanelVisible: false,

        breakOutRoomHandled: false
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
        case ASSISTANCE_BREAKOUT_ROOM_HANDLED:
            return {
                ...state,
                breakOutRoomHandled: true
            };
        case ASSISTANCE_BREAKOUT_ROOM_UNHANDLED:
            return {
                ...state,
                breakOutRoomHandled: false
            };
        }

        return state;
    }
);
