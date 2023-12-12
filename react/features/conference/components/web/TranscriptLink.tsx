import React from 'react';
import { useSelector } from 'react-redux';

import { IconChatUnread } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { getTranscriptionLink } from '../../../inklusiva/transcription/functions.web';

/*
const useStyles = makeStyles()(theme => {
    return {

    };
});
*/

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const TranscriptLink = () => {
    // const subject = useSelector(getConferenceName);
    // const { classes } = useStyles();

    const transcriptionLink = useSelector(getTranscriptionLink);

    const onClick = () => {
        window.open(transcriptionLink, '_blank');
    };

    return (
        <Tooltip
            content = { 'Zum Transcript' }
            position = 'bottom'>
            <Label
                accessibilityText = { 'Link zum Transcript' }
                className = { 'test' }
                color = { COLORS.white }
                icon = { IconChatUnread }
                iconColor = '#fff'
                id = 'transcriptLinkLabel'
                // eslint-disable-next-line react/jsx-no-bind
                onClick = { onClick } />
        </Tooltip>
    );
};

export default TranscriptLink;
