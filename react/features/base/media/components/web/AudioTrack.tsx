import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createAudioPlayErrorEvent, createAudioPlaySuccessEvent } from '../../../../analytics/AnalyticsEvents';
import { sendAnalytics } from '../../../../analytics/functions';
import { IReduxState } from '../../../../app/types';
import { ITrack } from '../../../tracks/types';
import logger from '../../logger';

/**
 * The type of the React {@code Component} props of {@link AudioTrack}.
 */
interface IProps {

    /**
     * Represents the frequency filter setting of the underlying JitsiTrack.
     */
    _frequencySetting?: number;

    /**
     * Represents muted property of the underlying audio element.
     */
    _muted?: boolean;

    /**
     * Represents volume property of the underlying audio element.
     */
    _volume?: number | boolean;

    /**
     * The audio track.
     */
    audioTrack?: ITrack;

    /**
     * Used to determine the value of the autoplay attribute of the underlying
     * audio element.
     */
    autoPlay: boolean;

    /**
     * The value of the id attribute of the audio element.
     */
    id: string;

    /**
     * The ID of the participant associated with the audio element.
     */
    participantId: string;
}

/**
 * The React/Web {@link Component} which is similar to and wraps around {@code HTMLAudioElement}.
 */
class AudioTrack extends Component<IProps> {
    /**
     * Frequency cut off configuration.
     */
    private FREQUENCY_CUT_OFFS: number[] = [ 22050, 4000, 2000, 1000, 700, 400 ];

    /**
     * Reference to the HTML audio element, stored until the file is ready.
     */
    _ref: HTMLAudioElement | null;

    /**
     * The current timeout ID for play() retries.
     */
    _playTimeout: number | undefined;

    /**
     * Default values for {@code AudioTrack} component's properties.
     *
     * @static
     */
    static defaultProps = {
        autoPlay: true,
        id: ''
    };

    /**
     * Creates new <code>Audio</code> element instance with given props.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: IProps) {
        super(props);

        // Bind event handlers so they are only bound once for every instance.
        this._errorHandler = this._errorHandler.bind(this);
        this._setRef = this._setRef.bind(this);
        this._play = this._play.bind(this);
    }

    /**
     * Attaches the audio track to the audio element and plays it.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        this._attachTrack(this.props.audioTrack);

        if (this._ref) {
            const { _muted, _volume } = this.props;

            if (typeof _volume === 'number') {
                this._ref.volume = _volume;
            }

            if (typeof _muted === 'boolean') {
                this._ref.muted = _muted;
            }

            // @ts-ignore
            this._ref.addEventListener('error', this._errorHandler);
        }

        if (this.props.audioTrack) {
            const { _frequencySetting } = this.props;

            if (typeof _frequencySetting === 'number') {
                this._setFrequencyCutOff(_frequencySetting);
            }
        }
    }

    /**
     * Applies the frequency setting to the underlaying Jitsi Track.
     *
     * @param frequencySetting
     */
    _setFrequencyCutOff(frequencySetting: number) {
        if (this.props.audioTrack) {
            let setting = Math.floor(frequencySetting);

            if (setting < 0 || setting >= this.FREQUENCY_CUT_OFFS.length) {
                setting = 0;
            }

            const cutOffFrequency = this.FREQUENCY_CUT_OFFS[setting];

            const oldSetting = this.props.audioTrack.jitsiTrack.audioFilter.frequency.value;

            if (oldSetting !== cutOffFrequency) {
                this.props.audioTrack.jitsiTrack.audioFilter.frequency.value = cutOffFrequency;
            }
        }
    }

