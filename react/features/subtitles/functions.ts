import { IReduxState } from "../app/types";

export function getClosedCaptionVisibility(state: IReduxState) {
    return state['features/subtitles']._popupVisibility;
}