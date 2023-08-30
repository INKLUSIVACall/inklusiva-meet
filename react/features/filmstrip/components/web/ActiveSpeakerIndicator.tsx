import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import JitsiMeetJS from '../../../base/lib-jitsi-meet/_';
import { ITrack } from '../../../base/tracks/types';

const JitsiTrackEvents = JitsiMeetJS.events.track;

interface IProps {

    /**
     * The audio track related to the participant.
     */
    _audioTrack?: ITrack;

    _className: string;
}

const ActiveSpeakerIndicator = ({
    _audioTrack,
    _className
}: IProps) => {
    const [ audioLevel, setAudioLevel ] = useState(0);

    useEffect(() => {
        setAudioLevel(0);
        if (_audioTrack) {
            const { jitsiTrack } = _audioTrack;

            jitsiTrack?.on(JitsiTrackEvents.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel);
        }

        return () => {
            if (_audioTrack) {
                const { jitsiTrack } = _audioTrack;

                jitsiTrack?.off(JitsiTrackEvents.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel);
            }
        };
    }, [ _audioTrack ]);

    const opacityLevel = typeof audioLevel === 'number' && !isNaN(audioLevel)
        ? Math.min(audioLevel * 1.2, 1) : 0;


    return (
        <div className={ clsx(_className, 'active-speaker-indicator') } style = {{  opacity: opacityLevel }}>
        </div>
    );
};

export default ActiveSpeakerIndicator;
