import { ICRole } from '../conference/icRoles';
import { IJitsiConference } from '../conference/reducer';

export enum FakeParticipant {
    LocalScreenShare = 'LocalScreenShare',
    RemoteScreenShare = 'RemoteScreenShare',
    SharedVideo = 'SharedVideo',
    Whiteboard = 'Whiteboard'
}

export interface IParticipant {
    avatarURL?: string;
    botType?: string;
    conference?: IJitsiConference;
    displayName?: string;
    dominantSpeaker?: boolean;
    e2eeEnabled?: boolean;
    e2eeSupported?: boolean;
    e2eeVerificationAvailable?: boolean;
    e2eeVerified?: boolean;
    email?: string;
    fakeParticipant?: FakeParticipant;
    features?: {
        'screen-sharing'?: boolean | string;
    };
    getId?: Function;
    icRoles?: ICRole[];
    id: string;
    isJigasi?: boolean;
    isReplaced?: boolean;
    isReplacing?: number;
    jwtId?: string;
    loadableAvatarUrl?: string;
    loadableAvatarUrlUseCORS?: boolean;
    local?: boolean;
    localRecording?: string;
    name?: string;
    pinned?: boolean;
    presence?: string;
    raisedHandTimestamp?: number;
    region?: string;
    remoteControlSessionStatus?: boolean;
    role?: string;
    sources?: Map<string, Map<string, ISourceInfo>>;
    supportsRemoteControl?: boolean;
    tags?: string[];
}

export interface ILocalParticipant extends IParticipant {
    audioOutputDeviceId?: string;
    cameraDeviceId?: string;
    jwtId?: string;
    micDeviceId?: string;
    startWithAudioMuted?: boolean;
    startWithVideoMuted?: boolean;
    userSelectedMicDeviceId?: string;
    userSelectedMicDeviceLabel?: string;
}

export interface ISourceInfo {
    muted: boolean;
    videoType: string;
}

export interface IJitsiParticipant {
    addICRole: (icRole: string, partnerId: string | null) => void;
    getDisplayName: () => string;
    getId: () => string;
    getJid: () => string;
    getRole: () => string;
    getSources: () => Map<string, Map<string, ISourceInfo>>;
    getTags: () => string[];
    isHidden: () => boolean;
    removeICRole: (icRole: string, partnerId: string | null) => void;
}
