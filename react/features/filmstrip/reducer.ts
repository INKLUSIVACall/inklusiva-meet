import { PARTICIPANT_LEFT } from '../base/participants/actionTypes';
import ReducerRegistry from '../base/redux/ReducerRegistry';

import {
    CLEAR_STAGE_PARTICIPANTS,
    REMOVE_STAGE_PARTICIPANT,
    RESET_PARTICIPANT_BRIGHTNESS,
    RESET_PARTICIPANT_CONTRAST,
    RESET_PARTICIPANT_OPACITY,
    RESET_PARTICIPANT_SATURATION,
    RESET_PARTICIPANT_ZOOM_LEVEL,
    SET_FILMSTRIP_ENABLED,
    SET_FILMSTRIP_HEIGHT,
    SET_FILMSTRIP_VISIBLE,
    SET_FILMSTRIP_WIDTH,
    SET_FREQUENCY_FILTER_SETTING,
    SET_HORIZONTAL_VIEW_DIMENSIONS,
    SET_MOVING_SIGN_LANGUAGE_PARTICIPANT,
    SET_PARTICIPANT_BRIGHTNESS,
    SET_PARTICIPANT_CONTRAST,
    SET_PARTICIPANT_OPACITY,
    SET_PARTICIPANT_SATURATION,
    SET_PARTICIPANT_ZOOM_LEVEL,
    SET_REMOTE_PARTICIPANTS,
    SET_SCREENSHARE_FILMSTRIP_PARTICIPANT,
    SET_SCREENSHARING_TILE_DIMENSIONS,
    SET_STAGE_FILMSTRIP_DIMENSIONS,
    SET_STAGE_PARTICIPANTS,
    SET_TILE_VIEW_DIMENSIONS,
    SET_TOP_PANEL_VISIBILITY,
    SET_USER_FILMSTRIP_HEIGHT,
    SET_USER_FILMSTRIP_WIDTH,
    SET_USER_IS_RESIZING,
    SET_VERTICAL_VIEW_DIMENSIONS,
    SET_VISIBLE_REMOTE_PARTICIPANTS,
    SET_VOLUME
} from './actionTypes';


const DEFAULT_STATE = {

    /**
     * The list of participants to be displayed on the stage filmstrip.
     */
    activeParticipants: [],

    /**
     * The indicator which determines whether the {@link Filmstrip} is enabled.
     *
     * @public
     * @type {boolean}
     */
    enabled: true,

    /**
     * The horizontal view dimensions.
     *
     * @public
     * @type {Object}
     */
    horizontalViewDimensions: {},

    /**
     * Whether or not the user is actively resizing the filmstrip.
     *
     * @public
     * @type {boolean}
     */
    isResizing: false,

    /**
     * The custom audio volume levels per participant.
     *
     * @type {Object}
     */
    participantsVolume: {},

    /**
     * The custom frequency filter setting per participant.
     *
     * @type {Object}
     */
    participantsFrequencySetting: {},

    /**
     * The brightness of each participant.
     *
     * @type {Object}
     */
    participantsBrightness: {},

    /**
     * The contrast of each participant.
     *
     * @type {Object}
     */
    participantsContrast: {},

    /**
     * The opacity of each participant.
     *
     * @type {Object}
     */
    participantsOpacity: {},

    /**
     * The opacity of local participant.
     *
     * @type {Object}
     */
    localOpacity: 0,

    /**
     * The id of the participant whose video will have the highest zIndex in the filmstrip.
     */
    movingSignlanguageParticipant: null,

    /**
     * The saturation of each participant.
     *
     * @type {Object}
     */
    participantsSaturation: {},

    /**
     * The zoom level of each participant.
     *
     * @type {Object}
     */
    participantZoomLevel: {},

    /**
     * The ordered IDs of the remote participants displayed in the filmstrip.
     *
     * @public
     * @type {Array<string>}
     */
    remoteParticipants: [],

    /**
     * The dimensions of the screenshare filmstrip.
     */
    screenshareFilmstripDimensions: {},

    /**
     * The id of the participant whose screenshare to
     * display on the screenshare filmstrip.
     */
    screenshareFilmstripParticipantId: null,

    /**
     * The stage filmstrip view dimensions.
     *
     * @public
     * @type {Object}
     */
    stageFilmstripDimensions: {},

    /**
     * The tile view dimensions.
     *
     * @public
     * @type {Object}
     */
    tileViewDimensions: {},

    /**
     * The height of the resizable top panel.
     */
    topPanelHeight: {
        /**
         * Current height. Affected by: user top panel resize,
         * window resize.
         */
        current: null,

        /**
         * Height set by user resize. Used as the preferred height.
         */
        userSet: null
    },

    /**
     * The indicator determines if the top panel is visible.
     */
    topPanelVisible: true,

    /**
     * The vertical view dimensions.
     *
     * @public
     * @type {Object}
     */
    verticalViewDimensions: {},

    /**
     * The indicator which determines whether the {@link Filmstrip} is visible.
     *
     * @public
     * @type {boolean}
     */
    visible: true,

    /**
     * The end index in the remote participants array that is visible in the filmstrip.
     *
     * @public
     * @type {number}
     */
    visibleParticipantsEndIndex: 0,

    /**
     * The start index in the remote participants array that is visible in the filmstrip.
     *
     * @public
     * @type {number}
     */
    visibleParticipantsStartIndex: 0,

    /**
     * The visible remote participants in the filmstrip.
     *
     * @public
     * @type {Set<string>}
     */
    visibleRemoteParticipants: new Set<string>(),

    /**
     * The width of the resizable filmstrip.
     *
     * @public
     * @type {Object}
     */
    width: {
        /**
         * Current width. Affected by: user filmstrip resize,
         * window resize, panels open/ close.
         */
        current: null,

        /**
         * Width set by user resize. Used as the preferred width.
         */
        userSet: null
    }
};

