import debounce from 'lodash/debounce';

import { IReduxState, IStore } from '../app/types';
import { _handleParticipantError } from '../base/conference/functions';
import { IC_ROLES } from '../base/conference/icRoles';
import { getSsrcRewritingFeatureFlag } from '../base/config/functions.any';
import { MEDIA_TYPE } from '../base/media/constants';
import { getLocalParticipant, getSourceNamesByMediaType } from '../base/participants/functions';
import StateListenerRegistry from '../base/redux/StateListenerRegistry';
import { getTrackSourceNameByMediaTypeAndParticipant } from '../base/tracks/functions';
import { reportError } from '../base/util/helpers';
import {
    getActiveParticipantsIds,
    getScreenshareFilmstripParticipantId,
    isTopPanelEnabled
} from '../filmstrip/functions';
import { LAYOUTS } from '../video-layout/constants';
import {
    getCurrentLayout,
    getVideoQualityForLargeVideo,
    getVideoQualityForResizableFilmstripThumbnails,
    getVideoQualityForScreenSharingFilmstrip,
    getVideoQualityForStageThumbnails,
    shouldDisplayTileView
} from '../video-layout/functions';

import {
    setMaxReceiverVideoQualityForLargeVideo,
    setMaxReceiverVideoQualityForScreenSharingFilmstrip,
    setMaxReceiverVideoQualityForStageFilmstrip,
    setMaxReceiverVideoQualityForTileView,
    setMaxReceiverVideoQualityForVerticalFilmstrip
} from './actions';
import { MAX_VIDEO_QUALITY, VIDEO_QUALITY_LEVELS, VIDEO_QUALITY_UNLIMITED } from './constants';
import { getReceiverVideoQualityLevel } from './functions';
import logger from './logger';
import { getMinHeightForQualityLvlMap } from './selector';

/**
 * Handles changes in the visible participants in the filmstrip. The listener is debounced
 * so that the client doesn't end up sending too many bridge messages when the user is
 * scrolling through the thumbnails prompting updates to the selected endpoints.
 */
StateListenerRegistry.register(
    /* selector */ state => state['features/filmstrip'].visibleRemoteParticipants,
    /* listener */ debounce((visibleRemoteParticipants, store) => {
        _updateReceiverVideoConstraints(store);
    }, 100)
);

StateListenerRegistry.register(
    /* selector */ state => state['features/base/tracks'],
    /* listener */ (remoteTracks, store) => {
        _updateReceiverVideoConstraints(store);
    }
);

/**
 * Handles the use case when the on-stage participant has changed.
 */
StateListenerRegistry.register(
    state => state['features/large-video'].participantId,
    (participantId, store) => {
        _updateReceiverVideoConstraints(store);
    }
);

/**
 * Handles the use case when we have set some of the constraints in redux but the conference object wasn't available
 * and we haven't been able to pass the constraints to lib-jitsi-meet.
 */
StateListenerRegistry.register(
    state => state['features/base/conference'].conference,
    (conference, store) => {
        _updateReceiverVideoConstraints(store);
    }
);

/**
 * StateListenerRegistry provides a reliable way of detecting changes to
 * lastn state and dispatching additional actions.
 */
StateListenerRegistry.register(
    /* selector */ state => state['features/base/lastn'].lastN,
    /* listener */ (lastN, store) => {
        _updateReceiverVideoConstraints(store);
    }
);

/**
 * Updates the receiver constraints when the stage participants change.
 */
StateListenerRegistry.register(
    state => getActiveParticipantsIds(state).sort(),
    (_, store) => {
        _updateReceiverVideoConstraints(store);
    },
    {
        deepEquals: true
    }
);

/**
 * Updates the receiver constraints when new video sources are added to the conference.
 */
StateListenerRegistry.register(
    /* selector */ state => state['features/base/participants'].remoteVideoSources,
    /* listener */ (remoteVideoSources, store) => {
        getSsrcRewritingFeatureFlag(store.getState()) && _updateReceiverVideoConstraints(store);
    }
);

/**
 * StateListenerRegistry provides a reliable way of detecting changes to
 * maxReceiverVideoQuality* and preferredVideoQuality state and dispatching additional actions.
 */
