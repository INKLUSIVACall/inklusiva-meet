import { toState } from "../../base/redux/functions";
import { IReduxState } from "../../app/types";
import { IStateful } from "../../base/app/types";


/**
 * 
 * @param state 
 * @returns a string indicating how severely eyesight is impaired or not
*/
export function getEyesight(state: IReduxState): string{
    return state['features/lag/userdata'].userData?.support?.eyesight;
}

/**
 * 
 *  
 * @param state 
 * @returns a string indicating how severely hearing is impaired or not
*/
export function getHearing(state: IReduxState): string{
    return state['features/lag/userdata'].userData?.support.hearing;
}

/**
 * 
 * @param state 
 * @returns whether or not senses are impaired
 */
export function areSensesEnabled(state: IReduxState): boolean {
    return state['features/lag/userdata'].userData?.support?.senses;
}

/**
 * 
 * @param state 
 * @returns whether learning difficulties are TRUE
 */
export function areLearningDifficultiesEnabled(state: IReduxState): boolean {
    return state['features/lag/userdata'].userData?.support?.learning_difficulties;
}

/**
 * 
 * @param state 
 * @returns whether Screenreader is enabled
 */
export function isScreenreaderEnabled(state: IReduxState): boolean {
    return state['features/lag/userdata'].userData?.ui?.screenreader;
}

/**
 *  Returns all states of SupportTab
 * @param stateful 
 */
export function getSupportTabProps(stateful: IStateful) {
    const state = toState(stateful);
    const eyesight = getEyesight(state);
    const hearing = getHearing(state);
    const senses = areSensesEnabled(state);
    const learning_difficulties = areLearningDifficultiesEnabled(state);
    const screenreader = isScreenreaderEnabled(state); 
    
    return {
        eyesight,
        hearing,
        senses,
        learning_difficulties,
        screenreader
    }
}