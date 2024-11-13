import { IReduxState } from '../app/types';
import { DISPLAY_DRAWER_THRESHOLD } from '../filmstrip/constants';

export function getClosedCaptionVisibility(state: IReduxState) {
    return state['features/subtitles']._popupVisibility;
}

export function showClosedCaptionDrawer(state: IReduxState) {
    const { clientWidth } = state['features/base/responsive-ui'];
    return clientWidth <= DISPLAY_DRAWER_THRESHOLD;
}
