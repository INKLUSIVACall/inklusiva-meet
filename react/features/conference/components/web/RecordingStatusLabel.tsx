import { withStyles } from '@mui/styles';
import React from 'react';
import { connect } from 'react-redux';

import { translate } from '../../../base/i18n/functions';
import { IconRecord, IconVideoOff } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { JitsiRecordingConstants } from '../../../base/lib-jitsi-meet';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import AbstractRecordingLabel, { _mapStateToProps } from '../../../recording/components/AbstractRecordingLabel';

const styles = () => {
    return {
        recordingStatusLabel: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            pointerEvents: 'auto' as const
        },
        objectRecordingLabel: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            pointerEvents: 'auto' as const
        }
    };
};

class RecordingStatusLabel extends AbstractRecordingLabel {
    _onObjectRecording = () => {
        console.log('123456', 'Ich widerspreche der Aufnahme dieses Meetings.');
    };

    _renderLabel(): React.ReactNode {
        if (this.props._status !== JitsiRecordingConstants.status.ON) {
            // Since there are no expanded labels on web, we only render this
            // label when the recording status is ON.
            return null;
        }

        const { classes } = this.props;

        return (
            <>
                <Tooltip
                    content = { 'Dieses Meeting wird gerade aufgezeichnet' }
                    position = 'bottom'>
                    <Label
                        accessibilityText = { 'Dieses Meeting wird gerade aufgezeichnet' }
                        className = { classes?.recordingStatusLabel }
                        icon = { IconRecord }
                        iconColor = '#fff'
                        iconSize = { '24' }
                        id = 'recordingStatusLabel' />
                </Tooltip>
                <Tooltip
                    content = { 'Der Aufzeichnung des Meetings widersprechen' }
                    position = 'bottom'>
                    <Label
                        accessibilityText = { 'Der Aufzeichnung des Meetings widersprechen' }
                        className = { classes?.objectRecordingLabel }
                        icon = { IconVideoOff }
                        iconColor = '#fff'
                        iconSize = { '24' }
                        id = 'objectRecordingLabel'
                        onClick = { this._onObjectRecording } />
                </Tooltip>
            </>
        );
    }
}

export default withStyles(styles)(translate(connect(_mapStateToProps)(RecordingStatusLabel)));