StateListenerRegistry.register(
    /* selector */ state => {
        const {
            maxReceiverVideoQualityForLargeVideo,
            maxReceiverVideoQualityForScreenSharingFilmstrip,
            maxReceiverVideoQualityForStageFilmstrip,
            maxReceiverVideoQualityForTileView,
            maxReceiverVideoQualityForVerticalFilmstrip,
            preferredVideoQuality
        } = state['features/video-quality'];

        return {
            maxReceiverVideoQualityForLargeVideo,
            maxReceiverVideoQualityForScreenSharingFilmstrip,
            maxReceiverVideoQualityForStageFilmstrip,
            maxReceiverVideoQualityForTileView,
            maxReceiverVideoQualityForVerticalFilmstrip,
            preferredVideoQuality
        };
    },
    /* listener */ (currentState, store, previousState = {}) => {
        const { preferredVideoQuality } = currentState;
        const changedPreferredVideoQuality = preferredVideoQuality !== previousState.preferredVideoQuality;

        if (changedPreferredVideoQuality) {
            _setSenderVideoConstraint(preferredVideoQuality, store);
            typeof APP !== 'undefined' && APP.API.notifyVideoQualityChanged(preferredVideoQuality);
        }
        _updateReceiverVideoConstraints(store);
    },
    {
        deepEquals: true
    }
);

/**
 * Implements a state listener in order to calculate max receiver video quality.
 */
