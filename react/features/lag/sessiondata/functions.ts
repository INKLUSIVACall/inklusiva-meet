import { IReduxState } from "../../app/types";

export function userInDistress(state: IReduxState): boolean {
    return state["features/lag/sessiondata"].inDistress;
}
