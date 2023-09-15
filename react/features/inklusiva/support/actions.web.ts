import { IReduxState, IStore } from "../../app/types";
import { IStateful } from "../../base/app/types";
import { toState } from "../../base/redux/functions";
import { SET_EYESIGHT_STRING, SET_HEARING_STRING, SET_LEARNING_DIFFICULTIES_ENABLED, SET_SCREENREADER_ENABLED, SET_SENSES_ENABLED } from "./actionTypes";
import { getEyesight, getHearing, isScreenreaderEnabled, areLearningDifficultiesEnabled, areSensesEnabled,getSupportTabProps } from "./functions.web";

export function submitSupportTabProps(newState: any){

    return(dispatch: IStore['dispatch'], getState: IStore['getState']) =>{
        const currentState = getSupportTabProps(getState());
        if (newState.eyesight !== currentState.eyesight){
            dispatch(setEyesightString(newState.eyesight));
        }
        if (newState.hearing !== currentState.hearing){
            dispatch(setHearingString(newState.hearing))
        }
        if (newState.senses !== currentState.senses){
            dispatch(toggleSenses());
        }
        if (newState.learning_difficulties !== currentState.learning_difficulties){
            dispatch(toggleLearningDifficiulties());
        }
        if (newState.screenreader !== currentState.screenreader){
            dispatch(toggleScreenreader());
        }
    };
}

export function setEyesightString(supportEyesightString: string): any{
    return {
    type: SET_EYESIGHT_STRING,
    supportEyesightString
    }
}

export function setHearingString(supportHearingString: string): any{
    return{
        type: SET_HEARING_STRING,
        supportHearingString
    }
}

export function toggleSenses(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (areSensesEnabled(getState())) {
            dispatch(setSensesEnabled(false));
        } else {
            dispatch(setSensesEnabled(true));
        }
    };
}

export function setSensesEnabled(supportSensesEnabled: boolean): any {
    
    return {
        type: SET_SENSES_ENABLED,
        supportSensesEnabled
    };
}

export function toggleLearningDifficiulties(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (areLearningDifficultiesEnabled(getState())) {
            dispatch(setLearningDifficultiesEnabled(false));
        } else {
            dispatch(setLearningDifficultiesEnabled(true));
        }
    };
}

export function setLearningDifficultiesEnabled(supportLearningDifficultiesEnabled: boolean): any {
    
    return {
        type: SET_LEARNING_DIFFICULTIES_ENABLED,
        supportLearningDifficultiesEnabled
    };
}

export function toggleScreenreader(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isScreenreaderEnabled(getState())) {
            dispatch(setScreenreaderEnabled(false));
        } else {
            dispatch(setScreenreaderEnabled(true));
        }
    };
}

export function setScreenreaderEnabled(supportScreenreaderEnabled: boolean): any {
    
    return {
        type: SET_SCREENREADER_ENABLED,
        supportScreenreaderEnabled
    };
}