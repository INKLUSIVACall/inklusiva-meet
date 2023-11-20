import ReducerRegistry from '../../base/redux/ReducerRegistry';

import { TOGGLE_ROLEMATCHIN_VISIBLE } from './actionTypes';

export interface IRoleMatchingState {

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
        visible: false
    };
}

ReducerRegistry.register<IRoleMatchingState>(
    'features/inklusiva/rolematching',
    (state = _getInitialState(), action: IRoleMatchingAction): IRoleMatchingState => {
        switch (action.type) {
        case TOGGLE_ROLEMATCHIN_VISIBLE:
            return {
                ...state,
                visible: !state.visible
            };
        }

        return state;
    }
);