interface IDimensions {
    height: number;
    width: number;
}

interface IFilmstripDimensions {
    columns?: number;
    filmstripHeight?: number;
    filmstripWidth?: number;
    gridDimensions?: {
        columns: number;
        rows: number;
    };
    hasScroll?: boolean;
    thumbnailSize?: IDimensions;
}

export interface IFilmstripState {
    activeParticipants: Array<{
        participantId: string;
        pinned?: boolean;
    }>;
    enabled: boolean;
    horizontalViewDimensions: {
        hasScroll?: boolean;
        local?: IDimensions;
        remote?: IDimensions;
        remoteVideosContainer?: IDimensions;
    };
    isResizing: boolean;
    localOpacity: number | null;
    movingSignlanguageParticipant: string | null;
    participantZoomLevel: {
        [participantId: string]: number;
    };
    participantsBrightness: {
        [participantID: string]: number;
    };
    participantsContrast: {
        [participantID: string]: number;
    };
    participantsFrequencySetting: {
        [participantId: string]: number;
    };
    participantsOpacity: {
        [participantId: string]: number;
    };
    participantsSaturation: {
        [participantID: string]: number;
    };
    participantsVolume: {
        [participantId: string]: number;
    };
    remoteParticipants: string[];
    screenshareFilmstripDimensions: {
        filmstripHeight?: number;
        filmstripWidth?: number;
        thumbnailSize?: IDimensions;
    };
    screenshareFilmstripParticipantId?: string | null;
    stageFilmstripDimensions: IFilmstripDimensions;
    tileViewDimensions?: IFilmstripDimensions;
    topPanelHeight: {
        current: number | null;
        userSet: number | null;
    };
    topPanelVisible: boolean;
    verticalViewDimensions: {
        gridView?: {
            gridDimensions: {
                columns: number;
                rows: number;
            };
            hasScroll: boolean;
            thumbnailSize: IDimensions;
        };
        hasScroll?: boolean;
        local?: IDimensions;
        remote?: IDimensions;
        remoteVideosContainer?: IDimensions;
    };
    visible: boolean;
    visibleParticipantsEndIndex: number;
    visibleParticipantsStartIndex: number;
    visibleRemoteParticipants: Set<string>;
    width: {
        current: number | null;
        userSet: number | null;
    };
}

