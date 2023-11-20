/**
 * Thresholds for displaying toolbox buttons.
 */
export const THRESHOLDS = [
    {
        width: 565,
        order: [ 'distress', 'microphone', 'camera', 'desktop', 'chat', 'raisehand', 'reactions', 'participants', 'tileview' ]
    },
    {
        width: 520,
        order: [ 'distress', 'microphone', 'camera', 'desktop', 'chat', 'raisehand', 'participants', 'tileview' ]
    },
    {
        width: 470,
        order: [ 'distress', 'microphone', 'camera', 'desktop', 'chat', 'raisehand', 'participants' ]
    },
    {
        width: 420,
        order: [ 'distress', 'microphone', 'camera', 'desktop', 'chat', 'participants' ]
    },
    {
        width: 370,
        order: [ 'distress', 'microphone', 'camera', 'chat', 'participants' ]
    },
    {
        width: 225,
        order: [ 'distress', 'microphone', 'camera', 'chat' ]
    },
    {
        width: 200,
        order: [ 'distress', 'microphone', 'camera' ]
    }
];

export const NOT_APPLICABLE = 'N/A';

export const TOOLBAR_TIMEOUT = 4000;

export const DRAWER_MAX_HEIGHT = '80vh - 64px';

export const NOTIFY_CLICK_MODE = {
    ONLY_NOTIFY: 'ONLY_NOTIFY',
    PREVENT_AND_NOTIFY: 'PREVENT_AND_NOTIFY'
};

// Around 300 to be displayed above components like chat
export const ZINDEX_DIALOG_PORTAL = 302;

/**
 * Color for spinner displayed in the toolbar.
 */
export const SPINNER_COLOR = '#929292';
