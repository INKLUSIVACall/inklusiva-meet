/**
 * Thresholds for displaying toolbox buttons.
 */
export const THRESHOLDS = [
    {
        width: 565,
        order: [
            'rolematching',
            'help',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'reactions',
            'participants'

            // 'tileview'
        ]
    },
    {
        width: 520,
        order: [
            'rolematching',
            'help',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants'

            // 'tileview'
        ]
    },
    {
        width: 470,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera', 'desktop', 'chat', 'raisehand', 'participants' ]
    },
    {
        width: 420,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera', 'desktop', 'chat', 'participants' ]
    },
    {
        width: 370,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera', 'chat', 'participants' ]
    },
    {
        width: 225,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera', 'chat' ]
    },
    {
        width: 200,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera' ]
    }
];

export const THRESHOLDS_MODERATOR = [
    {
        width: 565,
        order: [
            'help',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'reactions',
            'participants',
            'cc'

            // 'tileview'
        ]
    },
    {
        width: 520,
        order: [
            'help',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants',
            'cc'

            // 'tileview'
        ]
    },
    {
        width: 470,
        order: [ 'help', 'distress', 'microphone', 'camera', 'desktop', 'chat', 'raisehand', 'participants' ]
    },
    {
        width: 420,
        order: [ 'help', 'distress', 'microphone', 'camera', 'desktop', 'chat', 'participants' ]
    },
    {
        width: 370,
        order: [ 'help', 'distress', 'microphone', 'camera', 'chat', 'participants' ]
    },
    {
        width: 225,
        order: [ 'help', 'distress', 'microphone', 'camera', 'chat' ]
    },
    {
        width: 200,
        order: [ 'help', 'distress', 'microphone', 'camera' ]
    }
];

export const THRESHOLDS_USER = [
    {
        width: 565,
        order: [
            'rolematching',
            'help',
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
            'settings'

            // 'tileview'
        ]
    },
    {
        width: 520,
        order: [
            'rolematching',
            'help',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants',
            'cc',
            'shortcuts',
            'settings'

            // 'tileview'
        ]
    },
    {
        width: 470,
        order: [
            'rolematching',
            'help',
            'distress',
            'microphone',
            'camera',
            'desktop',
            'chat',
            'raisehand',
            'participants',
            'cc',
            'shortcuts',
            'settings'
        ]
    },
    {
        width: 420,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera', 'desktop', 'chat', 'participants' ]
    },
    {
        width: 370,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera', 'chat', 'participants' ]
    },
    {
        width: 225,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera', 'chat' ]
    },
    {
        width: 200,
        order: [ 'rolematching', 'help', 'distress', 'microphone', 'camera' ]
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


export const BUTTONS_MODERATOR = [
    // 'rolematching',
    'help',
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
    'help',
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
    //'profile',
    //'invite',
    //'tileview',
    //'toggle-camera',
    //'videoquality',
    //'fullscreen',
    //'security',
    //'recording',
    //'livestreaming',
    //'linktosalesforce',
    //'sharedvideo',
    //'shareaudio',
    //'noisesuppression',
    //'whiteboard',
    //'etherpad',
    //'select-background',
    //'stats',
    'shortcuts',
    //'embedmeeting',
    //'feedback',
    //'download'
];
