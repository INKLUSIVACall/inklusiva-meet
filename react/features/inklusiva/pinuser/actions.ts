import { PIN_USER, UNPIN_USER } from './actionTypes';

export function pinUser(participantId: string | null) {
    return {
        type: PIN_USER,
        participantId
    };
}

export function unpinUser(participantId: string | null) {
    return {
        type: UNPIN_USER,
        participantId
    };
}
