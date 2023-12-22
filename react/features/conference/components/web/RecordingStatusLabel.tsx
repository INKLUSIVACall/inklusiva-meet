import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { IconRecord } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import Tooltip from '../../../base/tooltip/components/Tooltip';

const useStyles = makeStyles()(theme => {
    return {
        recordingStatusLabel: {
            backgroundColor: 'transparent',
            borderColor: 'transparent'
        }
    };
});

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const RecordingStatusLabel = () => {
    // const subject = useSelector(getConferenceName);
    const { classes } = useStyles();
    const isRecordingInProgress = true;

    if (isRecordingInProgress) {
        return (
            <Tooltip
                content = { 'Dieses Meeting wird gerade aufgezeichnet' }
                position = 'bottom'>
                <Label
                    accessibilityText = { 'Dieses Meeting wird gerade aufgezeichnet' }
                    className = { classes.recordingStatusLabel }
                    icon = { IconRecord }
                    iconColor = '#fff'
                    iconSize = { '24' }
                    id = 'acousticCuesStatusLabel' />
            </Tooltip>
        );
    }

    return null;
};

export default RecordingStatusLabel;
