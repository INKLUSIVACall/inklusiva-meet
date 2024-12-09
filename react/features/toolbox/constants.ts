/**
 * Thresholds for displaying toolbox buttons.
 */
export const THRESHOLDS = [
    {
        width: 565,
        order: [
            'rolematching',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'reactions',
            'participants',
            'help'

            // 'tileview'
        ]
    },
    {
        width: 520,
        order: [
            'rolematching',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants',
            'help'

            // 'tileview'
        ]
    },
    {
        width: 470,
        order: [
            'rolematching',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants',
            'help'
        ]
    },
    {
        width: 420,
        order: [ 'rolematching', 'distress', 'microphone', 'camera', 'desktop', 'chat', 'participants', 'help' ]
    },
    {
        width: 340,
        order: [ 'rolematching', 'distress', 'microphone', 'camera', 'chat', 'participants', 'help' ]
    },
    {
        width: 225,
        order: [ 'rolematching', 'distress', 'microphone', 'camera', 'chat', 'help' ]
    },
    {
        width: 200,
        order: [ 'rolematching', 'distress', 'microphone', 'camera', 'help' ]
    }
];

export const THRESHOLDS_MODERATOR = [
    {
        width: 565,
        order: [
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'reactions',
            'participants',
            'cc',
            'help'

            // 'tileview'
        ]
    },
    {
        width: 520,
        order: [
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants',
            'cc',
            'help'

            // 'tileview'
        ]
    },
    {
        width: 470,
        order: [ 'distress', 'microphone', 'camera', 'desktop', 'chat', 'raisehand', 'participants', 'cc', 'help' ]
    },
    {
        width: 420,
        order: [ 'distress', 'microphone', 'camera', 'desktop', 'chat', 'participants', 'cc', 'help' ]
    },
    {
        width: 340,
        order: [ 'distress', 'microphone', 'camera', 'chat', 'participants', 'cc', 'help' ]
    },
    {
        width: 225,
        order: [ 'distress', 'microphone', 'camera', 'chat', 'help' ]
    },
    {
        width: 200,
        order: [ 'distress', 'microphone', 'camera', 'help' ]
    }
];

export const THRESHOLDS_USER = [
    {
        width: 565,
        order: [
            'rolematching',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'reactions',
            'participants',
            'cc',
            'shortcuts',
            'help',
            'settings'

            // 'tileview'
        ]
    },
    {
        width: 520,
        order: [
            'rolematching',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants',
            'cc',
            'shortcuts',
            'help',
            'settings'

            // 'tileview'
        ]
    },
    {
        width: 470,
        order: [
            'rolematching',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants',
            'cc',
            'shortcuts',
            'help',
            'settings'
        ]
    },
    {
        width: 420,
        order: [ 'rolematching', 'distress', 'microphone', 'camera', 'desktop', 'chat', 'participants', 'cc', 'help' ]
    },
    {
        width: 340,
        order: [ 'rolematching', 'distress', 'microphone', 'camera', 'chat', 'participants', 'cc', 'help' ]
    },
    {
        width: 225,
        order: [ 'rolematching', 'distress', 'microphone', 'camera', 'chat', 'help' ]
    },
    {
        width: 200,
        order: [ 'rolematching', 'distress', 'microphone', 'camera', 'help' ]
    }
];

export const NOT_APPLICABLE = 'N/A';

export const TOOLBAR_TIMEOUT = 4000;

export const DRAWER_MAX_HEIGHT = '95vh - 50px';

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

export const BUTTONS_MODERATOR = [

    // 'rolematching',
    'distress',
    'microphone',
    'camera',
    'desktop',
    'chat',
    'raisehand',
    'reactions',
    'participants-pane',
    'closedcaptions',
    'settings',
    'help',
    'profile',
    'invite',
    'tileview',
    'toggle-camera',
    'videoquality',
    'fullscreen',
    'security',
    'recording',
    'livestreaming',
    'linktosalesforce',
    'sharedvideo',
    'shareaudio',
    'noisesuppression',
    'whiteboard',
    'etherpad',
    'select-background',
    'stats',
    'shortcuts',
    'embedmeeting',
    'feedback',
    'download'
];

export const BUTTONS_USER = [
    'rolematching',
    'distress',
    'microphone',
    'camera',
    'desktop',
    'chat',
    'raisehand',
    'reactions',
    'participants-pane',
    'closedcaptions',
    'settings',
    'help',

    // 'profile',
    // 'invite',
    // 'tileview',
    // 'toggle-camera',
    // 'videoquality',
    // 'fullscreen',
    // 'security',
    // 'recording',
    // 'livestreaming',
    // 'linktosalesforce',
    // 'sharedvideo',
    // 'shareaudio',
    // 'noisesuppression',
    // 'whiteboard',
    // 'etherpad',
    // 'select-background',
    // 'stats',
    'shortcuts'

    // 'embedmeeting',
    // 'feedback',
    // 'download'
];
