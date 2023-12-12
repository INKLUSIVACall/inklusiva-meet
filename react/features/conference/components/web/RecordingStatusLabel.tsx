import React from 'react';
import { useSelector } from 'react-redux';

import { IconRecord, IconVolumeOff, IconVolumeUp } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { isAcousticCuesEnabled } from '../../../inklusiva/uisettings/functions';

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
const RecordingStatusLabel = () => {
    // const subject = useSelector(getConferenceName);
    // const { classes } = useStyles();

    const isRecordingInProgress = true;

    if (isRecordingInProgress) {
        return (
            <Tooltip
                content = { 'Dieses Meeting wird gerade aufgezeichnet' }
                position = 'bottom'>
                <Label
                    accessibilityText = { 'Dieses Meeting wird gerade aufgezeichnet' }
                    className = { 'test' }
                    color = { COLORS.white }
                    icon = { IconRecord }
                    iconColor = '#fff'
                    id = 'acousticCuesStatusLabel' />
            </Tooltip>
        );
    }

    return null;
};

export default RecordingStatusLabel;
