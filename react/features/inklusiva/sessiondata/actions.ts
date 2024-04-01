import { IStore } from '../../app/types';

import {
    SET_INDISTRESS_DISABLED,
    SET_INDISTRESS_ENABLED,
    SET_JIBRI_READY,
    SET_MEETING_NAME,
    SET_RECORDING_ENABLED
} from './actionTypes';
import { userInDistress } from './functions';

export function setInDistress() {
    return {
        type: SET_INDISTRESS_ENABLED
    };
}

export function setInNoDistress() {
    return {
        type: SET_INDISTRESS_DISABLED
    };
}

export function toggleInDistress() {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (userInDistress(getState())) {
            dispatch(setInNoDistress());
        } else {
            dispatch(setInDistress());
        }
    };
}

export function setMeetingName(meetingName: string) {
    return {
        type: SET_MEETING_NAME,
        meetingName
    };
}

export function setRecordingEnabled(enabled: boolean) {
    return {
        type: SET_RECORDING_ENABLED,
        enabled
    };
}

export function setJibriReady(ready: boolean) {
    return {
        type: SET_JIBRI_READY,
        ready
    };
}