ReducerRegistry.register<IFilmstripState>(
    'features/filmstrip',
    (state = DEFAULT_STATE, action): IFilmstripState => {
        switch (action.type) {
        case SET_FILMSTRIP_ENABLED:
            // In the InklusivaCall-Version of Jitsi, we never want to show the Filmstrip, so we always set it to false.
            // original code:
            /*
            return {
                ...state,
                enabled: action.enabled
            };
            */
            return {
                ...state,
                enabled: false
            };

        case SET_FILMSTRIP_VISIBLE:
            // In the InklusivaCall-Version of Jitsi, we never want to show the Filmstrip, so we always set it to false.
            // original code:
            /*
            return {
                ...state,
                visible: action.visible
            };
            */
            return {
                ...state,
                visible: false
            };

        case SET_HORIZONTAL_VIEW_DIMENSIONS:
            return {
                ...state,
                horizontalViewDimensions: action.dimensions
            };
        case SET_REMOTE_PARTICIPANTS: {
            state.remoteParticipants = action.participants;
            const { visibleParticipantsStartIndex: startIndex, visibleParticipantsEndIndex: endIndex } = state;

            state.visibleRemoteParticipants = new Set(state.remoteParticipants.slice(startIndex, endIndex + 1));

            return { ...state };
        }
        case SET_TILE_VIEW_DIMENSIONS:
            return {
                ...state,
                tileViewDimensions: action.dimensions
            };
        case SET_VERTICAL_VIEW_DIMENSIONS:
            return {
                ...state,
                verticalViewDimensions: action.dimensions
            };
        case SET_VOLUME:
            return {
                ...state,
                participantsVolume: {
                    ...state.participantsVolume,

                    // NOTE: This would fit better in the features/base/participants. But currently we store
                    // the participants as an array which will make it expensive to search for the volume for
                    // every participant separately.
                    [action.participantId]: action.volume
                }
            };
        case SET_FREQUENCY_FILTER_SETTING:
            return {
                ...state,
                participantsFrequencySetting: {
                    ...state.participantsFrequencySetting,

                    // NOTE: Same note for Volume
                    [action.participantId]: action.setting
                }
            };
        case SET_PARTICIPANT_BRIGHTNESS: {
            return {
                ...state,
                participantsBrightness: {
                    ...state.participantsBrightness,

                    [action.participantId]: action.brightness
                }
            };
        }
        case SET_PARTICIPANT_CONTRAST: {
            return {
                ...state,
                participantsContrast: {
                    ...state.participantsContrast,

                    [action.participantId]: action.contrast
                }
            };
        }
        case SET_PARTICIPANT_OPACITY: {
            return {
                ...state,
                participantsOpacity: {
                    ...state.participantsOpacity,

                    [action.participantId]: action.opacity
                }
            };
        }
        case SET_PARTICIPANT_SATURATION: {
            return {
                ...state,
                participantsSaturation: {
                    ...state.participantsSaturation,

                    [action.participantId]: action.saturation
                }
            };
        }
        case SET_PARTICIPANT_ZOOM_LEVEL: {
            return {
                ...state,
                participantZoomLevel: {
                    ...state.participantZoomLevel,

                    [action.participantId]: action.zoomLevel
                }
            };
        }
        case RESET_PARTICIPANT_BRIGHTNESS: {
            return {
                ...state,
                participantsBrightness: {
                }
            };
        }
        case RESET_PARTICIPANT_CONTRAST: {
            return {
                ...state,
                participantsContrast: {
                }
            };
        }
        case RESET_PARTICIPANT_OPACITY: {
            return {
                ...state,
                participantsOpacity: {
                }
            };
        }
        case RESET_PARTICIPANT_SATURATION: {
            return {
                ...state,
                participantsSaturation: {
                }
            };
        }
        case RESET_PARTICIPANT_ZOOM_LEVEL: {
            return {
                ...state,
                participantZoomLevel: {
                }
            };
        }
        case SET_VISIBLE_REMOTE_PARTICIPANTS: {
            const { endIndex, startIndex } = action;
            const { remoteParticipants } = state;
            const visibleRemoteParticipants = new Set(remoteParticipants.slice(startIndex, endIndex + 1));

            return {
                ...state,
                visibleParticipantsStartIndex: startIndex,
                visibleParticipantsEndIndex: endIndex,
                visibleRemoteParticipants
            };
        }
        case PARTICIPANT_LEFT: {
            const { id, local } = action.participant;

            if (local) {
                return state;
            }
            delete state.participantsVolume[id];

            return {
                ...state
            };
        }
        case SET_FILMSTRIP_HEIGHT:{
            return {
                ...state,
                topPanelHeight: {
                    ...state.topPanelHeight,
                    current: action.height
                }
            };
        }
        case SET_FILMSTRIP_WIDTH: {
            return {
                ...state,
                width: {
                    ...state.width,
                    current: action.width
                }
            };
        }
        case SET_USER_FILMSTRIP_HEIGHT: {
            const { height } = action;

            return {
                ...state,
                topPanelHeight: {
                    current: height,
                    userSet: height
                }
            };
        }
        case SET_USER_FILMSTRIP_WIDTH: {
            const { width } = action;

            return {
                ...state,
                width: {
                    current: width,
                    userSet: width
                }
            };
        }
        case SET_USER_IS_RESIZING: {
            return {
                ...state,
                isResizing: action.resizing
            };
        }
        case SET_STAGE_FILMSTRIP_DIMENSIONS: {
            return {
                ...state,
                stageFilmstripDimensions: action.dimensions
            };
        }
        case SET_STAGE_PARTICIPANTS: {
            return {
                ...state,
                activeParticipants: action.queue
            };
        }
        case REMOVE_STAGE_PARTICIPANT: {
            return {
                ...state,
                activeParticipants: state.activeParticipants.filter(p => p.participantId !== action.participantId)
            };
        }
        case CLEAR_STAGE_PARTICIPANTS: {
            return {
                ...state,
                activeParticipants: []
            };
        }
        case SET_SCREENSHARING_TILE_DIMENSIONS: {
            return {
                ...state,
                screenshareFilmstripDimensions: action.dimensions
            };
        }
        case SET_TOP_PANEL_VISIBILITY: {
            return {
                ...state,
                topPanelVisible: action.visible
            };
        }
        case SET_SCREENSHARE_FILMSTRIP_PARTICIPANT: {
            return {
                ...state,
                screenshareFilmstripParticipantId: action.participantId
            };
        }
        case SET_MOVING_SIGN_LANGUAGE_PARTICIPANT: {
            return {
                ...state,
                movingSignlanguageParticipant: action.participantId
            };
        }}

        return state;
    });