StateListenerRegistry.register(
    /* selector */ state => {
        const { reducedUI } = state['features/base/responsive-ui'];
        const _shouldDisplayTileView = shouldDisplayTileView(state);
        const tileViewThumbnailSize = state['features/filmstrip']?.tileViewDimensions?.thumbnailSize;
        const { visibleRemoteParticipants } = state['features/filmstrip'];
        const { height: largeVideoHeight } = state['features/large-video'];
        const activeParticipantsIds = getActiveParticipantsIds(state);
        const {
            screenshareFilmstripDimensions: { thumbnailSize }
        } = state['features/filmstrip'];
        const screenshareFilmstripParticipantId = getScreenshareFilmstripParticipantId(state);
        const { assistant } = state['features/inklusiva/userdata'];

        return {
            activeParticipantsCount: activeParticipantsIds?.length,
            displayTileView: _shouldDisplayTileView,
            largeVideoHeight,
            participantCount: visibleRemoteParticipants?.size || 0,
            reducedUI,
            screenSharingFilmstripHeight:
                screenshareFilmstripParticipantId && getCurrentLayout(state) === LAYOUTS.STAGE_FILMSTRIP_VIEW
                    ? thumbnailSize?.height
                    : undefined,
            stageFilmstripThumbnailHeight: state['features/filmstrip'].stageFilmstripDimensions?.thumbnailSize?.height,
            tileViewThumbnailHeight: tileViewThumbnailSize?.height,
            verticalFilmstripThumbnailHeight:
                state['features/filmstrip'].verticalViewDimensions?.gridView?.thumbnailSize?.height,
            signLangDisplay: assistant.signLang.display
        };
    },
    /* listener */ (
            {
                activeParticipantsCount,
                displayTileView,
                largeVideoHeight,
                participantCount,
                reducedUI,
                screenSharingFilmstripHeight,
                stageFilmstripThumbnailHeight,
                tileViewThumbnailHeight,
                verticalFilmstripThumbnailHeight
            },
            store,
            previousState = {}
    ) => {
        const { dispatch, getState } = store;
        const state = getState();
        const {
            maxReceiverVideoQualityForLargeVideo,
            maxReceiverVideoQualityForScreenSharingFilmstrip,
            maxReceiverVideoQualityForStageFilmstrip,
            maxReceiverVideoQualityForTileView,
            maxReceiverVideoQualityForVerticalFilmstrip
        } = state['features/video-quality'];
        const { maxFullResolutionParticipants = 2 } = state['features/base/config'];
        let maxVideoQualityChanged = false;

        if (displayTileView) {
            let newMaxRecvVideoQuality = VIDEO_QUALITY_LEVELS.STANDARD;

            if (reducedUI) {
                newMaxRecvVideoQuality = VIDEO_QUALITY_LEVELS.LOW;
            } else if (typeof tileViewThumbnailHeight === 'number' && !Number.isNaN(tileViewThumbnailHeight)) {
                newMaxRecvVideoQuality = getReceiverVideoQualityLevel(
                    tileViewThumbnailHeight,
                    getMinHeightForQualityLvlMap(state)
                );

                // Override HD level calculated for the thumbnail height when # of participants threshold is exceeded
                if (maxFullResolutionParticipants !== -1) {
                    const override
                        = participantCount > maxFullResolutionParticipants
                        && newMaxRecvVideoQuality > VIDEO_QUALITY_LEVELS.STANDARD;

                    logger.info(
                        `Video quality level for thumbnail height: ${tileViewThumbnailHeight}, `
                            + `is: ${newMaxRecvVideoQuality}, `
                            + `override: ${String(override)}, `
                            + `max full res N: ${maxFullResolutionParticipants}`
                    );

                    if (override) {
                        newMaxRecvVideoQuality = VIDEO_QUALITY_LEVELS.STANDARD;
                    }
                }
            }

            if (maxReceiverVideoQualityForTileView !== newMaxRecvVideoQuality) {
                maxVideoQualityChanged = true;

                // Ugly hack to avoid setting the max quality to high
                // dispatch(setMaxReceiverVideoQualityForTileView(VIDEO_QUALITY_LEVELS.HIGH));

                // console.log('VQ', 'Tile view', newMaxRecvVideoQuality);
                dispatch(setMaxReceiverVideoQualityForTileView(newMaxRecvVideoQuality));
            }
        } else {
            let newMaxRecvVideoQualityForStageFilmstrip;
            let newMaxRecvVideoQualityForVerticalFilmstrip;
            let newMaxRecvVideoQualityForLargeVideo;
            let newMaxRecvVideoQualityForScreenSharingFilmstrip;

            if (reducedUI) {
                newMaxRecvVideoQualityForVerticalFilmstrip
                    = newMaxRecvVideoQualityForStageFilmstrip
                    = newMaxRecvVideoQualityForLargeVideo
                    = newMaxRecvVideoQualityForScreenSharingFilmstrip
                        = VIDEO_QUALITY_LEVELS.LOW;
            } else {
                newMaxRecvVideoQualityForStageFilmstrip = getVideoQualityForStageThumbnails(
                    stageFilmstripThumbnailHeight,
                    state
                );
                newMaxRecvVideoQualityForVerticalFilmstrip = getVideoQualityForResizableFilmstripThumbnails(
                    verticalFilmstripThumbnailHeight,
                    state
                );
                newMaxRecvVideoQualityForLargeVideo = getVideoQualityForLargeVideo(largeVideoHeight);
                newMaxRecvVideoQualityForScreenSharingFilmstrip = getVideoQualityForScreenSharingFilmstrip(
                    screenSharingFilmstripHeight,
                    state
                );

                // Override HD level calculated for the thumbnail height when # of participants threshold is exceeded
                if (maxFullResolutionParticipants !== -1) {
                    if (
                        activeParticipantsCount > 0
                        && newMaxRecvVideoQualityForStageFilmstrip > VIDEO_QUALITY_LEVELS.STANDARD
                    ) {
                        const isScreenSharingFilmstripParticipantFullResolution
                            = newMaxRecvVideoQualityForScreenSharingFilmstrip > VIDEO_QUALITY_LEVELS.STANDARD;

                        if (
                            activeParticipantsCount
                            > maxFullResolutionParticipants - (isScreenSharingFilmstripParticipantFullResolution ? 1 : 0)
                        ) {
                            newMaxRecvVideoQualityForStageFilmstrip = VIDEO_QUALITY_LEVELS.STANDARD;
                            newMaxRecvVideoQualityForVerticalFilmstrip = Math.min(
                                VIDEO_QUALITY_LEVELS.STANDARD,
                                newMaxRecvVideoQualityForVerticalFilmstrip
                            );
                        } else if (
                            newMaxRecvVideoQualityForVerticalFilmstrip > VIDEO_QUALITY_LEVELS.STANDARD
                            && participantCount > maxFullResolutionParticipants - activeParticipantsCount
                        ) {
                            newMaxRecvVideoQualityForVerticalFilmstrip = VIDEO_QUALITY_LEVELS.STANDARD;
                        }
                    } else if (
                        newMaxRecvVideoQualityForVerticalFilmstrip > VIDEO_QUALITY_LEVELS.STANDARD
                        && participantCount
                            > maxFullResolutionParticipants
                                - (newMaxRecvVideoQualityForLargeVideo > VIDEO_QUALITY_LEVELS.STANDARD ? 1 : 0)
                    ) {
                        newMaxRecvVideoQualityForVerticalFilmstrip = VIDEO_QUALITY_LEVELS.STANDARD;
                    }
                }
            }

            if (maxReceiverVideoQualityForStageFilmstrip !== newMaxRecvVideoQualityForStageFilmstrip) {
                maxVideoQualityChanged = true;

                // console.log('VQ', 'Stage Filmstrip', newMaxRecvVideoQualityForStageFilmstrip);
                dispatch(setMaxReceiverVideoQualityForStageFilmstrip(newMaxRecvVideoQualityForStageFilmstrip));

                // ugly hack to avoid setting the max quality to high
                // dispatch(setMaxReceiverVideoQualityForStageFilmstrip(VIDEO_QUALITY_LEVELS.HIGH));
            }

            if (maxReceiverVideoQualityForVerticalFilmstrip !== newMaxRecvVideoQualityForVerticalFilmstrip) {
                maxVideoQualityChanged = true;

                // console.log('VQ', 'Vertical Filmstrip', newMaxRecvVideoQualityForVerticalFilmstrip);
                dispatch(setMaxReceiverVideoQualityForVerticalFilmstrip(newMaxRecvVideoQualityForVerticalFilmstrip));

                // ugly hack to avoid setting the max quality to high
                // dispatch(setMaxReceiverVideoQualityForVerticalFilmstrip(VIDEO_QUALITY_LEVELS.HIGH));
            }

            if (maxReceiverVideoQualityForLargeVideo !== newMaxRecvVideoQualityForLargeVideo) {
                maxVideoQualityChanged = true;

                // console.log('VQ', 'Large Video', newMaxRecvVideoQualityForLargeVideo);
                // ugly hack to avoid setting the max quality to high
                dispatch(setMaxReceiverVideoQualityForLargeVideo(newMaxRecvVideoQualityForLargeVideo));

                // dispatch(setMaxReceiverVideoQualityForLargeVideo(VIDEO_QUALITY_LEVELS.HIGH));
            }

            if (maxReceiverVideoQualityForScreenSharingFilmstrip !== newMaxRecvVideoQualityForScreenSharingFilmstrip) {
                maxVideoQualityChanged = true;

                // console.log('VQ', 'Screen Sharing', newMaxRecvVideoQualityForScreenSharingFilmstrip);
                dispatch(
                    setMaxReceiverVideoQualityForScreenSharingFilmstrip(newMaxRecvVideoQualityForScreenSharingFilmstrip)
                );

                // ugly hack to avoid setting the max quality to high
                // dispatch(setMaxReceiverVideoQualityForScreenSharingFilmstrip(VIDEO_QUALITY_LEVELS.HIGH));
            }
        }

        if (!maxVideoQualityChanged && Boolean(displayTileView) !== Boolean(previousState.displayTileView)) {
            _updateReceiverVideoConstraints(store);
        }
    },
    {
        deepEquals: true
    }
);

