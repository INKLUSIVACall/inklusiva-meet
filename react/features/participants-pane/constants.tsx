import React from 'react';

import Icon from '../base/icons/components/Icon';
import {
    IconBullhorn,
    IconContact,
    IconEmptyHourglass,
    IconEmptyStar,
    IconFullHourglass,
    IconGridPlus,
    IconHalfStar,
    IconHands,
    IconLifeSaver,
    IconLink,
    IconMessage,
    IconMic,
    IconMicSlash,
    IconVideo,
    IconVideoOff
} from '../base/icons/svg';

/**
 * Reducer key for the feature.
 */
export const REDUCER_KEY = 'features/participants-pane';

export type ActionTrigger = 'Hover' | 'Permanent';

/**
 * Enum of possible participant action triggers.
 */
export const ACTION_TRIGGER: { HOVER: ActionTrigger; PERMANENT: ActionTrigger; } = {
    HOVER: 'Hover',
    PERMANENT: 'Permanent'
};

export type MediaState = 'DominantSpeaker' | 'Muted' | 'ForceMuted' | 'Unmuted' | 'None';

/**
 * Enum of possible participant media states.
 */
export const MEDIA_STATE: { [key: string]: MediaState; } = {
    DOMINANT_SPEAKER: 'DominantSpeaker',
    MUTED: 'Muted',
    FORCE_MUTED: 'ForceMuted',
    UNMUTED: 'Unmuted',
    NONE: 'None'
};

export type QuickActionButtonType = 'Mute' | 'AskToUnmute' | 'AllowVideo' | 'StopVideo' | 'None';

/**
 * Enum of possible participant mute button states.
 */
export const QUICK_ACTION_BUTTON: {
    ALLOW_VIDEO: QuickActionButtonType;
    ASK_TO_UNMUTE: QuickActionButtonType;
    MUTE: QuickActionButtonType;
    NONE: QuickActionButtonType;
    STOP_VIDEO: QuickActionButtonType;
} = {
    ALLOW_VIDEO: 'AllowVideo',
    MUTE: 'Mute',
    ASK_TO_UNMUTE: 'AskToUnmute',
    NONE: 'None',
    STOP_VIDEO: 'StopVideo'
};

/**
 * Icon mapping for possible participant audio states.
 */
export const AudioStateIcons = {
    [MEDIA_STATE.DOMINANT_SPEAKER]: <Icon
        className = 'jitsi-icon-dominant-speaker'
        size = { 16 }
        src = { IconMic } />,
    [MEDIA_STATE.FORCE_MUTED]: <Icon
        color = '#E04757'
        size = { 16 }
        src = { IconMicSlash } />,
    [MEDIA_STATE.MUTED]: <Icon
        size = { 16 }
        src = { IconMicSlash } />,
    [MEDIA_STATE.UNMUTED]: <Icon
        size = { 16 }
        src = { IconMic } />,
    [MEDIA_STATE.NONE]: null
};

/**
 * Icon mapping for possible participant video states.
 */
export const VideoStateIcons = {
    [MEDIA_STATE.DOMINANT_SPEAKER]: null,
    [MEDIA_STATE.FORCE_MUTED]: <Icon
        color = '#E04757'
        id = 'videoMuted'
        size = { 16 }
        src = { IconVideoOff } />,
    [MEDIA_STATE.MUTED]: <Icon
        id = 'videoMuted'
        size = { 16 }
        src = { IconVideoOff } />,
    [MEDIA_STATE.UNMUTED]: <Icon
        size = { 16 }
        src = { IconVideo } />,
    [MEDIA_STATE.NONE]: null
};

/**
 * Mobile web context menu avatar size.
 */
export const AVATAR_SIZE = 20;

/**
 * Default user invitation button status.
 */
export const INVITE_BUTTON_STATUS = false;

/**
 * Default participants searchbar status.
 */
export const SEARCH_PARTICIPANTS_STATUS = false;

/**
 * Default breakoutroom button status.
 */
export const BREAKOUTROOM_BUTTON_STATUS = true;

/**
 * Default breakoutroom list status.
 */
export const BREAKOUTROOM_LIST_STATUS = false;

/**
 * Default mute all button status.
 */
export const MUTE_ALL_BUTTON_STATUS = false;

/**
 * Icon mapping for participant meeting state.
 */
export const MeetingStateIcons = {
    helpInWaitingroom: <Icon
        color = { '#' }
        size = { 16 }
        src = { IconEmptyHourglass } />,
    inWaitingroom: <Icon
        size = { 16 }
        src = { IconFullHourglass } />,
    inConference: null
};

export const DEFAULT_MEETING_STATE = 'inConference';

/**
 * Icon mapping for participant connection state.
 */
export const ConnectionStateIcons = (<Icon
    color = { '#' }
    size = { 16 }
    src = { IconLink } />);

export const ACTIVE_CONNECTION = false;

/**
 * Icon mapping for participant meeting roles.
 */
export const MeetingRoleIcons: { [index: string]: any; } = {
    moderator: <Icon
        color = { '#' }
        size = { 16 }
        src = { IconEmptyStar } />,
    'IC_ROLE_COHOST': <Icon
        size = { 16 }
        src = { IconHalfStar } />,
    'IC_ROLE_ASSISTANT': <Icon
        color = { '#' }
        size = { 16 }
        src = { IconContact } />,
    'IC_ROLE_SIGN_LANG_TRANSLATOR': <Icon
        color = { '#FFFFFF' }
        size = { 16 }
        src = { IconHands } />,
    'IC_ROLE_CAPTIONER': <Icon
        color = { '#FFFFFF' }
        size = { 16 }
        src = { IconMessage } />,
    participant: null
};

export const DEFAULT_MEETING_ROLE = 'participant';

/**
 * Icon mapping for required technical support.
 */
export const TechnicalSupportIcons = (<Icon
    color = { '#' }
    size = { 16 }
    src = { IconLifeSaver } />);

export const TECHNICAL_SUPPORT_REQUIRED = true;

/**
 * Icon mapping for required escort.
 */
export const EscortIcons = (<Icon
    color = { '#' }
    size = { 16 }
    src = { IconGridPlus } />);

export const ESCORT_REQUIRED = true;

/**
 * Icon mapping for offered support.
 */
export const SupportOfferIcons = (<Icon
    color = { '#' }
    size = { 16 }
    src = { IconBullhorn } />);

export const SUPPORT_OFFERED = true;

