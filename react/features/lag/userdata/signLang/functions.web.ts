import { IStateful } from "../../../base/app/types";
import { toState } from "../../../base/redux/functions";
import React from "react";

/**
 * 
 * @param stateful Returns SignlanguagetabProps for options panel
 */
export function getSignLangTabProps(stateful: IStatefulteful) {
    const state = toState(stateful);

    const {
        // Füge Props aus settings-State hinzu
        
    } = state['features/base/settings'];
}