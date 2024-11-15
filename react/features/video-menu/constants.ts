/**
 * Used to set maximumValue for native volume slider.
 * Slider double-precision floating-point number indicating the volume,
 * from 0 mute to 1 max, which converts to 0 mute to 19 max in our case.
 * 0 as muted, 10 as standard and 19 as max remote participant volume level.
 */
export const NATIVE_VOLUME_SLIDER_SCALE = 19;

/**
 * Used to modify initialValue, which is expected to be a decimal value between
 * 0 and 1, and converts it to a number representable by an input slider, which
 * recognizes whole numbers.
 */
export const VOLUME_SLIDER_SCALE = 100;

/**
 * Minimum value of the zoom slider - this value gets divided by 100 and applied
 * to the transform zoom of the <video> element.
 */
export const ZOOM_SLIDER_MINIMUM = 100;

/**
 * Maximum value of the zoom slider - this value gets divided by 100 and applied
 * to the transform zoom of the <video> element.
 */
export const ZOOM_SLIDER_MAXIMUM = 300;


/**
 * Minimum value of the brightness slider.
 */
export const BRIGHTNESS_SLIDER_MINIMUM = 50;

/**
 * Maximum value of the brightness slider.
 */
export const BRIGHTNESS_SLIDER_MAXIMUM = 150;

/**
 * Minimum value of the contrast slider.
 */
export const CONTRAST_SLIDER_MINIMUM = 0;

/**
 * Maximum value of the contrast slider.
 */
export const CONTRAST_SLIDER_MAXIMUM = 100;

/**
 * Minimum value of the saturation slider.
 */
export const OPACITY_SLIDER_MINIMUM = 0;

/**
 * Maximum value of the saturation slider.
 */
export const OPACITY_SLIDER_MAXIMUM = 100;

/**
 * Minimum value of the saturation slider.
 */
export const SATURATION_SLIDER_MINIMUM = 0;

/**
 * Maximum value of the saturation slider.
 */
export const SATURATION_SLIDER_MAXIMUM = 100;

/**
 * Minimum value of the frequency slider.
 */
export const FREQUENCY_FILTER_SLIDER_MINIMUM = 0;

/**
 * Maximum value of the frequency slider.
 */
export const FREQUENCY_FILTER_SLIDER_MAXIMUM = 100;

/**
 * Participant context menu button keys.
 */
export const PARTICIPANT_MENU_BUTTONS = {
    ALLOW_VIDEO: 'allow-video',
    ASK_UNMUTE: 'ask-unmute',
    CONN_STATUS: 'conn-status',
    FLIP_LOCAL_VIDEO: 'flip-local-video',
    GRANT_MODERATOR: 'grant-moderator',
    GRANT_COHOST: 'grant-cohost',
    HIDE_SELF_VIEW: 'hide-self-view',
    KICK: 'kick',
    MUTE: 'mute',
    MUTE_OTHERS: 'mute-others',
    MUTE_OTHERS_VIDEO: 'mute-others-video',
    MUTE_VIDEO: 'mute-video',
    PIN_TO_STAGE: 'pinToStage',
    ASSISTANCE_MESSAGE: 'assistanceMessage',
    PRIVATE_MESSAGE: 'privateMessage',
    REMOTE_CONTROL: 'remote-control',
    SEND_PARTICIPANT_TO_ROOM: 'send-participant-to-room',
    VERIFY: 'verify'
};
