import ReducerRegistry from '../../base/redux/ReducerRegistry';
import { equals } from '../../base/redux/functions';
import {
    SET_DISTRESSBTN_DIMMING_VALUE,
    SET_DISTRESSBTN_ENABLED,
    SET_DISTRESSBTN_MESSAGE_ENABLED,
    SET_DISTRESSBTN_MESSAGE_TEXT,
    SET_DISTRESSBTN_VOLUME_VALUE
} from '../distressbtn/actionTypes';
import {
    SET_SIGNLANG_DISPLAY_STRING,
    SET_SIGNLANG_ENABLED,
    SET_SIGNLANG_WINDOWSIZE_VALUE
} from '../signLang/actionTypes';
import {
    SET_EYESIGHT_STRING,
    SET_HEARING_STRING,
    SET_LEARNING_DIFFICULTIES_ENABLED,
    SET_SCREENREADER_ENABLED,
    SET_SENSES_ENABLED
} from '../support/actionTypes';
import {
    SET_TRANSCRIPTION_ENABLED,
    SET_TRANSCRIPTION_FONTSIZE_VALUE,
    SET_TRANSCRIPTION_HISTORY_VALUE
} from '../transcription/actionTypes';
import {
    SET_AUDIO_CUES_ENABLED_STATE,
    SET_UI_FONTSIZE,
    SET_UI_ICONSIZE,
    SET_VISUAL_CUES_ENABLED_STATE
} from '../uisettings/actionTypes';
import {
    SET_USERVIDEO_BRIGHTNESS,
    SET_USERVIDEO_CONTRAST,
    SET_USERVIDEO_DIMMING,
    SET_USERVIDEO_FPS,
    SET_USERVIDEO_OTHER_PARTICIPANTS,
    SET_USERVIDEO_SATURATION,
    SET_USERVIDEO_ZOOM
} from '../uservideo/actionTypes';

import { SET_OTHERS_AUDIO_INPUT_ENABLED, SET_USERDATA } from './actionTypes';

interface ISupport {
    eyesight?: string;
    hearing?: string;
    learning_difficulties?: boolean;
    senses?: boolean;
}

interface IUI {
    acousticCues?: boolean;
    fontSize?: number;
    iconSize?: number;
    screenreader?: boolean;
    visualCues?: boolean;
}

interface IVideo {
    brightness?: number;
    contrast?: number;
    dimming?: number;
    fps?: number;
    otherParticipants?: boolean;
    saturation?: number;
    zoom?: number;
}

interface IAudio {
    amplify?: number;
    background?: boolean;
    balance?: number;
    highFreq?: number;
    otherParticipants?: boolean;
    output?: string;
    volume?: number;
}

interface IDistressButton {
    active?: boolean;
    dimming?: number;
    message?: boolean;
    message_text?: string;
    volume?: number;
}

interface IAssistant {
    signLang: {
        active?: boolean;
        display?: string;
        windowSize?: number;
    };
    transcription: {
        active?: boolean;
        fontSize?: number;
        history?: number;
    };
}

export interface IUserData {
    assistant: IAssistant;
    audio: IAudio;
    distressbutton: IDistressButton;
    support: ISupport;
    ui: IUI;
    video: IVideo;
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
    'features/inklusiva/userdata',
    (
            state = {
                support: {},
                ui: {},
                video: {},
                audio: {},
                distressbutton: {},
                assistant: { signLang: {},
                    transcription: {} }
            },
            action
    ): IUserData => {
        const { ...payload } = action;

        let nextState = state;

        switch (action.type) {
        case SET_USERDATA: {
            nextState = {
                ...payload.userData
            };

            return equals(state, nextState) ? state : nextState;
        }
        case SET_OTHERS_AUDIO_INPUT_ENABLED:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            nextState.audio.otherParticipants = payload.enabled;

            return nextState;

        case SET_SIGNLANG_ENABLED:
            nextState.assistant.signLang.active = payload.enabled;

            return nextState;

        case SET_SIGNLANG_DISPLAY_STRING:
            nextState.assistant.signLang.display = payload.displayValue;

            return nextState;

        case SET_SIGNLANG_WINDOWSIZE_VALUE:
            nextState.assistant.signLang.windowSize = payload.value;

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

        case SET_UI_FONTSIZE: {
            const root = document.querySelector(':root') as HTMLElement;

            root.style.fontSize = _parseFontSize(payload.value);
            nextState.ui.fontSize = payload.value;

            return nextState;
        }

        case SET_UI_ICONSIZE: {
            const root = document.querySelector(':root') as HTMLElement;

            root.style.setProperty('--icon-size-factor', _parseIconSize(payload.value));
            nextState.ui.iconSize = payload.value;

            return nextState;
        }

        case SET_VISUAL_CUES_ENABLED_STATE:
            nextState.ui.visualCues = payload.enabled;

            return nextState;

        case SET_AUDIO_CUES_ENABLED_STATE:
            nextState.ui.acousticCues = payload.enabled;

            return nextState;

        case SET_USERVIDEO_BRIGHTNESS:
            nextState.video.brightness = payload.value;

            return nextState;

        case SET_USERVIDEO_CONTRAST:
            nextState.video.contrast = payload.value;

            return nextState;

        case SET_USERVIDEO_DIMMING:
            nextState.video.dimming = payload.value;

            return nextState;

        case SET_USERVIDEO_FPS:
            nextState.video.fps = payload.value;

            return nextState;

        case SET_USERVIDEO_OTHER_PARTICIPANTS:
            nextState.video.otherParticipants = payload.enabled;

            return nextState;

        case SET_USERVIDEO_SATURATION:
            nextState.video.saturation = payload.value;

            return nextState;

        case SET_USERVIDEO_ZOOM:
            nextState.video.zoom = payload.value;

            return nextState;

        default:
            return state;
        }
    }
);

/**
 * Parses the font size value that is supplied via userData to a valid CSS-value.
 *
 * @param {any} fontSizeValue - The font size value to parse.
 *
 * @returns {string}
 */
function _parseFontSize(fontSizeValue: number) {
    switch (fontSizeValue) {
    case 0:
        return '75%';
        break;
    case 1:
        return '100%';
        break;
    case 2:
        return '125%';
        break;
    default:
        return '100%';
    }
}

/**
 * Parses the font size value that is supplied via userData to a valid CSS-value.
 *
 * @param {number} iconSizeValue - The icon size value to parse.
 * @returns {number}
 */
function _parseIconSize(iconSizeValue: number) {
    switch (iconSizeValue) {
    case 0:
        return '0.75';
        break;
    case 1:
        return '1';
        break;
    case 2:
        return '1.5';
        break;
    default:
        return '1';
    }
}