    /**
     * Remove any existing associations between the current audio track and the
     * component's audio element.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {
        this._detachTrack(this.props.audioTrack);

        // @ts-ignore
        this._ref?.removeEventListener('error', this._errorHandler);
    }

    /**
     * This component's updating is blackboxed from React to prevent re-rendering of the audio
     * element, as we set all the properties manually.
     *
     * @inheritdoc
     * @returns {boolean} - False is always returned to blackbox this component
     * from React.
     */
    shouldComponentUpdate(nextProps: IProps) {
        const currentJitsiTrack = this.props.audioTrack?.jitsiTrack;
        const nextJitsiTrack = nextProps.audioTrack?.jitsiTrack;

        if (currentJitsiTrack !== nextJitsiTrack) {
            this._detachTrack(this.props.audioTrack);
            this._attachTrack(nextProps.audioTrack);
        }

        if (this._ref) {
            const currentVolume = this._ref.volume;
            const nextVolume = nextProps._volume;

            if (typeof nextVolume === 'number' && !isNaN(nextVolume) && currentVolume !== nextVolume) {
                this._ref.volume = nextVolume;
            }

            const currentMuted = this._ref.muted;
            const nextMuted = nextProps._muted;

            if (typeof nextMuted === 'boolean' && currentMuted !== nextMuted) {
                this._ref.muted = nextMuted;
            }
        }

        const nextFilterSetting = nextProps._frequencySetting;

        if (typeof nextFilterSetting === 'number' && !isNaN(nextFilterSetting)) {
            this._setFrequencyCutOff(nextFilterSetting);
        }

        return false;
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { autoPlay, id } = this.props;

        return (<audio
            autoPlay = { autoPlay }
            id = { id }
        ref = { this._setRef } />);
    }

    /**
     * Calls into the passed in track to associate the track with the component's audio element.
     *
     * @param {Object} track - The redux representation of the {@code JitsiLocalTrack}.
     * @private
     * @returns {void}
     */
    _attachTrack(track?: ITrack) {
        if (!track?.jitsiTrack) {
            return;
        }

        track.jitsiTrack.attach(this._ref);

        this._play();
    }

    /**
     * Removes the association to the component's audio element from the passed
     * in redux representation of jitsi audio track.
     *
     * @param {Object} track -  The redux representation of the {@code JitsiLocalTrack}.
     * @private
     * @returns {void}
     */
    _detachTrack(track?: ITrack) {
        if (this._ref && track && track.jitsiTrack) {
            clearTimeout(this._playTimeout);
            this._playTimeout = undefined;
            track.jitsiTrack.detach(this._ref);
        }
    }

    /**
     * Reattaches the audio track to the underlying HTMLAudioElement when an 'error' event is fired.
     *
     * @param {Error} error - The error event fired on the HTMLAudioElement.
     * @returns {void}
     */
    _errorHandler(error: Error) {
        logger.error(
            `Error ${error?.message} called on audio track ${this.props.audioTrack?.jitsiTrack}. `
                + 'Attempting to reattach the audio track to the element and execute play on it'
        );
        this._detachTrack(this.props.audioTrack);
        this._attachTrack(this.props.audioTrack);
    }

    /**
     * Plays the underlying HTMLAudioElement.
     *
     * @param {number} retries - The number of previously failed retries.
     * @returns {void}
     */
    _play(retries = 0) {
        if (!this._ref) {
            // nothing to play.

            return;
        }
        const { autoPlay, id } = this.props;

        if (autoPlay) {
            // Ensure the audio gets play() called on it. This may be necessary in the
            // case where the local video container was moved and re-attached, in which
            // case the audio may not autoplay.
            this._ref.play().then(
                () => {
                    if (retries !== 0) {
                        // success after some failures
                        this._playTimeout = undefined;
                        sendAnalytics(createAudioPlaySuccessEvent(id));
                        logger.info(`Successfully played audio track! retries: ${retries}`);
                    }
                },
                e => {
                    logger.error(`Failed to play audio track! retry: ${retries} ; Error: ${e}`);

                    if (retries < 3) {
                        this._playTimeout = window.setTimeout(() => this._play(retries + 1), 1000);

                        if (retries === 0) {
                            // send only 1 error event.
                            sendAnalytics(createAudioPlayErrorEvent(id));
                        }
                    } else {
                        this._playTimeout = undefined;
                    }
                }
            );
        }
    }

    /**
     * Sets the reference to the HTML audio element.
     *
     * @param {HTMLAudioElement} audioElement - The HTML audio element instance.
     * @private
     * @returns {void}
     */
    _setRef(audioElement: HTMLAudioElement | null) {
        this._ref = audioElement;
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code AudioTrack}'s props.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The props passed to the component.
 * @private
 * @returns {IProps}
 */
function _mapStateToProps(state: IReduxState, ownProps: any) {
    const { participantsVolume, participantsFrequencySetting } = state['features/filmstrip'];
    const muted = state['features/base/config'].startSilent
                || !state['features/inklusiva/userdata'].audio.otherParticipants;

    return {
        _muted: muted,
        _volume: participantsVolume[ownProps.participantId],
        _frequencySetting: participantsFrequencySetting[ownProps.participantId]
    };
}

export default connect(_mapStateToProps)(AudioTrack);
