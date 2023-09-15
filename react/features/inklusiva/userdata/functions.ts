import { IReduxState } from "../../app/types";

// TODO: Own Audio Input will not get saved atm
export function isOwnAudioInputEnabled(_: IReduxState): boolean {
    return true;
}

export function isOthersAudioInputEnabled(state: IReduxState): boolean {
    return state["features/inklusiva/userdata"].audio?.otherParticipants;
}

export function isFilterBackgroundNoiseEnabled(state: IReduxState): boolean {
    return state["features/inklusiva/userdata"].audio?.background;
}

export function getVolumeValue(state: IReduxState): number {
    return state["features/inklusiva/userdata"].audio?.volume;
}

export function getHighFrequenciesValue(state: IReduxState): number {
    return state["features/inklusiva/userdata"].audio?.highFreq;
}

export function getBalanceValue(state: IReduxState): number {
    return state["features/inklusiva/userdata"].audio?.balance;
}

export function getAmplifyValue(state: IReduxState): number {
    return state["features/inklusiva/userdata"].audio?.amplify;
}
