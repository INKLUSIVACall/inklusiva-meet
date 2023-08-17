import { AnyAction } from 'redux';
import { IStore } from '../../app/types';
import MiddlewareRegistry from '../../base/redux/MiddlewareRegistry';
import { SET_USERDATA } from './actionTypes';
import jwtDecode from 'jwt-decode';
import logger from './logger';

/**
 * Middleware to parse token data upon setting a new room URL.
 *
 * @param {Store} store - The redux store.
 * @private
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case SET_USERDATA:
        return _setUserdata(store, next, action);
    }

    return next(action);
});

function _setUserdata(store: IStore, next: Function, action: AnyAction) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { jwt, type, ...actionPayload } = action;

    if (!Object.keys(actionPayload).length) {
        if (jwt) {
            let jwtPayload;

            try {
                jwtPayload = jwtDecode(jwt);
            } catch (e) {
                logger.error(e);
            }

            if (jwtPayload) {
                const { context, iss, sub } = jwtPayload;
                if (context) {
                    action.userData = _parseUserData(context.userData);
                }
            }
        } else if (typeof APP === 'undefined') {
            // The logic of restoring JWT overrides make sense only on mobile.
            // On Web it should eventually be restored from storage, but there's
            // no such use case yet.

            //const { user } = store.getState()['features/base/jwt'];

            //user && _undoOverwriteLocalParticipant(store, user);
        }
    }

    return next(action);
}

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
    },
    transcription: {
        active: boolean;
        fontSize: number;
        history: number;
    }
}

interface IUserData {
    support: ISupport;
    ui: IUI;
    video: IVideo;
    audio: IAudio;
    distressbutton: IDistressButton;
    assistant: IAssistant;
}

function _parseUserData(ud: IUserData) {
    const userData: {
        support: {
            eyesight?: string;
            hearing?: string;
            senses?: boolean;
            learning_difficulties?: boolean;
        },
        ui: {
            fontSize?: number;
            iconSize?: number;
            screenreader?: boolean;
            visualCues?: boolean;
            acousticCues?: boolean;
        },
        video: {
            otherParticipants?: boolean;
            contrast?: number;
            brightness?: number;
            dimming?: number;
            saturation?: number;
            zoom?: number;
            fps?: number;
        },
        audio: {
            otherParticipants?: boolean;
            volume?: number;
            highFrequency?: number;
            amplify?: number;
            balance?: number;
            background?: boolean;
            output?: string;
        },
        distressbutton: {
            active?: boolean;
            dimming?: number;
            volume?: number;
            message?: boolean;
            message_text?: string;
        },
        assistant: {
            signLanguage: {
                active?: boolean;
                display?: string;
                windowSize?: number;
            },
            transcription: {
                active?: boolean;
                fontSize?: number;
                history?: number;
            }
        }

    } = {support: {}, ui: {}, video: {}, audio: {}, distressbutton: {}, assistant: {signLanguage: {}, transcription: {}}};

    userData.support.eyesight = parseString(ud.support.eyesight);
    userData.support.hearing = parseString(ud.support.hearing);
    userData.support.senses = parseBoolean(ud.support.senses);
    userData.support.learning_difficulties = parseBoolean(ud.support.learning_difficulties);
    userData.ui.fontSize = parseNumber(ud.ui.fontSize);
    userData.ui.iconSize = parseNumber(ud.ui.iconSize);
    userData.ui.screenreader = parseBoolean(ud.ui.screenreader);
    userData.ui.visualCues = parseBoolean(ud.ui.visualCues);
    userData.ui.acousticCues = parseBoolean(ud.ui.acousticCues);
    userData.video.otherParticipants = parseBoolean(ud.video.otherParticipants);
    userData.video.contrast = parseNumber(ud.video.contrast);
    userData.video.brightness = parseNumber(ud.video.brightness);
    userData.video.dimming = parseNumber(ud.video.dimming);
    userData.video.saturation = parseNumber(ud.video.saturation);
    userData.video.zoom = parseNumber(ud.video.zoom);
    userData.video.fps = parseNumber(ud.video.fps);
    userData.audio.otherParticipants = parseBoolean(ud.audio.otherParticipants);
    userData.audio.volume = parseNumber(ud.audio.volume);
    userData.audio.highFrequency = parseNumber(ud.audio.highFreq);
    userData.audio.amplify = parseNumber(ud.audio.amplify);
    userData.audio.balance = parseNumber(ud.audio.balance);
    userData.audio.background = parseBoolean(ud.audio.background);
    userData.audio.output = parseString(ud.audio.output);
    userData.distressbutton.active = parseBoolean(ud.distressbutton.active);
    userData.distressbutton.dimming = parseNumber(ud.distressbutton.dimming);
    userData.distressbutton.volume = parseNumber(ud.distressbutton.volume);
    userData.distressbutton.message = parseBoolean(ud.distressbutton.message);
    userData.distressbutton.message_text = parseString(ud.distressbutton.message_text);
    userData.assistant.signLanguage.active = parseBoolean(ud.assistant.signLang.active);
    userData.assistant.signLanguage.display = parseString(ud.assistant.signLang.display);
    userData.assistant.signLanguage.windowSize = parseNumber(ud.assistant.signLang.windowSize);
    userData.assistant.transcription.active = parseBoolean(ud.assistant.transcription.active);
    userData.assistant.transcription.fontSize = parseNumber(ud.assistant.transcription.fontSize);
    userData.assistant.transcription.history = parseNumber(ud.assistant.transcription.history);

    return Object.keys(userData).length ? userData : undefined;
}

function parseNumber(value: any): number | null | undefined {
    if (typeof value === 'number' || value === null || value === undefined) {
        return value;
    }
    if (typeof value === 'string') {
        const parsedFloat = parseFloat(value.trim());
        return isNaN(parsedFloat) ? null : parsedFloat;
    }
    return value;
}

function parseString(value: any): string | null | undefined {
    if (typeof value === 'string' || value === null || value === undefined) {
        return value;
    }
    return String(value);
}

function parseBoolean(value: any): boolean | null | undefined {
    if(typeof value === 'boolean' || value === null || value === undefined) {
        return value;
    }

    if(typeof value === 'string') {
        return value.trim() === '1' ? true : false;
    }
    return Boolean(value);
}
