/**
 * The type of (redux) action which enlarges the filmstrip.
 *
 * {
 *     type: RESIZE_FILMSTRIP,
 * }.
 */
export const RESIZE_FILMSTRIP = 'RESIZE_FILMSTRIP';

/**
 * The type of (redux) action which sets whether the filmstrip is enabled.
 *
 * {
 *     type: SET_FILMSTRIP_ENABLED,
 *     enabled: boolean
 * }.
 */
export const SET_FILMSTRIP_ENABLED = 'SET_FILMSTRIP_ENABLED';

/**
 * The type of (redux) action which sets whether the filmstrip is visible.
 *
 * {
 *     type: SET_FILMSTRIP_VISIBLE,
 *     visible: boolean
 * }.
 */
export const SET_FILMSTRIP_VISIBLE = 'SET_FILMSTRIP_VISIBLE';

/**
 * The type of (redux) action which sets the dimensions of the tile view grid.
 *
 * {
 *     type: SET_TILE_VIEW_DIMENSIONS,
 *     dimensions: {
 *         gridDimensions: {
 *             columns: number,
 *             height: number,
 *             minVisibleRows: number,
 *             width: number
 *         },
 *         thumbnailSize: {
 *             height: number,
 *             width: number
 *         },
 *         filmstripWidth: number
 *     }.
 * }.
 */
export const SET_TILE_VIEW_DIMENSIONS = 'SET_TILE_VIEW_DIMENSIONS';

/**
 * The type of (redux) action which sets the dimensions of the thumbnails in horizontal view.
 *
 * {
 *     type: SET_HORIZONTAL_VIEW_DIMENSIONS,
 *     dimensions: Object
 * }.
 */
export const SET_HORIZONTAL_VIEW_DIMENSIONS = 'SET_HORIZONTAL_VIEW_DIMENSIONS';

/**
 * The type of (redux) action which sets the reordered list of the remote participants in the filmstrip.
 * {
 *      type: SET_REMOTE_PARTICIPANTS,
 *      participants: Array<string>
 * }.
 */
export const SET_REMOTE_PARTICIPANTS = 'SET_REMOTE_PARTICIPANTS';

/**
 * The type of (redux) action which sets the dimensions of the thumbnails in vertical view.
 *
 * {
 *     type: SET_VERTICAL_VIEW_DIMENSIONS,
 *     dimensions: Object
 * }.
 */
export const SET_VERTICAL_VIEW_DIMENSIONS = 'SET_VERTICAL_VIEW_DIMENSIONS';

/**
 * The type of (redux) action which sets the volume for a thumnail's audio.
 *
 * {
 *     type: SET_VOLUME,
 *     participantId: string,
 *     volume: number
 * }.
 */
export const SET_VOLUME = 'SET_VOLUME';

/**
 * The type of (redux) action which sets the frequency settings for a thumnail's audio.
 *
 * {
 *     type: SET_FREQUENCY_FILTER_SETTING,
 *     participantId: string,
 *     setting: number
 * }.
 */
export const SET_FREQUENCY_FILTER_SETTING = 'SET_FREQUENCY_FILTER_SETTING';

/**
 * The type of (redux) action which sets the brightness settings for a thumnail's video.
 * {
 *     type: SET_PARTICIPANT_BRIGHTNESS,
 *     local: boolean,
 *     participantId: string|null,
 *     brightness: number
 * }.
 */
export const SET_PARTICIPANT_BRIGHTNESS = 'SET_PARTICIPANT_BRIGHTNESS';

/**
 * The type of (redux) action which sets the contrast settings for a thumnail's video.
 *
 * {
 *     type: SET_PARTICIPANT_CONTRAST,
 *     local: boolean,
 *     participantId: string|null,
 *     contrast: number
 * }.
 */
export const SET_PARTICIPANT_CONTRAST = 'SET_PARTICIPANT_CONTRAST';

