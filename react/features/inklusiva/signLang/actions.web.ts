import { IReduxState, IStore } from "../../app/types";
import { IStateful } from "../../base/app/types";
import { toState } from "../../base/redux/functions";
import { SET_SIGNLANG_DISPLAY_STRING, SET_SIGNLANG_ENABLED,SET_SIGNLANG_WINDOWSIZE_VALUE } from "./actionTypes";
import { getSignLangTabProps, isSignLangEnabled, getWindowSize, getDisplayString } from "./functions.web";


export function submitSignLangTabProps(newState: any){

    return(dispatch: IStore['dispatch'], getState: IStore['getState']) =>{
        const currentState = getSignLangTabProps(getState());
        if (newState.active !== currentState.active){
            dispatch(toggleActive());
        }
        if (newState.display !== currentState.display){
            dispatch(setDisplayString(newState.display))
        }
        if (newState.windowSize !== currentState.windowSize){
            dispatch(setWindowSize(newState.windowSize));
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

export function setDisplayString(displayValue: string): any{
    return {
    type: SET_SIGNLANG_DISPLAY_STRING,
    displayValue
    }
}

export function setWindowSize(value: number): any{
    return{
        type: SET_SIGNLANG_WINDOWSIZE_VALUE,
        value
    }
}
