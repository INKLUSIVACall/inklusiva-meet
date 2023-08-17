import { IReduxState } from '../../app/types';
import { IStateful } from "../../base/app/types";
import i18next, { DEFAULT_LANGUAGE, LANGUAGES } from '../../base/i18n/i18next';
import { toState } from '../../base/redux/functions';

/**
 *  Returns state of distressbutton
 * @param state 
 * @returns whether distress button is enabled or disabled
 */
export function isDistressBtnEnabled(state: IReduxState): boolean {
    return state['features/lag/userdata'].userData?.distressbutton?.active;
}

/**
 *  Gets value for dimming
 * @param state 
 * @returns 
 */
export function getDistressBtnDimmingValue(state: IReduxstate): number{
    return state['features/lag/userdata'].userData?.distressbutton?.dimming;
}

/**
 *  Gets value for volume
 * @param state 
 * @returns 
 */
export function getDistressBtnVolumeValue(state: IReduxstate): number{
    return state['features/lag/userdata'].userData?.distressbutton?.volume;
}

/**
 *  Returns state of distressbutton
 * @param state 
 * @returns whether distress button is enabled or disabled
 */
export function isDistressBtnMessageEnabled(state: IReduxState): boolean {
    return state['features/lag/userdata'].userData?.distressbutton?.message;
}

/**
 *  Gets value for volume
 * @param state 
 * @returns 
 */
export function getDistressBtnMessageTextValue(state: IReduxstate): number{
    return state['features/lag/userdata'].userData?.distressbutton?.message_text;
}

/**
 *  Gets DistressBtn Props
 * @param stateful 
 */
export function getDistressBtnTabProps(stateful: IStateful) {
    const state = toState(stateful);
    const active = isDistressBtnEnabled(state);
    const dimming = getDistressBtnDimmingValue(state);
    const volume = getDistressBtnVolumeValue(state);
    const message = isDistressBtnMessageEnabled(state);
    const message_text = getDistressBtnMessageTextValue(state);
    return{
        active,
        dimming,
        volume,
        message,
        message_text,
    }
}