/**
 * The type of (redux) action which sets the opacity settings for a thumnail's video.
 *
 * {
 *     type: SET_PARTICIPANT_OPACITY,
 *     local: boolean,
 *     participantId: string|null,
 *     opacity: number
 * }.
 */
export const SET_PARTICIPANT_OPACITY = 'SET_PARTICIPANT_OPACITY';

/**
 * The type of (redux) action which sets the saturation settings for a thumnail's video.
 *
 * {
 *     type: SET_PARTICIPANT_SATURATION,
 *     local: boolean,
 *     participantId: string|null,
 *     saturation: number
 * }.
 */
export const SET_PARTICIPANT_SATURATION = 'SET_PARTICIPANT_SATURATION';

/**
 * The type of (redux) action which sets the zoom level for a thumnail's video.
 *
 * {
 *     type: SET_PARTICIPANT_OPACITY,
 *     participantId: string,
 *     zoomLevel: number
 * }.
 */
export const SET_PARTICIPANT_ZOOM_LEVEL = 'SET_PARTICIPANT_ZOOM_LEVEL';


/**
 * The type of (redux) action which resets the brightness settings for all participants.
 *
 * {
 *     type: RESET_PARTICIPANT_CONTRAST,
 * }.
 */
export const RESET_PARTICIPANT_BRIGHTNESS = 'RESET_PARTICIPANT_BRIGHTNESS';

/**
 * The type of (redux) action which resets the contrast settings for all participants.
 *
 * {
 *     type: RESET_PARTICIPANT_CONTRAST,
 * }.
 */
export const RESET_PARTICIPANT_CONTRAST = 'RESET_PARTICIPANT_CONTRAST';

/**
 * The type of (redux) action which resets the opacity settings for all participants.
 *
 * {
 *     type: RESET_PARTICIPANT_OPACITY,
 * }.
 */
export const RESET_PARTICIPANT_OPACITY = 'RESET_PARTICIPANT_OPACITY';

/**
 * The type of (redux) action which resets the saturation settings for participants.
 *
 * {
 *     type: RESET_PARTICIPANT_SATURATION,
 * }.
 */
export const RESET_PARTICIPANT_SATURATION = 'RESET_PARTICIPANT_SATURATION';

/**
 * The type of (redux) action which resets the zoom level for all participants.
 *
 * {
 *     type: RESET_PARTICIPANT_OPACITY,
 * }.
 */
export const RESET_PARTICIPANT_ZOOM_LEVEL = 'RESET_PARTICIPANT_ZOOM_LEVEL';


/**
 * The type of the action which sets the list of visible remote participants in the filmstrip by storing the start and
 * end index in the remote participants array.
 *
 * {
 *      type: SET_VISIBLE_REMOTE_PARTICIPANTS,
 *      startIndex: number,
 *      endIndex: number
 * }.
 */
export const SET_VISIBLE_REMOTE_PARTICIPANTS = 'SET_VISIBLE_REMOTE_PARTICIPANTS';

/**
 * The type of action which sets the height for the top panel filmstrip.
 * {
 *      type: SET_FILMSTRIP_HEIGHT,
 *      height: number
 * }.
 */
export const SET_FILMSTRIP_HEIGHT = 'SET_FILMSTRIP_HEIGHT';

/**
 * The type of action which sets the width for the vertical filmstrip.
 * {
 *      type: SET_FILMSTRIP_WIDTH,
 *      width: number
 * }.
 */
export const SET_FILMSTRIP_WIDTH = 'SET_FILMSTRIP_WIDTH';

/**
 * The type of action which sets the height for the top panel filmstrip (user resized).
 * {
 *      type: SET_USER_FILMSTRIP_HEIGHT,
 *      height: number
 * }.
 */
export const SET_USER_FILMSTRIP_HEIGHT = 'SET_USER_FILMSTRIP_HEIGHT';

/**
 * The type of action which sets the width for the vertical filmstrip (user resized).
 * {
 *      type: SET_USER_FILMSTRIP_WIDTH,
 *      width: number
 * }.
 */
