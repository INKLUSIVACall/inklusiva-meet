import * as jwtDecode from 'jwt-decode';
import _ from 'lodash';
import { AnyAction } from 'redux';

import { IStore } from '../../app/types';
import MiddlewareRegistry from '../../base/redux/MiddlewareRegistry';
import { setJibriReady, setMeetingName, setRecordingEnabled } from '../sessiondata/actions';
import { updateTranscriptLink } from '../transcription/actions.web';

import { SET_USERDATA } from './actionTypes';
import logger from './logger';
import { IUserData } from './reducer';

const toBoolean = function(value: any) {
    if (typeof value === 'boolean') {
        return value;
    }
    const stringValue = _.toString(value).toLowerCase();

    return stringValue === 'true' || stringValue === '1';
};

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

/**
 * Sets user data.
 *
 * @param {IStore} store - The redux store.
 * @param {Function} next - The redux next function.
 * @param {AnyAction} action - The redux action.
 * @returns {AnyAction}
 */
function _setUserdata(store: IStore, next: Function, action: AnyAction) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { jwt, type, ...actionPayload } = action;

    if (!Object.keys(actionPayload).length) {
        if (jwt) {
            let jwtPayload: any;

            try {
                jwtPayload = jwtDecode(jwt);
            } catch (e) {
                logger.error(e);
            }

            if (jwtPayload) {
                const { context } = jwtPayload;

                if (context) {
                    action.userData = _parseUserData(context.userData);

                    // eslint-disable-next-line max-depth
                    if (context.meetingName) {
                        store.dispatch(setMeetingName(context.meetingName));
                    }

                    // eslint-disable-next-line max-depth
                    if (context.recordingEnabled && context.userData.role === 'moderator') {
                        store.dispatch(setRecordingEnabled(context.recordingEnabled));

                        const state = store.getState();
                        const { jibriInstanceCheck } = state['features/base/config'];

                        // eslint-disable-next-line max-depth
                        if (jibriInstanceCheck) {
                            setInterval(() => {
                                fetch(jibriInstanceCheck.url)
                                    .then(response => {
                                        if (response.status === 200) {
                                            return response.json();
                                        }
                                        store.dispatch(setJibriReady(false));
                                    })
                                    .then(response => {
                                        store.dispatch(setJibriReady(response.ready));
                                    });
                            }, jibriInstanceCheck.interval);
                        }
                    }

                    // eslint-disable-next-line max-depth
                    if (context.userData.readlink) {
                        store.dispatch(updateTranscriptLink(context.userData.readlink));
                    }

                    // Add event listener to set the font size on DOMContentLoaded.
                    window.addEventListener('DOMContentLoaded', () => {
                        const root = document.querySelector(':root') as HTMLElement;

                        root.style.fontSize = _parseFontSize(context.userData.ui.fontSize);
                        root.style.setProperty('--icon-size-factor', _parseIconSize(context.userData.ui.iconSize));
                    });
                }
            }
        } else {
            // Sets default userdata object if no jwt is provided.
            action.userData = _getDefaultUserData();
        }
    }

    return next(action);
}

/**
 * Parses the user data that is supplied via JWT to a valid {@code IUserData}.
 *
 * @param {IUserData} ud - The user data to parse.
 * @returns {Object} - The parsed user data.
 */
function _parseUserData(ud: IUserData) {
    const userData: IUserData = {
        meeting_id: '',
        support: {},
        ui: {},
        video: {},
        audio: {},
        distressbutton: {},
        assistant: { signLang: {},
            transcription: {} },
        transcriptionLink: ''
    };

    userData.support.eyesight = _.toString(ud.support.eyesight);
    userData.support.hearing = _.toString(ud.support.hearing);
    userData.support.senses = toBoolean(ud.support.senses);
    userData.support.learning_difficulties = toBoolean(ud.support.learning_difficulties);
    userData.ui.fontSize = _.toNumber(ud.ui.fontSize);
    userData.ui.iconSize = _.toNumber(ud.ui.iconSize);
    userData.ui.screenreader = toBoolean(ud.ui.screenreader);
    userData.ui.visualCues = toBoolean(ud.ui.visualCues);
    userData.ui.acousticCues = toBoolean(ud.ui.acousticCues);
    userData.video.otherParticipants = toBoolean(ud.video.otherParticipants);
    userData.video.contrast = _.toNumber(ud.video.contrast);
    userData.video.brightness = _.toNumber(ud.video.brightness);
    userData.video.dimming = _.toNumber(ud.video.dimming);
    userData.video.saturation = _.toNumber(ud.video.saturation);
    userData.video.zoom = _.toNumber(ud.video.zoom);
    userData.video.fps = _.toNumber(ud.video.fps);
    userData.audio.otherParticipants = toBoolean(ud.audio.otherParticipants);
    userData.audio.volume = _.toNumber(ud.audio.volume);
    userData.audio.highFreq = _.toNumber(ud.audio.highFreq);
    userData.audio.amplify = _.toNumber(ud.audio.amplify);
    userData.audio.balance = _.toNumber(ud.audio.balance);
    userData.audio.background = toBoolean(ud.audio.background);
    userData.audio.output = _.toString(ud.audio.output);
    userData.distressbutton.active = toBoolean(ud.distressbutton.active);
    userData.distressbutton.dimming = _.toNumber(ud.distressbutton.dimming ?? 0);
    userData.distressbutton.volume = _.toNumber(ud.distressbutton.volume ?? 0);
    userData.distressbutton.message = toBoolean(ud.distressbutton.message);
    userData.distressbutton.message_text = _.toString(ud.distressbutton.message_text);
    userData.assistant.signLang.active = toBoolean(ud.assistant.signLang.active);
    userData.assistant.signLang.display = _.toString(ud.assistant.signLang.display);
    userData.assistant.signLang.windowSize = _.toNumber(ud.assistant.signLang.windowSize);
    userData.assistant.transcription.active = toBoolean(ud.assistant.transcription.active);
    userData.assistant.transcription.fontSize = _.toNumber(ud.assistant.transcription.fontSize);
    userData.assistant.transcription.history = _.toNumber(ud.assistant.transcription.history);
    userData.transcriptionLink = _.toString(ud.transcriptionLink ?? '');
    userData.meeting_id = _.toString(ud.meeting_id ?? '');

    if (userData.meeting_id !== '') {
        localStorage.setItem('inklusiva_meeting_id', userData.meeting_id);
    }

    return Object.keys(userData).length ? userData : undefined;
}

