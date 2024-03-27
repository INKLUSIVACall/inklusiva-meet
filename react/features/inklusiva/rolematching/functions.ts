import { IReduxState } from '../../app/types';
import { IParticipant } from '../../base/participants/types';

import { ASSISTANCE_BREAKOUT_ROOM_HANDLED, ASSISTANCE_BREAKOUT_ROOM_UNHANDLED, HIDE_ASSISTANCE_PANEL, SET_PARTICIPANT, SHOW_ASSISTANCE_PANEL, TOGGLE_ASSISTANCE_PANEL } from './actionTypes';

/**
 * Returns the visibility state of the assistance panel.
 *
 * @param {Object} state - The state of the application.
 * @returns {boolean}
 */
export function getAssistancePanelVisibility(state: IReduxState) {
    return state['features/inklusiva/rolematching']?.assistancePanelVisible || false;
}

export function toggleAssistancePanel(participant?: IParticipant) {
    return {
        type: TOGGLE_ASSISTANCE_PANEL,
        participant: participant
    };
}

export function showAssistancePanel() {
    return {
        type: SHOW_ASSISTANCE_PANEL
    };
}

export function hideAssistancePanel() {
    return {
        type: HIDE_ASSISTANCE_PANEL
    };
}

export function isBreakOutRoomHandled(state: IReduxState) {
    return state['features/inklusiva/rolematching']?.breakOutRoomHandled || false;
}

export function setBreakOutRoomHandled() {
    return {
        type: ASSISTANCE_BREAKOUT_ROOM_HANDLED
    };
}

export function setBreakOutRoomUnhandled() {
    return {
        type: ASSISTANCE_BREAKOUT_ROOM_UNHANDLED
    };
}

export function setParticipant(participant: IParticipant) {
    return {
        type: SET_PARTICIPANT,
        participant: participant
    };
}

export function getParticipant(state: IReduxState) {
    return state['features/inklusiva/rolematching'].participant;
}
