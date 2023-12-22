import { IStore } from "../../app/types";
import { SET_INDISTRESS_DISABLED, SET_INDISTRESS_ENABLED } from "./actionTypes";
import { userInDistress } from "./functions";

export function setInDistress() {
    return {
        type: SET_INDISTRESS_ENABLED,
    };
}

export function setInNoDistress() {
    return {
        type: SET_INDISTRESS_DISABLED,
    };
}

export function toggleInDistress() {
    return (dispatch: IStore["dispatch"], getState: IStore["getState"]) => {
        if (userInDistress(getState())) {
            dispatch(setInNoDistress());
        } else {
            dispatch(setInDistress());
        }
    };
}

