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
                //logger.error(e);
            }

            if (jwtPayload) {
                const { context, iss, sub } = jwtPayload;
                debugger;
                if (context) {
                    action.userData = _parseUserData(context.userData);
                }
                debugger;
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
}

interface IUserData {
    support: ISupport;
}

function _parseUserData(ud: IUserData) {
    const userData: {
        support: {
            sehen?: string;
            hören?: string;
        }
    } = {support: {}};

    if (typeof ud.support.eyesight === 'string') {
        userData.support.sehen = ud.support.eyesight.trim();
    }

    if (typeof ud.support.hearing === 'string') {
        userData.support.hören = ud.support.hearing.trim();
    }
    return Object.keys(userData).length ? userData : undefined;
}