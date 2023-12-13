import { IReduxState, IStore } from "../../app/types";
import { IStateful } from "../../base/app/types";
import { toState } from "../../base/redux/functions";
import { SET_TRANSCRIPTION_ENABLED, SET_TRANSCRIPTION_FONTSIZE_VALUE, SET_TRANSCRIPTION_HISTORY_VALUE, UPDATE_TRANSCRIPT_LINK} from "./actionTypes";
import { isTranscriptionEnabled ,getFontSize, getHistory, getTranscriptionTabProps } from "./functions.web";

export function submitTranscriptionTabProps(newState: any){

    return(dispatch: IStore['dispatch'], getState: IStore['getState']) =>{
        const currentState = getTranscriptionTabProps(getState());
        if (newState.active !== currentState.active){
            dispatch(toggleActive());
        }
        if (newState.fontSize !== currentState.fontSize){
            dispatch(setFontSizeValue(newState.fontSize))
        }
        if (newState.history !== currentState.history){
            dispatch(setHistoryValue(newState.history));
        }
    };
}

export function toggleActive(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isTranscriptionEnabled(getState())) {
            dispatch(setTranscriptionEnabled(false));
        } else {
            dispatch(setTranscriptionEnabled(true));
        }
    };
}

export function setTranscriptionEnabled(transcriptionEnabled: boolean): any {

    return {
        type: SET_TRANSCRIPTION_ENABLED,
        transcriptionEnabled
    };
}

export function setFontSizeValue(fontSizeValue: number): any{
    return {
    type: SET_TRANSCRIPTION_FONTSIZE_VALUE,
    fontSizeValue
    }
}

export function setHistoryValue(historyValue: number): any{
    return{
        type: SET_TRANSCRIPTION_HISTORY_VALUE,
        historyValue
    }
}

/**
 * Action to update the link to the transcription.
 *
 * @param {string} link - The new link to the transcription.
 * @returns {Object}
 */
export function updateTranscriptLink(link: string) {
    return {
        type: UPDATE_TRANSCRIPT_LINK,
        link
    };
}
