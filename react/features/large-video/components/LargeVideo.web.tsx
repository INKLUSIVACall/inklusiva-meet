import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';

// @ts-expect-error
import VideoLayout from '../../../../modules/UI/videolayout/VideoLayout';
import { IReduxState, IStore } from '../../app/types';
import { VIDEO_TYPE } from '../../base/media/constants';
import { pinParticipant } from '../../base/participants/actions';
import { getLocalParticipant } from '../../base/participants/functions';
import Watermarks from '../../base/react/components/web/Watermarks';
import { getHideSelfView } from '../../base/settings/functions.any';
import { getVideoTrackByParticipant } from '../../base/tracks/functions.web';
import { setColorAlpha } from '../../base/util/helpers';
import StageParticipantNameLabel from '../../display-name/components/web/StageParticipantNameLabel';
import FadeOutOverlay from '../../filmstrip/components/web/FadeOutOverlay';
import { FILMSTRIP_BREAKPOINT } from '../../filmstrip/constants';
import {
    getParticipantsBrightnessByParticipantId,
    getParticipantsContrastByParticipantId,
    getParticipantsOpacityByParticipantId,
    getParticipantsSaturationByParticipantId,
    getParticipantsZoomByParticipantId,
    getVerticalViewMaxWidth,
    isFilmstripResizable
} from '../../filmstrip/functions.web';
import SharedVideo from '../../shared-video/components/web/SharedVideo';
import { setTileView } from '../../video-layout/actions.web';
import Whiteboard from '../../whiteboard/components/web/Whiteboard';
import { isWhiteboardEnabled } from '../../whiteboard/functions';
import { setSeeWhatIsBeingShared } from '../actions.web';
import { getLargeVideoParticipant } from '../functions';

import ScreenSharePlaceholder from './ScreenSharePlaceholder.web';

// Hack to detect Spot.
const SPOT_DISPLAY_NAME = 'Meeting Room';

interface IProps {

    /**
     * The alpha(opacity) of the background.
     */
    _backgroundAlpha?: number;

    /**
     * The brightness value from the UserVideoTab.
     */
    _brightness?: number;

    /**
     * The contrast value from the UserVideoTab.
     */
    _contrast?: number;

    /**
     * The user selected background color.
     */
    _customBackgroundColor: string;

    /**
     * The user selected background image url.
     */
    _customBackgroundImageUrl: string;

    /**
     * The dimming value from the UserVideoTab.
     */
    _dimming?: number;

    _disableLocalVideoFlip: boolean;

    /**
     * Whether the screen-sharing placeholder should be displayed or not.
     */
    _displayScreenSharingPlaceholder: boolean;

    /**
     * Whether or not the hideSelfView is enabled.
     */
    _hideSelfView: boolean;

    /**
     * Prop that indicates whether the chat is open.
     */
    _isChatOpen: boolean;

    /**
     * Whether or not the local screen share is on large-video.
     */
    _isScreenSharing: boolean;

    /**
     * The large video participant id.
     */
    _largeVideoParticipantId: string;

    /**
     * The current local video flip setting.
     */
    _localFlipX: boolean;

    /**
     * Local Participant id.
     */
    _localParticipantId: string;

    /**
     * Used to determine the value of the autoplay attribute of the underlying
     * video element.
     */
    _noAutoPlayVideo: boolean;

    /**
     * Whether or not the filmstrip is resizable.
     */
    _resizableFilmstrip: boolean;

    /**
     * The saturation value from the UserVideoTab.
     */
    _saturation?: number;

    /**
     * Whether or not the screen sharing is visible.
     */
    _seeWhatIsBeingShared: boolean;

    /**
     * Whether or not to show dominant speaker badge.
     */
    _showDominantSpeakerBadge: boolean;

    /**
     * The width of the vertical filmstrip (user resized).
     */
    _verticalFilmstripWidth?: number | null;

    /**
     * The max width of the vertical filmstrip.
     */
    _verticalViewMaxWidth: number;

    /**
     * Whether or not the filmstrip is visible.
     */
    _visibleFilmstrip: boolean;

    /**
     * Whether or not the whiteboard is enabled.
     */
    _whiteboardEnabled: boolean;

    /**
     * The zoom value from the UserVideoTab.
     */
    _zoom?: number;

    /**
     * The Redux dispatch function.
     */
    dispatch: IStore['dispatch'];
}

/** .
 * Implements a React {@link Component} which represents the large video (a.k.a.
 * The conference participant who is on the local stage) on Web/React.
 *
 * @augments Component
 */
class LargeVideo extends Component<IProps> {
    _tappedTimeout: number | undefined;

    _containerRef: React.RefObject<HTMLDivElement>;

    _wrapperRef: React.RefObject<HTMLDivElement>;

    /**
     * Constructor of the component.
     *
     * @inheritdoc
     */
    constructor(props: IProps) {
        super(props);

        this._containerRef = React.createRef<HTMLDivElement>();
        this._wrapperRef = React.createRef<HTMLDivElement>();

        this._clearTapTimeout = this._clearTapTimeout.bind(this);
        this._onDoubleTap = this._onDoubleTap.bind(this);
        this._updateLayout = this._updateLayout.bind(this);
    }

