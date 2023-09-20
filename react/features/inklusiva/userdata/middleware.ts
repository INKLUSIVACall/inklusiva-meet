import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import { AnyAction } from 'redux';

import { IStore } from '../../app/types';
import MiddlewareRegistry from '../../base/redux/MiddlewareRegistry';

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
                const { context } = jwtPayload;

                if (context) {
                    action.userData = _parseUserData(context.userData);
                }
            }
        }
    }

    return next(action);
}

function _parseUserData(ud) {
    const userData: IUserData = {
        support: {},
        ui: {},
        video: {},
        audio: {},
        distressbutton: {},
        assistant: { signLang: {},
            transcription: {} }
    };

    userData.support.eyesight = _.toString(ud.support.eyesight);
    userData.support.hearing = _.toString(ud.support.hearing);
    userData.support.senses = toBoolean(ud.support.senses);
    userData.support.learning_difficulties = toBoolean(
        ud.support.learning_difficulties
    );
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
    userData.distressbutton.dimming = _.toNumber(ud.distressbutton.dimming);
    userData.distressbutton.volume = _.toNumber(ud.distressbutton.volume);
    userData.distressbutton.message = toBoolean(ud.distressbutton.message);
    userData.distressbutton.message_text = _.toString(
        ud.distressbutton.message_text
    );
    userData.assistant.signLang.active = toBoolean(
        ud.assistant.signLang.active
    );
    userData.assistant.signLang.display = _.toString(
        ud.assistant.signLang.display
    );
    userData.assistant.signLang.windowSize = _.toNumber(
        ud.assistant.signLang.windowSize
    );
    userData.assistant.transcription.active = toBoolean(
        ud.assistant.transcription.active
    );
    userData.assistant.transcription.fontSize = _.toNumber(
        ud.assistant.transcription.fontSize
    );
    userData.assistant.transcription.history = _.toNumber(
        ud.assistant.transcription.history
    );

    return Object.keys(userData).length ? userData : undefined;
}