/**
 * Returns the source names asociated with the given participants list.
 *
 * @param {Array<string>} participantList - The list of participants.
 * @param {Object} state - The redux state.
 * @returns {Array<string>}
 */
function _getSourceNames(participantList: Array<string>, state: IReduxState): Array<string> {
    const { remoteScreenShares } = state['features/video-layout'];
    const tracks = state['features/base/tracks'];
    const sourceNamesList: string[] = [];

    participantList.forEach(participantId => {
        if (getSsrcRewritingFeatureFlag(state)) {
            const sourceNames: string[] | undefined = getSourceNamesByMediaType(state, participantId, MEDIA_TYPE.VIDEO);

            sourceNames?.length && sourceNamesList.push(...sourceNames);
        } else {
            let sourceName: string;

            if (remoteScreenShares.includes(participantId)) {
                sourceName = participantId;
            } else {
                sourceName = getTrackSourceNameByMediaTypeAndParticipant(tracks, MEDIA_TYPE.VIDEO, participantId);
            }

            if (sourceName) {
                sourceNamesList.push(sourceName);
            }
        }
    });

    return sourceNamesList;
}

/**
 * Helper function for updating the preferred sender video constraint, based on the user preference.
 *
 * @param {number} preferred - The user preferred max frame height.
 * @returns {void}
 */
