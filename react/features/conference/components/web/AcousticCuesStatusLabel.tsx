import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IconVolumeOff } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { isAcousticCuesEnabled } from '../../../inklusiva/uisettings/functions';


const useStyles = makeStyles()(theme => {
    return {
        acousticCuesStatusLabel: {
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
const AcousticCuesStatusLabel = () => {
    const acousticCuesStatus = useSelector(isAcousticCuesEnabled);
    const { classes } = useStyles();

    if (!acousticCuesStatus) {
        return (
            <Tooltip
                content = { 'Hörbare Hinweise sind ausgeschaltet' }
                position = 'bottom'>
                <Label
                    accessibilityText = { 'Hörbare Hinweise sind ausgeschaltet' }
                    className = { classes.acousticCuesStatusLabel }
                    icon = { IconVolumeOff }
                    iconColor = '#fff'
                    iconSize = { '24' }
                    id = 'acousticCuesStatusLabel' />
            </Tooltip>
        );
    }

    return null;
};

export default AcousticCuesStatusLabel;
