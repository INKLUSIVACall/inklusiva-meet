import ReducerRegistry from '../../base/redux/ReducerRegistry';
import { equals } from '../../base/redux/functions';
import { 
    SET_DISTRESSBTN_ENABLED, 
    SET_DISTRESSBTN_VOLUME_VALUE,
    SET_DISTRESSBTN_DIMMING_VALUE, 
    SET_DISTRESSBTN_MESSAGE_ENABLED,
    SET_DISTRESSBTN_MESSAGE_TEXT,
 } from '../distressbtn/actionTypes';
 import { SET_EYESIGHT_STRING, 
    SET_HEARING_STRING, 
    SET_LEARNING_DIFFICULTIES_ENABLED, 
    SET_SCREENREADER_ENABLED, 
    SET_SENSES_ENABLED 
} from '../support/actionTypes';

import { SET_USERDATA, SET_OTHERS_AUDIO_INPUT_ENABLED } from './actionTypes';

export interface IUserdataState {
    userData?: {
        name: string;
        support: {
            eyesight: string;
            hearing: string;
            senses: boolean;
            learning_difficulties: boolean;
        },
        ui: {
            fontSize: number;
            iconSize: number;
            screenreader: boolean;
            visualCues: boolean;
            acousticCues: boolean;
        },
        video: {
            otherParticipants: boolean;
            contrast: number;
            brightness: number;
            dimming: number;
            saturation: number;
            zoom: number;
            fps: number;
        },
        audio: {
            otherParticipants: boolean;
            volume: number;
            highFrequency: number;
            amplify: boolean;
            balance: number;
            background: boolean;
            output: string;
        },
        distressbutton: {
            active: boolean;
            dimming: number;
            volume: number;
            message: boolean;
            message_text: string;
        },
        assistant: {
            signLanguage: {
                active: boolean;
                display: string;
                windowSize: number;
            },
            transcription: {
                active: boolean;
                fontSize: number;
                history: number;
            }
        }
    };
}

/**
 * Reduces redux actions which affect the JSON Web Token (JWT) stored in the
 * redux store.
 *
 * @param {Object} state - The current redux state.
 * @param {Object} action - The redux action to reduce.
 * @returns {Object} The next redux state which is the result of reducing the
 * specified {@code action}.
 */
ReducerRegistry.register<IUserdataState>(
    'features/lag/userdata',
    (state = {}, action): IUserdataState => {
        const { type, ...payload } = action;
        const nextState = state;
        switch (action.type) {
        case SET_USERDATA: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, ...payload } = action;
            const nextState = {
                ...payload
            };

            return equals(state, nextState) ? state : nextState;
        }
        case SET_OTHERS_AUDIO_INPUT_ENABLED:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            nextState.userData.audio.otherParticipants = payload.enabled;
            return nextState;

        case SET_DISTRESSBTN_ENABLED:
            nextState.userData.distressbutton.active = payload.enabled;
            return nextState;


        case SET_DISTRESSBTN_MESSAGE_ENABLED:
            nextState.userData.distressbutton.message = payload.enabled;
            return nextState;
            
        case SET_DISTRESSBTN_DIMMING_VALUE:
            nextState.userData.distressbutton.dimming = payload.value;
            return nextState;
            
        case SET_DISTRESSBTN_VOLUME_VALUE:
            nextState.userData.distressbutton.volume = payload.value;
            return nextState;
            
        case SET_DISTRESSBTN_MESSAGE_TEXT:
            nextState.userData.distressbutton.message_text = payload.text;
            return nextState;

        case SET_EYESIGHT_STRING:
            nextState.userData.support.eyesight = payload.supportEyesightString;
            return nextState;
            
        case SET_HEARING_STRING:
            nextState.userData.support.hearing = payload.supportHearingString;
            return nextState;

        case SET_SENSES_ENABLED
            nextState.userData.support.senses = payload.supportSensesEnabled;
            return nextState;

        case SET_LEARNING_DIFFICULTIES_ENABLED
            nextState.userData.support.learning_difficulties = payload.supportLearningDifficultiesEnabled;
            return nextState;

        case SET_SCREENREADER_ENABLED
            nextState.userData.ui.screenreader = payload.supportScreenreaderEnabled;
            return nextState;


        default:
            return state;
    }
});
