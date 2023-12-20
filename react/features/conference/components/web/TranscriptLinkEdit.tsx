import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { openDialog } from '../../../base/dialog/actions';
import { IconGear } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import TranscriptLinkDialog from '../../../inklusiva/transcription/components/TranscriptLinkDialog';
import { getTranscriptionLink } from '../../../inklusiva/transcription/functions.web';

const useStyles = makeStyles()(theme => {
    return {
        transcriptionLinkLabelForCaptioner: {
        }
    };
});

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const TranscriptLinkEdit = () => {
    const { classes } = useStyles();

    const conference = useSelector((state: IReduxState) => state['features/base/conference'].conference);
    const dispatch = useDispatch();

    const isCaptioner = conference?.checkLocalHasRole(IC_ROLES.CAPTIONER);

    const onClick = () => {
        dispatch(openDialog(TranscriptLinkDialog, { conference }));
    };


    if (isCaptioner) {
        return (
            <Tooltip
                content = { 'Transcript-Link bearbeiten' }
                position = 'bottom'>
                <Label
                    accessibilityText = { 'Transcript-Link bearbeiten' }
                    className = { classes.transcriptionLinkLabelForCaptioner }
                    color = { COLORS.white }
                    icon = { IconGear }
                    iconColor = '#fff'
                    iconSize = { '24' }
                    id = 'transcriptLinkEditLabel'
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick = { onClick } />
            </Tooltip>
        );
    }
};

export default TranscriptLinkEdit;
