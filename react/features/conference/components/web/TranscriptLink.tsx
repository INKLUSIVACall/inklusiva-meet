import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { openDialog } from '../../../base/dialog/actions';
import { IconChatUnread } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import TranscriptLinkDialog from '../../../inklusiva/transcription/components/TranscriptLinkDialog';
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
    const conference = useSelector((state: IReduxState) => state['features/base/conference'].conference);
    const dispatch = useDispatch();

    // const transcriptionLink = useSelector(getTranscriptionLink);

    const onClick = () => {
        dispatch(openDialog(TranscriptLinkDialog, { conference }));

        // window.open(transcriptionLink, '_blank');
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