export const SET_USER_FILMSTRIP_WIDTH = 'SET_USER_FILMSTRIP_WIDTH';

/**
 * The type of action which sets whether the user is resizing or not.
 * {
 *      type: SET_USER_IS_RESIZING,
 *      resizing: boolean
 * }.
 */
export const SET_USER_IS_RESIZING = 'SET_USER_IS_RESIZING';

/**
 * The type of (redux) action which sets the dimensions of the thumbnails in stage filmstrip view.
 *
 * {
 *     type: SET_STAGE_FILMSTRIP_DIMENSIONS,
 *     dimensions: Object
 * }.
 */
export const SET_STAGE_FILMSTRIP_DIMENSIONS = 'SET_STAGE_FILMSTRIP_DIMENSIONS';

/**
 * The type of Redux action which adds a participant to the active list
 * (the participants displayed on the stage filmstrip).
 * {
 *     type: ADD_STAGE_PARTICIPANT,
 *     participantId: string,
 *     pinned: boolean
 * }.
 */
export const ADD_STAGE_PARTICIPANT = 'ADD_STAGE_PARTICIPANT';

/**
 * The type of Redux action which removes a participant from the active list
 * (the participants displayed on the stage filmstrip).
 * {
 *     type: REMOVE_STAGE_PARTICIPANT,
 *     participantId: string,
 * }.
 */
export const REMOVE_STAGE_PARTICIPANT = 'REMOVE_STAGE_PARTICIPANT';

/**
 * The type of Redux action which sets the active participants list
 * (the participants displayed on the stage filmstrip).
 * {
 *     type: SET_STAGE_PARTICIPANTS,
 *     queue: Array<Object>
 * }.
 */
export const SET_STAGE_PARTICIPANTS = 'SET_STAGE_PARTICIPANTS';

/**
 * The type of Redux action which toggles the pin state of stage participants.
 * {
 *     type: TOGGLE_PIN_STAGE_PARTICIPANT,
 *     participantId: String
 * }.
 */
export const TOGGLE_PIN_STAGE_PARTICIPANT = 'TOGGLE_PIN_STAGE_PARTICIPANT';

/**
 * The type of Redux action which clears the list of stage participants.
 * {
 *     type: CLEAR_STAGE_PARTICIPANTS
 * }.
 */
export const CLEAR_STAGE_PARTICIPANTS = 'CLEAR_STAGE_PARTICIPANTS';

/**
 * The type of Redux action which sets the participant to be displayed
 * on the screenshare filmstrip.
 * {
 *     type: SET_SCREENSHARE_FILMSTRIP_PARTICIPANT,
 *     participantId: string|undefined
 * }.
 */
export const SET_SCREENSHARE_FILMSTRIP_PARTICIPANT = 'SET_SCREENSHARE_FILMSTRIP_PARTICIPANT';

/**
 * The type of Redux action which sets the dimensions of the screenshare tile.
 * {
 *     type: SET_SCREENSHARING_TILE_DIMENSIONS
 * }.
 */
export const SET_SCREENSHARING_TILE_DIMENSIONS = 'SET_SCREENSHARING_TILE_DIMENSIONS';

/**
 * The type of Redux action which sets the visibility of the top panel.
 * {
 *     type: SET_TOP_PANEL_VISIBILITY
 * }.
 */
export const SET_TOP_PANEL_VISIBILITY = 'SET_TOP_PANEL_VISIBILITY';

/**
 * The type of (redux) action which identifies the sign language translator who's
 * currently being moved, thus who's having the highest z-order.
 *
 * {
 *     type: SET_MOVING_SIGN_LANGUAGE_PARTICIPANT,
 *     participantId: string
 * }.
 */
export const SET_MOVING_SIGN_LANGUAGE_PARTICIPANT = 'SET_MOVING_SIGN_LANGUAGE_PARTICIPANT,';