import {
    SET_USERDATA,
    TOGGLE_OWN_AUDIO_INPUT,
    SET_OTHERS_AUDIO_INPUT_ENABLED
} from './actionTypes';
import { IStore } from '../../app/types';
import {
    isOwnAudioInputEnabled,
    isOthersAudioInputEnabled
 } from './functions';


/**
 * Stores a specific JSON Web Token (JWT) into the redux store.
 *
 * @param {string} [jwt] - The JSON Web Token (JWT) to store.
 * @returns {{
 *     type: SET_TOKEN_DATA,
 *     jwt: (string|undefined)
 * }}
 */
export function setUserdata(jwt?: string) {
    return {
        type: SET_USERDATA,
        jwt
    };
}

export function toggleOthersAudioInput(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isOthersAudioInputEnabled(getState())) {
            dispatch(setOthersAudioInputEnabledState(false));
        } else {
            dispatch(setOthersAudioInputEnabledState(true));
        }
    };
}

export function setOthersAudioInputEnabledState(enabled: boolean): any {
    return {
        type: SET_OTHERS_AUDIO_INPUT_ENABLED,
        enabled
    };
}