/**
 * The type of the action which clears the Toolbox visibility timeout.
 *
 * {
 *     type: CLEAR_TOOLBOX_TIMEOUT
 * }.
 */
export const CLEAR_TOOLBOX_TIMEOUT = 'CLEAR_TOOLBOX_TIMEOUT';

/**
 * The type of (redux) action which updates whether the conference is or is not
 * currently in full screen view.
 *
 * {
 *     type: FULL_SCREEN_CHANGED,
 *     fullScreen: boolean
 * }.
 */
export const FULL_SCREEN_CHANGED = 'FULL_SCREEN_CHANGED';

/**
 * The type of (redux) action which requests full screen mode be entered or
 * exited.
 *
 * {
 *     type: SET_FULL_SCREEN,
 *     fullScreen: boolean
 * }.
 */
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN';

/**
 * The type of the (redux) action which shows/hides the hangup menu.
 *
 * {
 *     type: SET_HANGUP_MENU_VISIBLE,
 *     visible: boolean
 * }.
 */
export const SET_HANGUP_MENU_VISIBLE = 'SET_HANGUP_MENU_VISIBLE';

/**
 * The type of the redux action that toggles whether the overflow menu(s) should be shown as drawers.
 */
export const SET_OVERFLOW_DRAWER = 'SET_OVERFLOW_DRAWER';

/**
 * The type of the (redux) action which shows/hides the OverflowMenu.
 *
 * {
 *     type: SET_OVERFLOW_MENU_VISIBLE,
 *     visible: boolean
 * }.
 */
export const SET_OVERFLOW_MENU_VISIBLE = 'SET_OVERFLOW_MENU_VISIBLE';

/**
 * The type of the action which sets the indicator which determines whether a
 * fToolbar in the Toolbox is hovered.
 *
 * {
 *     type: SET_TOOLBAR_HOVERED,
 *     hovered: boolean
 * }.
 */
export const SET_TOOLBAR_HOVERED = 'SET_TOOLBAR_HOVERED';

/**
 * The type of the (redux) action which enables/disables the Toolbox.
 *
 * {
 *     type: SET_TOOLBOX_ENABLED,
 *     enabled: boolean
 * }.
 */
export const SET_TOOLBOX_ENABLED = 'SET_TOOLBOX_ENABLED';

/**
 * The type of the action which sets a new Toolbox visibility timeout and its
 * delay.
 *
 * {
 *     type: SET_TOOLBOX_TIMEOUT,
 *     handler: Function,
 *     timeoutMS: number
 * }.
 */
export const SET_TOOLBOX_TIMEOUT = 'SET_TOOLBOX_TIMEOUT';

/**
 * The type of the (redux) action which shows/hides the Toolbox.
 *
 * {
 *     type: SET_TOOLBOX_VISIBLE,
 *     visible: boolean
 * }.
 */
export const SET_TOOLBOX_VISIBLE = 'SET_TOOLBOX_VISIBLE';

/**
 * The type of the redux action which toggles the toolbox visibility regardless of it's current state.
 *
 * {
 *     type: TOGGLE_TOOLBOX_VISIBLE
 * }.
 */
export const TOGGLE_TOOLBOX_VISIBLE = 'TOGGLE_TOOLBOX_VISIBLE';

/**
 * The type of the redux action which sets whether the toolbox should be shifted up or not.
 *
 * {
 *     type: SET_TOOLBOX_SHIFT_UP
 * }.
 */
export const SET_TOOLBOX_SHIFT_UP = 'SET_TOOLBOX_SHIFT_UP';

/**
 * The type of the (redux) action which shows/hides the conference info.
 *
 * {
 *    type: SET_CONFERENCE_INFO_VISIBLE,
 *    visible: boolean
 *  }.
 */
export const SET_CONFERENCE_INFO_VISIBLE = 'SET_CONFERENCE_INFO_VISIBLE';

/**
 * The type of the redux action which toggles the help dialog visibility.
 *
 * {
 *      type: OPEN_HELP_DIALOG
 * }
 */
export const OPEN_HELP_DIALOG = 'OPEN_HELP_DIALOG';
