import { IReduxState } from '../../app/types';

export function isUserPinned(state: IReduxState, id?: string): boolean {
    if (id) {
        return state['features/inklusiva/pinneduser'].pinnedParticipants.includes(id);
    }

    return false;
}
