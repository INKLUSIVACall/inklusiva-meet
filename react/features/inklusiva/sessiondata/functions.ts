import { IReduxState, IStore } from '../../app/types';
import { getLocalParticipant, getParticipantDisplayName } from '../../base/participants/functions';
import { addMessage } from '../../chat/actions.any';
import { MESSAGE_TYPE_LOCAL } from '../../chat/constants';

export function userInDistress(state: IReduxState): boolean {
    return state['features/inklusiva/sessiondata'].inDistress;
}

export function persistSentPrivateMessage({ dispatch, getState }: IStore, recipientID: string,
        message: string) {
    const state = getState();
    const localParticipant = getLocalParticipant(state);

    if (!localParticipant?.id) {
        return;
    }
    const displayName = getParticipantDisplayName(state, localParticipant.id);

    dispatch(addMessage({
        displayName,
        hasRead: true,
        id: localParticipant.id,
        messageType: MESSAGE_TYPE_LOCAL,
        message,
        privateMessage: true,
        lobbyChat: false,
        recipient: getParticipantDisplayName(state, recipientID),
        timestamp: Date.now()
    }));
}
