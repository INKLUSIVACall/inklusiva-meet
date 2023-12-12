import React from 'react';
import { useSelector } from 'react-redux';

import { IconAudioOnly, IconAudioOnlyOff } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { isVisualCuesEnabled } from '../../../inklusiva/uisettings/functions';

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
const VisualCuesStatusLabel = () => {
    // const subject = useSelector(getConferenceName);
    // const { classes } = useStyles();

    const visualCuesStatus = useSelector(isVisualCuesEnabled);

    return (
        <Tooltip
            content = { visualCuesStatus ? 'Visuelle Hinweise sind eingeschaltet'
                : 'Visuelle Hinweise sind nicht eingeschaltet' }
            position = 'bottom'>
            <Label
                accessibilityText = { visualCuesStatus ? 'Visuelle Hinweise sind eingeschaltet'
                    : 'Visuelle Hinweise sind nicht eingeschaltet' }
                className = { 'test' }
                color = { COLORS.white }
                icon = { visualCuesStatus ? IconAudioOnly : IconAudioOnlyOff }
                iconColor = '#fff'
                id = 'visualCuesStatusLabel' />
        </Tooltip>
    );
};

export default VisualCuesStatusLabel;
