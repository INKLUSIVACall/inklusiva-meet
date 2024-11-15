import React from 'react';
import { connect } from 'react-redux';

import { IReduxState } from '../../../../app/types';
import { translate } from '../../../../base/i18n/functions';
import Dialog from '../../../../base/ui/components/web/Dialog';
import { toggleScreenshotCaptureSummary } from '../../../../screenshot-capture/actions';
import { isScreenshotCaptureEnabled } from '../../../../screenshot-capture/functions';
import { RECORDING_TYPES } from '../../../constants';
import AbstractStartRecordingDialog, {
    mapStateToProps as abstractMapStateToProps
} from '../AbstractStartRecordingDialog';

import StartRecordingDialogContent from './StartRecordingDialogContent';

/**
 * React Component for getting confirmation to start a file recording session in
 * progress.
 *
 * @augments Component
 */
class StartRecordingDialog extends AbstractStartRecordingDialog {
    /**
     * Disables start recording button.
     *
     * @returns {boolean}
     */
    isStartRecordingDisabled() {
        const { isTokenValid, selectedRecordingService } = this.state;

        // Start button is disabled if recording service is only shown;
        // When validating dropbox token, if that is not enabled, we either always
        // show the start button or, if just dropbox is enabled, start button
        // is available when there is token.
        if (selectedRecordingService === RECORDING_TYPES.JITSI_REC_SERVICE) {
            return false;
        } else if (selectedRecordingService === RECORDING_TYPES.DROPBOX) {
            return !isTokenValid;
        } else if (selectedRecordingService === RECORDING_TYPES.LOCAL) {
            return false;
        }

        return true;
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        const {
            isTokenValid,
            isValidating,
            localRecordingOnlySelf,
            selectedRecordingService,
            sharingEnabled,
            spaceLeft,
            userName
        } = this.state;
        const { _fileRecordingsServiceEnabled, _fileRecordingsServiceSharingEnabled, _jibriReady } = this.props;

        if (_jibriReady === true) {
            return (
                <Dialog
                    ok = {{
                        translationKey: 'dialog.startRecording',
                        disabled: this.isStartRecordingDisabled()
                    }}
                    onSubmit = { this._onSubmit }
                    titleKey = 'dialog.startRecording'>
                    <StartRecordingDialogContent
                        fileRecordingsServiceEnabled = { _fileRecordingsServiceEnabled }
                        fileRecordingsServiceSharingEnabled = { _fileRecordingsServiceSharingEnabled }
                        integrationsEnabled = { this._areIntegrationsEnabled() }
                        isTokenValid = { isTokenValid }
                        isValidating = { isValidating }
                        jibriReady = { _jibriReady }
                        localRecordingOnlySelf = { localRecordingOnlySelf }
                        onChange = { this._onSelectedRecordingServiceChanged }
                        onLocalRecordingSelfChange = { this._onLocalRecordingSelfChange }
                        onSharingSettingChanged = { this._onSharingSettingChanged }
                        selectedRecordingService = { selectedRecordingService }
                        sharingSetting = { sharingEnabled }
                        spaceLeft = { spaceLeft }
                        userName = { userName } />
                </Dialog>
            );
        }

        return (
            <Dialog
                ok = {{
                    hidden: true
                }}>
                <StartRecordingDialogContent
                    fileRecordingsServiceEnabled = { _fileRecordingsServiceEnabled }
                    fileRecordingsServiceSharingEnabled = { _fileRecordingsServiceSharingEnabled }
                    integrationsEnabled = { this._areIntegrationsEnabled() }
                    isTokenValid = { isTokenValid }
                    isValidating = { isValidating }
                    jibriReady = { _jibriReady }
                    localRecordingOnlySelf = { localRecordingOnlySelf }
                    onChange = { this._onSelectedRecordingServiceChanged }
                    onLocalRecordingSelfChange = { this._onLocalRecordingSelfChange }
                    onSharingSettingChanged = { this._onSharingSettingChanged }
                    selectedRecordingService = { selectedRecordingService }
                    sharingSetting = { sharingEnabled }
                    spaceLeft = { spaceLeft }
                    userName = { userName } />
            </Dialog>
        );
    }

    /**
     * Toggles screenshot capture feature.
     *
     * @returns {void}
     */
    _toggleScreenshotCapture() {
        const { dispatch, _screenshotCaptureEnabled } = this.props;

        if (_screenshotCaptureEnabled) {
            dispatch(toggleScreenshotCaptureSummary(true));
        }
    }
}

/**
 * Maps redux state to component props.
 *
 * @param {Object} state - Redux state.
 * @param {any} ownProps - Component's own props.
 * @returns {Object}
 */
function mapStateToProps(state: IReduxState, ownProps: any) {
    return {
        ...abstractMapStateToProps(state, ownProps),
        _jibriReady: state['features/inklusiva/sessiondata'].jibriReady,
        _screenshotCaptureEnabled: isScreenshotCaptureEnabled(state, true, false)
    };
}

export default translate(connect(mapStateToProps)(StartRecordingDialog));
