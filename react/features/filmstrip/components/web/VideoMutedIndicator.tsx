import React from 'react';

import { IconVideoOff } from '../../../base/icons/svg';
import BaseIndicator from '../../../base/react/components/web/BaseIndicator';
import { TOOLTIP_POSITION } from '../../../base/ui/constants.any';

/**
 * The type of the React {@code Component} props of {@link AudioMutedIndicator}.
 */
interface IProps {

    /**
     * From which side of the indicator the tooltip should appear from.
     */
    tooltipPosition: TOOLTIP_POSITION;
}

/**
 * React {@code Component} for showing an audio muted icon with a tooltip.
 *
 * @returns {Component}
 */
const VideoMutedIndicator = ({ tooltipPosition }: IProps) => (
    <BaseIndicator
        icon = { IconVideoOff }
        iconId = 'mic-disabled'
        iconSize = { 16 }
        id = 'audioMuted'
        tooltipKey = 'videothumbnail.mute'
        tooltipPosition = { tooltipPosition } />
);

export default VideoMutedIndicator;
