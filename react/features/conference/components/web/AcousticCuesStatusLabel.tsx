import React from 'react';
import { useSelector } from 'react-redux';

import { IconVolumeOff, IconVolumeUp } from '../../../base/icons/svg';
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
const AcousticCuesStatusLabel = () => {
    // const subject = useSelector(getConferenceName);
    // const { classes } = useStyles();

    const acousticCuesStatus = useSelector(isAcousticCuesEnabled);

    return (
        <Tooltip
            content = { acousticCuesStatus ? 'Hörbare Hinweise sind eingeschaltet'
                : 'Hörbare Hinweise sind nicht eingeschaltet' }
            position = 'bottom'>
            <Label
                accessibilityText = { acousticCuesStatus ? 'Hörbare Hinweise sind eingeschaltet'
                    : 'Hörbare Hinweise sind nicht eingeschaltet' }
                className = { 'test' }
                color = { COLORS.white }
                icon = { acousticCuesStatus ? IconVolumeUp : IconVolumeOff }
                iconColor = '#fff'
                id = 'acousticCuesStatusLabel' />
        </Tooltip>
    );
};

export default AcousticCuesStatusLabel;
