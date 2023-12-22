import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IconAudioOnlyOff } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { isVisualCuesEnabled } from '../../../inklusiva/uisettings/functions';


const useStyles = makeStyles()(theme => {
    return {
        visualCuesStatusLabel: {
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
const VisualCuesStatusLabel = () => {
    const visualCuesStatus = useSelector(isVisualCuesEnabled);
    const { classes } = useStyles();

    if (!visualCuesStatus) {
        return (
            <Tooltip
                content = { 'Visuelle Hinweise sind ausgeschaltet' }
                position = 'bottom'>
                <Label
                    accessibilityText = { 'Visuelle Hinweise sind ausgeschaltet' }
                    className = { classes.visualCuesStatusLabel }
                    icon = { IconAudioOnlyOff }
                    iconColor = '#fff'
                    iconSize = { '24' }
                    id = 'visualCuesStatusLabel' />
            </Tooltip>
        );
    }

    return null;
};

export default VisualCuesStatusLabel;
