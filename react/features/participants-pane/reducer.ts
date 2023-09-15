import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    PARTICIPANTS_PANE_CLOSE,
    PARTICIPANTS_PANE_OPEN,
    SET_VOLUME,
    SET_FREQUENCY_FILTER_SETTING,
    SET_PARTICIPANT_OPACITY,
    SET_PARTICIPANT_ZOOM_LEVEL
} from './actionTypes';
import { REDUCER_KEY } from './constants';

export interface IParticipantsPaneState {
    isOpen: boolean;
    participantsVolume: {
        [participantId: string]: number;        
    };
    participantsFrequencySetting: {
        [participantId: string]: number;
    };
    participantsOpacity: {
        [participantId: string]: number;
    };
    localOpacity: number|null;
    participantZoomLevel: {
        [participantId: string]: number;
    };
}

const DEFAULT_STATE = {
    isOpen: false,
    participantsVolume: {},
    participantsFrequencySetting: {},
    participantsOpacity: {},
    localOpacity: 1,
    participantZoomLevel: {}
};

/**
 * Listen for actions that mutate the participants pane state.
 */
ReducerRegistry.register(
    REDUCER_KEY, (state: IParticipantsPaneState = DEFAULT_STATE, action) => {
        switch (action.type) {
        case PARTICIPANTS_PANE_CLOSE:
            return {
                ...state,
                isOpen: false
            };

        case PARTICIPANTS_PANE_OPEN:
            return {
                ...state,
                isOpen: true
            };

        case SET_VOLUME:
            return {
                ...state,
                participantsVolume: {
                    ...state.participantsVolume,

                    [action.participantId]: action.volume
                }
            };
        case SET_FREQUENCY_FILTER_SETTING:
            return {
                ...state,
                participantsFrequencySetting: {
                    ...state.participantsFrequencySetting,

                    [action.participantId]: action.setting
                }
            }
        case SET_PARTICIPANT_OPACITY:
            if (action.local) {
                return {
                    ...state,
                    localOpacity: action.opacity
                }
            } else {
                return {
                    ...state,
                    participantsOpacity: {
                        ...state.participantsOpacity,

                        [action.participantId]: action.opacity
                    }
                };
            }
        case SET_PARTICIPANT_ZOOM_LEVEL:
            return {
                ...state,
                participantZoomLevel: {
                    ...state.participantZoomLevel,

                    [action.participantId]: action.zoomLevel
                }
            }
        default:
            return state;
        }
    }
);
