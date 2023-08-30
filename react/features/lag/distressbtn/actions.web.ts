import { IReduxState } from '../../app/types';
import { IStateful } from "../../base/app/types";
import i18next, { DEFAULT_LANGUAGE, LANGUAGES } from '../../base/i18n/i18next';
import { toState } from '../../base/redux/functions';
import { 
    SET_DISTRESSBTN_ENABLED, 
    SET_DISTRESSBTN_DIMMING_VALUE, 
    SET_DISTRESSBTN_VOLUME_VALUE, 
    SET_DISTRESSBTN_MESSAGE_ENABLED, 
    SET_DISTRESSBTN_MESSAGE_TEXT
} from './actionTypes';
import { getDistressBtnTabProps, isDistressBtnEnabled, isDistressBtnMessageEnabled } from './functions.web';


/**
 *  Submits new values to the state inside the project store
 */
export function submitNewDistressBtnTab(newState: any) {
    
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getDistressBtnTabProps(getState());
        if(newState.active !== currentState.active) {
            dispatch(toggleActive());
        }
        if(newState.message !== currentState.message){
            dispatch(toggleMessage());
        }
        if(newState.dimming !== currentState.dimming){
            dispatch(setDistressBtnDimmingValue(newState.dimming));
        }
        if(newState.volume !== currentState.volume){
            dispatch(setDistressBtnVolumeValue(newState.volume));
        }
        if(newState.message_text !== currentState.message_text){
            dispatch(setDistressBtnMessageText(newState.message_text));
        }
    };
}

export function toggleActive(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isDistressBtnEnabled(getState())) {
            dispatch(setDistressBtnEnabledState(false));
        } else {
            dispatch(setDistressBtnEnabledState(true));
        }
    };
}
export function toggleMessage(): any {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        if (isDistressBtnMessageEnabled(getState())) {
            dispatch(setDistressBtnMessageEnabled(false));
        } else {
            dispatch(setDistressBtnMessageEnabled(true));
        }
    };
}

export function setDistressBtnEnabledState(enabled: boolean): any {
    return {
        type: SET_DISTRESSBTN_ENABLED,
        enabled
    };
}

export function setDistressBtnDimmingValue(value: number): any{
    return{
        type: SET_DISTRESSBTN_DIMMING_VALUE,
        value
    }
}

export function setDistressBtnVolumeValue(value: number): any{
    return{
        type: SET_DISTRESSBTN_VOLUME_VALUE,
        value
    }
}

export function setDistressBtnMessageEnabled(enabled: boolean): any{
    return{
        type: SET_DISTRESSBTN_MESSAGE_ENABLED,
        enabled
    }
}

export function setDistressBtnMessageText(text: string): any{
    return{
        type: SET_DISTRESSBTN_MESSAGE_TEXT,
        text
    }
}