import { IStore } from '../../app/types';
import {
    setTranscriptionFontSizeValue,
    setTranscriptionHistoryValue,
    toggleActiveTranscription
} from '../transcription/actions.web';

import { SET_SIGNLANG_DISPLAY_STRING, SET_SIGNLANG_ENABLED, SET_SIGNLANG_WINDOWSIZE_VALUE } from './actionTypes';
import { getSignLangTabProps, isSignLangEnabled } from './functions.web';

export function submitSignLangTabProps(newState: any) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getSignLangTabProps(getState());

        if (newState.signLangActive !== currentState.signLangActive) {
            dispatch(toggleActive());
        }
        if (newState.signLangDisplay !== currentState.signLangDisplay) {
            dispatch(setDisplayString(newState.signLangDisplay));
        }
        if (newState.signLangWindowSize !== currentState.signLangWindowSize) {
            dispatch(setWindowSize(newState.signLangWindowSize));
        }

        if (newState.transcriptionActive !== currentState.transcriptionActive) {
            dispatch(toggleActiveTranscription());
        }
        if (newState.transcriptionFontSize !== currentState.transcriptionFontSize) {
            dispatch(setTranscriptionFontSizeValue(newState.transcriptionFontSize));
        }
        if (newState.transcriptionHistory !== currentState.transcriptionHistory) {
            dispatch(setTranscriptionHistoryValue(newState.transcriptionHistory));
        }
    };
}

export function toggleActive(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isSignLangEnabled(getState())) {
            dispatch(setSignLangEnabledState(false));
        } else {
            dispatch(setSignLangEnabledState(true));
        }
    };
}

export function setSignLangEnabledState(enabled: boolean): any {
    return {
        type: SET_SIGNLANG_ENABLED,
        enabled
    };
}

export function setDisplayString(displayValue: string): any {
    return {
        type: SET_SIGNLANG_DISPLAY_STRING,
        displayValue
    };
}

export function setWindowSize(value: number): any {
    return {
        type: SET_SIGNLANG_WINDOWSIZE_VALUE,
        value
    };
}
