import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IconLink } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { getTranscriptionLink } from '../../../inklusiva/transcription/functions.web';

const useStyles = makeStyles()(() => {
    return {
        transcriptionLinkLabelForUser: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: '#fff'
        }
    };
});

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const TranscriptLink = () => {
    const { classes } = useStyles();

    const transcriptionLink = useSelector(getTranscriptionLink);

    const onClick = () => {
        window.open(transcriptionLink, '_blank');
    };

    if (transcriptionLink !== '') {
        return (
            <Tooltip
                content = { 'Zum Transcript' }
                position = 'bottom'>
                <Label
                    accessibilityText = { 'Link zum Transcript' }
                    className = { classes.transcriptionLinkLabelForUser }
                    color = { COLORS.white }
                    icon = { IconLink }
                    iconColor = '#fff'
                    iconSize = { '24' }
                    onClick = { onClick }
                    id = 'transcriptLinkLabel'
                    // eslint-disable-next-line react/jsx-no-bind
                    text = { transcriptionLink } />
            </Tooltip>
        );
    }

    return null;

};

export default TranscriptLink;
