import { IReduxState, IStore } from '../../app/types';

// TODO: Own Audio Input will not get saved atm
export function isOwnAudioInputEnabled(state: IReduxState): boolean {
    return  true;
}

export function isOthersAudioInputEnabled(state: IReduxState): boolean {
    return state['features/lag/userdata'].userData?.audio?.otherParticipants;
}

export function isFilterBackgroundNoiseEnabled(state: IReduxState): boolean {
    return state['features/lag/userdata'].userData?.audio?.background ?? true;
}

export function getVolumeValue(state: IReduxState): number {
    return state['features/lag/userdata'].userData?.audio?.volume ?? 100;
}

export function getHighFrequenciesValue(state: IReduxState): number {
    return state['features/lag/userdata'].userData?.audio?.highFreq ?? 0;
}

export function getBalanceValue(state: IReduxState): number {
    return state['features/lag/userdata'].userData?.audio?.balance ?? 50;
}

export function getAmplifyValue(state: IReduxState): number {
    return state['features/lag/userdata'].userData?.audio?.amplify ?? 0;
}