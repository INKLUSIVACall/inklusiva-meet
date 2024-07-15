import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { openDialog } from '../../../base/dialog/actions';
import { IconVolumeOff } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import ReenableAudioCuesDialog from '../../../inklusiva/audiosettings/components/ReenableAudioCuesDialog';
import { isAcousticCuesEnabled } from '../../../inklusiva/uisettings/functions';


const useStyles = makeStyles()(() => {
    return {
        acousticCuesStatusLabel: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            pointerEvents: 'auto'
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
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(openDialog(ReenableAudioCuesDialog, { }));
    };


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
                    id = 'acousticCuesStatusLabel'
                    onClick = { onClick } />
            </Tooltip>
        );
    }

    return null;
};

export default AcousticCuesStatusLabel;
