import { IReduxState } from "../../app/types";
import { IStateful } from "../../base/app/types";
import { toState } from "../../base/redux/functions";
import React from "react";

/**
 * 
 * @param state 
 * @returns  booelan is SignLang Assistant enabled?
 */
export function isSignLangEnabled(state: IReduxState): boolean {
    return state['features/lag/userdata'].userData?.assistant?.signLanguage?.active;
}

export function getDisplayString(state: IReduxState): string{
    return state['features/lag/userdata'].userData?.assistant?.signLanguage?.display;
}

export function getWindowSize(state: IReduxState): boolean{
    return state['features/lag/userdata'].userData?.assistant?.signLanguage?.windowSize;
}

/**
 * 
 * @param stateful Returns SignlanguagetabProps for options panel
 */
export function getSignLangTabProps(stateful: IStateful) {
    const state = toState(stateful);
    const active = isSignLangEnabled(state);
    const display = getDisplayString(state)
    const windowSize = getWindowSize(state);

    return {
            active,
            display,
            windowSize,
    }
}