function _setSenderVideoConstraint(preferred: number, { getState }: IStore) {
    const state = getState();
    const { conference } = state['features/base/conference'];

    if (!conference) {
        return;
    }

    logger.info(`Setting sender resolution to ${preferred}`);
    conference.setSenderVideoConstraint(preferred).catch((error: any) => {
        _handleParticipantError(error);
        reportError(error, `Changing sender resolution to ${preferred} failed.`);
    });
}

/**
 * Private helper to calculate the receiver video constraints and set them on the bridge channel.
 *
 * @param {*} store - The redux store.
 * @returns {void}
 */
function _updateReceiverVideoConstraints({ getState }: IStore) {
    const state = getState();
    const { conference } = state['features/base/conference'];

    if (!conference) {
        return;
    }
    const { lastN } = state['features/base/lastn'];
    const {
        maxReceiverVideoQualityForTileView,
        maxReceiverVideoQualityForStageFilmstrip,
        maxReceiverVideoQualityForVerticalFilmstrip,
        maxReceiverVideoQualityForLargeVideo,
        maxReceiverVideoQualityForScreenSharingFilmstrip,
        preferredVideoQuality
    } = state['features/video-quality'];
    const { participantId: largeVideoParticipantId = '' } = state['features/large-video'];
    const maxFrameHeightForTileView = Math.min(maxReceiverVideoQualityForTileView, preferredVideoQuality);
    const maxFrameHeightForStageFilmstrip = Math.min(maxReceiverVideoQualityForStageFilmstrip, preferredVideoQuality);
    const maxFrameHeightForVerticalFilmstrip = Math.min(
        maxReceiverVideoQualityForVerticalFilmstrip,
        preferredVideoQuality
    );
    const maxFrameHeightForLargeVideo = Math.min(maxReceiverVideoQualityForLargeVideo, preferredVideoQuality);
    const maxFrameHeightForScreenSharingFilmstrip = Math.min(
        maxReceiverVideoQualityForScreenSharingFilmstrip,
        preferredVideoQuality
    );
    const { remoteScreenShares } = state['features/video-layout'];
    const { visibleRemoteParticipants: visibleRemoteParticipantsOriginal, remoteParticipants }
        = state['features/filmstrip'];
    const tracks = state['features/base/tracks'];
    const localParticipantId = getLocalParticipant(state)?.id;
    const activeParticipantsIds = getActiveParticipantsIds(state);
    const screenshareFilmstripParticipantId = isTopPanelEnabled(state) && getScreenshareFilmstripParticipantId(state);

    const receiverConstraints: any = {
        constraints: {},
        defaultConstraints: { maxHeight: VIDEO_QUALITY_LEVELS.NONE },
        lastN
    };

    const signLanguageParticipantIds: string[] = [];
    const { assistant } = state['features/inklusiva/userdata'];

    if (assistant.signLang.display === 'window') {
        remoteParticipants?.forEach((participantId: string) => {
            if (conference?.checkMemberHasRole(participantId, IC_ROLES.SIGN_LANG_TRANSLATOR)) {
                signLanguageParticipantIds.push(participantId);
            }
        });
    }

    // Sign Language Translators must be among the visible remote participants.
    const visibleRemoteParticipants: Set<string> = new Set(visibleRemoteParticipantsOriginal);

    if (signLanguageParticipantIds.length) {
        signLanguageParticipantIds.forEach(participantId => {
            if (!visibleRemoteParticipants.has(participantId)) {
                visibleRemoteParticipants.add(participantId);
            }
        });
    }

    let activeParticipantsSources: string[] = [];
    let visibleRemoteTrackSourceNames: string[] = [];
    let largeVideoSourceName: string | undefined;
    let signLanguageParticipantSources: string[] = [];

    receiverConstraints.onStageSources = [];
    receiverConstraints.selectedSources = [];

    if (visibleRemoteParticipants?.size) {
        visibleRemoteTrackSourceNames = _getSourceNames(Array.from(visibleRemoteParticipants), state);
    }
    if (signLanguageParticipantIds?.length) {
        signLanguageParticipantSources = _getSourceNames(signLanguageParticipantIds, state);
        if (receiverConstraints.lastN) {
            receiverConstraints.lastN = Math.max(receiverConstraints.lastN, signLanguageParticipantIds.length + 1);
        } else {
            receiverConstraints.lastN = Math.max(signLanguageParticipantIds.length + 1, 20);
        }
    }

    if (activeParticipantsIds?.length > 0) {
        activeParticipantsSources = _getSourceNames(activeParticipantsIds, state);
    }

    if (localParticipantId !== largeVideoParticipantId) {
        if (remoteScreenShares.includes(largeVideoParticipantId)) {
            largeVideoSourceName = largeVideoParticipantId;
        } else {
            largeVideoSourceName = getSsrcRewritingFeatureFlag(state)
                ? getSourceNamesByMediaType(state, largeVideoParticipantId, MEDIA_TYPE.VIDEO)?.[0]
                : getTrackSourceNameByMediaTypeAndParticipant(tracks, MEDIA_TYPE.VIDEO, largeVideoParticipantId);
        }
    }

    // Tile view.
    if (shouldDisplayTileView(state)) {
        if (!visibleRemoteTrackSourceNames?.length) {
            return;
        }

        // console.log('VQ', 'Tile View Default MaxHeight', maxFrameHeightForTileView);

        visibleRemoteTrackSourceNames.forEach(sourceName => {
            // Sign language translators should always be displayed in high quality if they use the window display mode.
            // if (signLanguageParticipantSources.includes(sourceName)) {
            //     receiverConstraints.constraints[sourceName] = { maxHeight: VIDEO_QUALITY_LEVELS.HIGH };
            // } else {
            //     receiverConstraints.constraints[sourceName] = { maxHeight: maxFrameHeightForTileView };
            // }
            receiverConstraints.constraints[sourceName] = { maxHeight: maxFrameHeightForTileView };
        });

        const selectedSources: string[] = [];

        // Prioritize screenshare in tile view.
        if (remoteScreenShares?.length) {
            selectedSources.push(...remoteScreenShares);
        }

        // Prioritise sign language translators in tile view.
        if (signLanguageParticipantSources?.length) {
            selectedSources.push(...signLanguageParticipantSources);
        }

        // If selected sources are more than one, they need to be added to the 'selectedSources' so that the bridge can
        // allocate bandwidth for all the sources as opposed to doing greedy allocation for the sources (which happens
        // when they are added to 'onStageSources').
        if (selectedSources.length >= 1) {
            receiverConstraints.selectedSources = selectedSources;
        }

        // Stage view.
    } else {
        if (!visibleRemoteTrackSourceNames?.length && !largeVideoSourceName && !activeParticipantsSources?.length) {
            return;
        }

        if (visibleRemoteTrackSourceNames?.length) {
            visibleRemoteTrackSourceNames.forEach(sourceName => {
                // Sign language translators should always be displayed in high quality if they use the window
                // display mode.
                // if (signLanguageParticipantSources.includes(sourceName)) {
                //     receiverConstraints.constraints[sourceName] = { maxHeight: VIDEO_QUALITY_LEVELS.HIGH };
                // } else {
                //     receiverConstraints.constraints[sourceName] = { maxHeight: maxFrameHeightForVerticalFilmstrip };
                // }
                receiverConstraints.constraints[sourceName] = { maxHeight: maxFrameHeightForVerticalFilmstrip };
            });
        }

        const activeSources: string[] = [];

        activeSources.push(...activeParticipantsSources);
        activeSources.push(...signLanguageParticipantSources);

        if (getCurrentLayout(state) === LAYOUTS.STAGE_FILMSTRIP_VIEW && activeParticipantsSources.length > 0) {
            const selectedSources: string[] = [];
            const onStageSources: string[] = [];

            // If more than one video source is pinned to the stage filmstrip, they need to be added to the
            // 'selectedSources' so that the bridge can allocate bandwidth for all the sources as opposed to doing
            // greedy allocation for the sources (which happens when they are added to 'onStageSources').
            if (activeSources.length > 1) {
                selectedSources.push(...activeSources);
            } else {
                onStageSources.push(activeSources[0]);
            }

            activeSources.forEach(sourceName => {
                const isScreenSharing = remoteScreenShares.includes(sourceName);

                // const isSignLanguage = signLanguageParticipantSources.includes(sourceName);
                const quality
                    = isScreenSharing && preferredVideoQuality >= MAX_VIDEO_QUALITY
                        ? VIDEO_QUALITY_UNLIMITED

                        // : isSignLanguage
                        //   ? VIDEO_QUALITY_LEVELS.HIGH
                        : maxFrameHeightForStageFilmstrip;

                receiverConstraints.constraints[sourceName] = { maxHeight: quality };
            });

            if (screenshareFilmstripParticipantId) {
                onStageSources.push(screenshareFilmstripParticipantId);
                receiverConstraints.constraints[screenshareFilmstripParticipantId] = {
                    maxHeight:
                        preferredVideoQuality >= MAX_VIDEO_QUALITY
                            ? VIDEO_QUALITY_UNLIMITED
                            : maxFrameHeightForScreenSharingFilmstrip
                };
            }

            receiverConstraints.onStageSources = onStageSources;
            receiverConstraints.selectedSources = selectedSources;
        } else if (largeVideoSourceName) {
            let quality = VIDEO_QUALITY_UNLIMITED;

            if (
                preferredVideoQuality < MAX_VIDEO_QUALITY
                || !remoteScreenShares.find(id => id === largeVideoParticipantId)
            ) {
                quality = maxFrameHeightForLargeVideo;
            }
            receiverConstraints.constraints[largeVideoSourceName] = { maxHeight: quality };

            const selectedSources: string[] = [ largeVideoSourceName ];

            // If there is a sign language translator in the large video, it should be displayed in high quality.
            // signLanguageParticipantSources.forEach(sourceName => {
            //     // receiverConstraints.constraints[sourceName] = { maxHeight: VIDEO_QUALITY_LEVELS.HIGH };
            //     selectedSources.push(sourceName);
            // });

            if (selectedSources.length > 1) {
                receiverConstraints.selectedSources = selectedSources;
                receiverConstraints.onStageSources = [ largeVideoSourceName ];
            } else {
                receiverConstraints.onStageSources = [ largeVideoSourceName ];
            }
        }
    }

    // Make sure sign language translators are part of the selected sources.
    if (signLanguageParticipantSources.length > 0) {
        const selectedSources = receiverConstraints.selectedSources || [];

        signLanguageParticipantSources.forEach(sourceName => {
            if (!selectedSources.includes(sourceName)) {
                selectedSources.push(sourceName);
            }
        });

        receiverConstraints.selectedSources = selectedSources;
    }

    try {
        console.log('VQ', 'Receiver constraints', receiverConstraints);
        if (signLanguageParticipantSources.length > 0) {
            console.log('VQ', 'Sign language participants in overlay mode', signLanguageParticipantSources);
        } else {
            console.log('VQ', 'No sign language participants in overlay mode');
        }

        conference.setReceiverConstraints(receiverConstraints);
    } catch (error: any) {
        _handleParticipantError(error);
        reportError(error, `Failed to set receiver video constraints ${JSON.stringify(receiverConstraints)}`);
    }
}
