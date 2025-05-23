import { AnyAction } from 'redux';

import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

import {
    CLEAR_TOOLBOX_TIMEOUT,
    SET_FULL_SCREEN,
    SET_TOOLBOX_TIMEOUT,
    OPEN_HELP_DIALOG
} from './actionTypes';

import './subscriber.web';
import HelpDialog from './components/HelpDialog';

import { openDialog } from '../base/dialog/actions';

/**
 * Middleware which intercepts Toolbox actions to handle changes to the
 * visibility timeout of the Toolbox.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const { dispatch } = store;

    switch (action.type) {
    case CLEAR_TOOLBOX_TIMEOUT: {
        const { timeoutID } = store.getState()['features/toolbox'];

        clearTimeout(timeoutID ?? undefined);
        break;
    }

    case SET_FULL_SCREEN:
        return _setFullScreen(next, action);

    case SET_TOOLBOX_TIMEOUT: {
        const { timeoutID } = store.getState()['features/toolbox'];
        const { handler, timeoutMS }: { handler: Function; timeoutMS: number; } = action;

        clearTimeout(timeoutID ?? undefined);
        action.timeoutID = setTimeout(handler, timeoutMS);

        break;
    }

    case OPEN_HELP_DIALOG: {
        dispatch(openDialog(HelpDialog));

        break;
    }
    }

    return next(action);
});

type DocumentElement = {
    requestFullscreen?: Function;
    webkitRequestFullscreen?: Function;
};

/**
 * Makes an external request to enter or exit full screen mode.
 *
 * @param {Dispatch} next - The redux dispatch function to dispatch the
 * specified action to the specified store.
 * @param {Action} action - The redux action SET_FULL_SCREEN which is being
 * dispatched in the specified store.
 * @private
 * @returns {Object} The value returned by {@code next(action)}.
 */
function _setFullScreen(next: Function, action: AnyAction) {
    const result = next(action);

    const { fullScreen } = action;

    if (fullScreen) {
        const documentElement: DocumentElement
            = document.documentElement || {};

        if (typeof documentElement.requestFullscreen === 'function') {
            documentElement.requestFullscreen();
        } else if (
            typeof documentElement.webkitRequestFullscreen === 'function') {
            documentElement.webkitRequestFullscreen();
        }

        return result;
    }

    if (typeof document.exitFullscreen === 'function') {
        document.exitFullscreen();
    } else if (typeof document.webkitExitFullscreen === 'function') {
        document.webkitExitFullscreen();
    }

    return result;
}