/**
 * Returns the default user data.
 *
 * @returns {Object}
 */
function _getDefaultUserData() {
    const userData: IUserData = {
        meeting_id: '',
        support: {},
        ui: {},
        video: {},
        audio: {},
        distressbutton: {},
        assistant: { signLang: {},
            transcription: {} },
        transcriptionLink: ''
    };

    userData.support.eyesight = _.toString('normal');
    userData.support.hearing = _.toString('normal');
    userData.support.senses = toBoolean(false);
    userData.support.learning_difficulties = toBoolean(false);
    userData.ui.fontSize = _.toNumber(1);
    userData.ui.iconSize = _.toNumber(1);
    userData.ui.screenreader = toBoolean(false);
    userData.ui.visualCues = toBoolean(true);
    userData.ui.acousticCues = toBoolean(true);
    userData.video.otherParticipants = toBoolean(true);
    userData.video.contrast = _.toNumber(100);
    userData.video.brightness = _.toNumber(100);
    userData.video.dimming = _.toNumber(0);
    userData.video.saturation = _.toNumber(100);
    userData.video.zoom = _.toNumber(100);
    userData.video.fps = _.toNumber(15);
    userData.audio.otherParticipants = toBoolean(true);
    userData.audio.volume = _.toNumber(1);
    userData.audio.highFreq = _.toNumber(0);
    userData.audio.amplify = _.toNumber(0);
    userData.audio.balance = _.toNumber(2);
    userData.audio.background = toBoolean(false);
    userData.audio.output = _.toString('stereo');
    userData.distressbutton.active = toBoolean(false);
    userData.distressbutton.dimming = _.toNumber(0);
    userData.distressbutton.volume = _.toNumber(0);
    userData.distressbutton.message = toBoolean(false);
    userData.distressbutton.message_text = _.toString(
        'Liebe Begleitperson, ich habe gerade den Notfall-Button geklickt. Ich möchte (…)'
    );
    userData.assistant.signLang.active = toBoolean(true);
    userData.assistant.signLang.display = _.toString('tile');
    userData.assistant.signLang.windowSize = _.toNumber(100);
    userData.assistant.transcription.active = toBoolean(false);
    userData.assistant.transcription.fontSize = _.toNumber(0);
    userData.assistant.transcription.history = _.toNumber(0);
    userData.transcriptionLink = _.toString('');
    userData.meeting_id = _.toString('');

    if (userData.meeting_id !== '') {
        localStorage.setItem('inklusiva_meeting_id', userData.meeting_id);
    }

    return Object.keys(userData).length ? userData : undefined;
}

/**
 * Parses the font size value that is supplied via userData to a valid CSS-value.
 *
 * @param {any} fontSizeValue - The font size value to parse.
 *
 * @returns {string}
 */
function _parseFontSize(fontSizeValue: string | number) {
    switch (fontSizeValue) {
    case 0:
    case '0':
        return '75%';
        break;
    case 1:
    case '1':
        return '100%';
        break;
    case 2:
    case '2':
        return '125%';
        break;
    default:
        return '100%';
        break;
    }
}

/**
 * Parses the icon size value that is supplied via userData to a valid CSS-value.
 *
 * @param {number} iconSizeValue - The icon size value to parse.
 * @returns {number}
 */
function _parseIconSize(iconSizeValue: number | string) {
    switch (iconSizeValue) {
    case 0:
    case '0':
        return '0.75';
    case 1:
    case '1':
        return '1';
    case 2:
    case '2':
        return '1.5';
    default:
        return '1';
    }
}
