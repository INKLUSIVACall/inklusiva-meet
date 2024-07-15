import {
    SET_AUDIO_AMPLIFY,
    SET_AUDIO_BALANCE,
    SET_AUDIO_HIGH_FREQUENCIES,
    SET_AUDIO_OTHERS_VOLUME
} from './actionTypes';

/**
 * Sets the volume of other participants.
 *
 * @param {number} value - The new value.
 * @returns {property}
 */
export function setOthersVolume(value: number): any {
    return {
        type: SET_AUDIO_OTHERS_VOLUME,
        value
    };
}

export function setHighFreq(value: number): any {
    return {
        type: SET_AUDIO_HIGH_FREQUENCIES,
        value
    };
}

export function setAmplify(value: number): any {
    return {
        type: SET_AUDIO_AMPLIFY,
        value
    };
}

export function setBalance(value: number): any {
    return {
        type: SET_AUDIO_BALANCE,
        value
    };
}
