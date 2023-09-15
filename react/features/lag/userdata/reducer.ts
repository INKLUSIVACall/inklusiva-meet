import ReducerRegistry from "../../base/redux/ReducerRegistry";
import { equals } from "../../base/redux/functions";
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
import { SET_TRANSCRIPTION_ENABLED, SET_TRANSCRIPTION_FONTSIZE_VALUE, SET_TRANSCRIPTION_HISTORY_VALUE } from '../transcription/actionTypes';


interface ISupport {
    eyesight: string;
    hearing: string;
    senses: boolean;
    learning_difficulties: boolean;
}

interface IUI {
    fontSize: number;
    iconSize: number;
    screenreader: boolean;
    visualCues: boolean;
    acousticCues: boolean;
}

interface IVideo {
    otherParticipants: boolean;
    contrast: number;
    brightness: number;
    dimming: number;
    saturation: number;
    zoom: number;
    fps: number;
}

interface IAudio {
    otherParticipants: boolean;
    volume: number;
    highFreq: number;
    amplify: number;
    balance: number;
    background: boolean;
    output: string;
}

interface IDistressButton {
    active: boolean;
    dimming: number;
    volume: number;
    message: boolean;
    message_text: string;
}

interface IAssistant {
    signLang: {
        active: boolean;
        display: string;
        windowSize: number;
    };
    transcription: {
        active: boolean;
        fontSize: number;
        history: number;
    };
}

export interface IUserData {
    support: ISupport;
    ui: IUI;
    video: IVideo;
    audio: IAudio;
    distressbutton: IDistressButton;
    assistant: IAssistant;
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
ReducerRegistry.register<IUserData>(
    "features/lag/userdata",
    (
        state = {
            support: {},
            ui: {},
            video: {},
            audio: {},
            distressbutton: {},
            assistant: { signLang: {}, transcription: {} },
        },
        action,
    ): IUserData => {
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
                nextState.audio.otherParticipants = payload.enabled;
                return nextState;

            case SET_TRANSCRIPTION_ENABLED:
                nextState.assistant.transcription.active = payload.transcriptionEnabled;
                return nextState;
        
            case SET_TRANSCRIPTION_FONTSIZE_VALUE:    
                nextState.assistant.transcription.fontSize = payload.fontSizeValue;
                return nextState;

            case SET_TRANSCRIPTION_HISTORY_VALUE:
                nextState.assistant.transcription.history = payload.historyValue;
                return nextState;


        case SET_DISTRESSBTN_ENABLED:
            nextState.distressbutton.active = payload.enabled;
            return nextState;

        case SET_DISTRESSBTN_MESSAGE_ENABLED:
            nextState.distressbutton.message = payload.enabled;
            return nextState;
            
        case SET_DISTRESSBTN_DIMMING_VALUE:
            nextState.distressbutton.dimming = payload.value;
            return nextState;
            
        case SET_DISTRESSBTN_VOLUME_VALUE:
            nextState.distressbutton.volume = payload.value;
            return nextState;
            
        case SET_DISTRESSBTN_MESSAGE_TEXT:
            nextState.distressbutton.message_text = payload.text;
            return nextState;

        case SET_EYESIGHT_STRING:
            nextState.support.eyesight = payload.supportEyesightString;
            return nextState;
            
        case SET_HEARING_STRING:
            nextState.support.hearing = payload.supportHearingString;
            return nextState;

        case SET_SENSES_ENABLED:
            nextState.support.senses = payload.supportSensesEnabled;
            return nextState;

        case SET_LEARNING_DIFFICULTIES_ENABLED:
            nextState.support.learning_difficulties = payload.supportLearningDifficultiesEnabled;
            return nextState;

        case SET_SCREENREADER_ENABLED:
            nextState.ui.screenreader = payload.supportScreenreaderEnabled;
            return nextState;


        default:
            return state;
    }
});