    /**
     * Implements {@code Component#componentDidUpdate}.
     *
     * @inheritdoc
     */
    componentDidUpdate(prevProps: IProps) {
        const {
            _visibleFilmstrip,
            _isScreenSharing,
            _seeWhatIsBeingShared,
            _largeVideoParticipantId,
            _hideSelfView,
            _localParticipantId
        } = this.props;

        if (prevProps._visibleFilmstrip !== _visibleFilmstrip) {
            this._updateLayout();
        }

        if (prevProps._isScreenSharing !== _isScreenSharing && !_isScreenSharing) {
            this.props.dispatch(setSeeWhatIsBeingShared(false));
        }

        if (_isScreenSharing && _seeWhatIsBeingShared) {
            VideoLayout.updateLargeVideo(_largeVideoParticipantId, true, true);
        }

        if (_largeVideoParticipantId === _localParticipantId && prevProps._hideSelfView !== _hideSelfView) {
            VideoLayout.updateLargeVideo(_largeVideoParticipantId, true, false);
        }
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {React$Element}
     */
    render() {
        const {
            _displayScreenSharingPlaceholder,
            _isChatOpen,
            _noAutoPlayVideo,
            _showDominantSpeakerBadge,
            _whiteboardEnabled,
            _isScreenSharing,
            _disableLocalVideoFlip,
            _localFlipX,
            dispatch
        } = this.props;
        const style = this._getCustomStyles();
        const className = `videocontainer${_isChatOpen ? ' shift-right' : ''}`;

        const videoTrackClassName = !_disableLocalVideoFlip && !_isScreenSharing && _localFlipX ? 'flipVideoX' : '';

        const unPin = () => {
            dispatch(pinParticipant(null));
        };

        return (
            <div
                className = { className }
                id = 'largeVideoContainer'
                onClick = { unPin }
                ref = { this._containerRef }
                style = { style }>
                <SharedVideo />
                {_whiteboardEnabled && <Whiteboard />}
                <div id = 'etherpad' />

                <FadeOutOverlay opacity = { this.props._dimming } />
                <Watermarks />

                <div
                    id = 'dominantSpeaker'
                    onTouchEnd = { this._onDoubleTap }>
                    <div className = 'dynamic-shadow' />
                    <div id = 'dominantSpeakerAvatarContainer' />
                </div>
                <div id = 'remotePresenceMessage' />
                <span id = 'remoteConnectionMessage' />
                <div id = 'largeVideoElementsContainer'>
                    <div id = 'largeVideoBackgroundContainer' />
                    {/*
                     * FIXME: the architecture of elements related to the large
                     * video and the naming. The background is not part of
                     * largeVideoWrapper because we are controlling the size of
                     * the video through largeVideoWrapper. That's why we need
                     * another container for the background and the
                     * largeVideoWrapper in order to hide/show them.
                     */}
                    <div
                        id = 'largeVideoWrapper'
                        onTouchEnd = { this._onDoubleTap }
                        ref = { this._wrapperRef }
                        role = 'figure'>
                        {_displayScreenSharingPlaceholder
                            ? <ScreenSharePlaceholder />
                            : (
                                <video
                                    autoPlay = { !_noAutoPlayVideo }
                                    className = { videoTrackClassName }
                                    data-test = 'test'
                                    id = 'largeVideo'
                                    muted = { true }
                                    playsInline = { true } />
                            )}
                    </div>
                </div>
                {_showDominantSpeakerBadge && <StageParticipantNameLabel />}
            </div>
        );
    }

    /**
     * Refreshes the video layout to determine the dimensions of the stage view.
     * If the filmstrip is toggled it adds CSS transition classes and removes them
     * when the transition is done.
     *
     * @returns {void}
     */
    _updateLayout() {
        const { _verticalFilmstripWidth, _resizableFilmstrip } = this.props;

        if (_resizableFilmstrip && Number(_verticalFilmstripWidth) >= FILMSTRIP_BREAKPOINT) {
            this._containerRef.current?.classList.add('transition');
            this._wrapperRef.current?.classList.add('transition');
            VideoLayout.refreshLayout();

            setTimeout(() => {
                this._containerRef?.current && this._containerRef.current.classList.remove('transition');
                this._wrapperRef?.current && this._wrapperRef.current.classList.remove('transition');
            }, 1000);
        } else {
            VideoLayout.refreshLayout();
        }
    }

    /**
     * Clears the '_tappedTimout'.
     *
     * @private
     * @returns {void}
     */
    _clearTapTimeout() {
        clearTimeout(this._tappedTimeout);
        this._tappedTimeout = undefined;
    }

    /**
     * Creates the custom styles object.
     *
     * @private
     * @returns {Object}
     */
    _getCustomStyles() {
        const styles: any = {};
        const {
            _brightness,
            _contrast,
            _customBackgroundColor,
            _customBackgroundImageUrl,
            _saturation,
            _verticalFilmstripWidth,
            _verticalViewMaxWidth,
            _visibleFilmstrip

            // _zoom
        } = this.props;

        styles.filter = `brightness(${_brightness}%) contrast(${_contrast}%) saturate(${_saturation}%)`;

        styles.backgroundColor = _customBackgroundColor || interfaceConfig.DEFAULT_BACKGROUND;

        if (this.props._backgroundAlpha !== undefined) {
            const alphaColor = setColorAlpha(styles.backgroundColor, this.props._backgroundAlpha);

            styles.backgroundColor = alphaColor;
        }

        if (_customBackgroundImageUrl) {
            styles.backgroundImage = `url(${_customBackgroundImageUrl})`;
            styles.backgroundSize = 'cover';
        }

        if (_visibleFilmstrip && Number(_verticalFilmstripWidth) >= FILMSTRIP_BREAKPOINT) {
            styles.width = `calc(100% - ${_verticalViewMaxWidth || 0}px)`;
        }

        return styles;
    }

    /**
     * Sets view to tile view on double tap.
     *
     * @param {Object} e - The event.
     * @private
     * @returns {void}
     */
    _onDoubleTap(e: React.TouchEvent) {
        e.stopPropagation();
        e.preventDefault();

        if (this._tappedTimeout) {
            this._clearTapTimeout();
            this.props.dispatch(setTileView(true));
        } else {
            this._tappedTimeout = window.setTimeout(this._clearTapTimeout, 300);
        }
    }
}

/**
 * Maps (parts of) the Redux state to the associated LargeVideo props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {IProps}
 */
function _mapStateToProps(state: IReduxState) {
    const testingConfig = state['features/base/config'].testing;
    const { backgroundColor, backgroundImageUrl } = state['features/dynamic-branding'];
    const { isOpen: isChatOpen } = state['features/chat'];
    const { width: verticalFilmstripWidth, visible } = state['features/filmstrip'];
    const { defaultLocalDisplayName, hideDominantSpeakerBadge } = state['features/base/config'];
    const { seeWhatIsBeingShared } = state['features/large-video'];
    const localParticipantId = getLocalParticipant(state)?.id;
    const largeVideoParticipant = getLargeVideoParticipant(state);
    const videoTrack = getVideoTrackByParticipant(state, largeVideoParticipant);
    const isLocalScreenshareOnLargeVideo
        = largeVideoParticipant?.id?.includes(localParticipantId ?? '') && videoTrack?.videoType === VIDEO_TYPE.DESKTOP;
    const isOnSpot = defaultLocalDisplayName === SPOT_DISPLAY_NAME;

    // setting the defaults
    let brightness = state['features/inklusiva/userdata'].video.brightness;
    let contrast = state['features/inklusiva/userdata'].video.contrast;
    let saturation = state['features/inklusiva/userdata'].video.saturation;
    let opacity = state['features/inklusiva/userdata'].video.dimming ?? 100 / 100;
    let zoomLevel = state['features/inklusiva/userdata'].video.zoom;

    if (largeVideoParticipant) {
        brightness = getParticipantsBrightnessByParticipantId(state, largeVideoParticipant.id);
        contrast = getParticipantsContrastByParticipantId(state, largeVideoParticipant.id);
        saturation = getParticipantsSaturationByParticipantId(state, largeVideoParticipant.id);
        opacity = getParticipantsOpacityByParticipantId(state, largeVideoParticipant.id) / 100;
        zoomLevel = getParticipantsZoomByParticipantId(state, largeVideoParticipant.id) / 100;
    }
    const { localFlipX } = state['features/base/settings'];
    const { disableLocalVideoFlip } = state['features/base/config'];

    return {
        _backgroundAlpha: state['features/base/config'].backgroundAlpha,
        _brightness: brightness,
        _contrast: contrast,
        _customBackgroundColor: backgroundColor,
        _customBackgroundImageUrl: backgroundImageUrl,
        _dimming: opacity,
        _disableLocalVideoFlip: Boolean(disableLocalVideoFlip),
        _localFlipX: Boolean(localFlipX),
        _displayScreenSharingPlaceholder: Boolean(isLocalScreenshareOnLargeVideo && !seeWhatIsBeingShared && !isOnSpot),
        _hideSelfView: getHideSelfView(state),
        _isChatOpen: isChatOpen,
        _isScreenSharing: Boolean(isLocalScreenshareOnLargeVideo),
        _largeVideoParticipantId: largeVideoParticipant?.id ?? '',
        _localParticipantId: localParticipantId ?? '',
        _noAutoPlayVideo: Boolean(testingConfig?.noAutoPlayVideo),
        _resizableFilmstrip: isFilmstripResizable(state),
        _saturation: saturation,
        _seeWhatIsBeingShared: Boolean(seeWhatIsBeingShared),
        _showDominantSpeakerBadge: !hideDominantSpeakerBadge,
        _verticalFilmstripWidth: verticalFilmstripWidth.current,
        _verticalViewMaxWidth: getVerticalViewMaxWidth(state),
        _visibleFilmstrip: visible,
        _whiteboardEnabled: isWhiteboardEnabled(state),
        _zoom: zoomLevel
    };
}

export default connect(_mapStateToProps)(LargeVideo);
