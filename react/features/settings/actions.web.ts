import { batch } from 'react-redux';

import { IStore } from '../app/types';
import {
    setFollowMe,
    setStartMutedPolicy,
    setStartReactionsMuted
} from '../base/conference/actions';
import { hideDialog, openDialog } from '../base/dialog/actions';
import i18next from '../base/i18n/i18next';
import { updateSettings } from '../base/settings/actions';
import { getLocalVideoTrack } from '../base/tracks/functions.any';
import { disableKeyboardShortcuts, enableKeyboardShortcuts } from '../keyboard-shortcuts/actions';
import { toggleBackgroundEffect } from '../virtual-background/actions';
import virtualBackgroundLogger from '../virtual-background/logger';

import {
    SET_AUDIO_SETTINGS_VISIBILITY,
    SET_VIDEO_SETTINGS_VISIBILITY
} from './actionTypes';
import LogoutDialog from './components/web/LogoutDialog';
import SettingsDialog from './components/web/SettingsDialog';
import {
    getModeratorTabProps,
    getMoreTabProps,
    getNotificationsTabProps,
    getProfileTabProps,
    getShortcutsTabProps
} from './functions.web';

/**
 * Opens {@code LogoutDialog}.
 *
 * @param {Function} onLogout - The event in {@code LogoutDialog} that should be
 *  enabled on click.
 * @returns {Function}
 */
export function openLogoutDialog(onLogout: Function) {
    return openDialog(LogoutDialog, { onLogout });
}

/**
 * Opens {@code SettingsDialog}.
 *
 * @param {string} defaultTab - The tab in {@code SettingsDialog} that should be
 * displayed initially.
 * @param {boolean} isDisplayedOnWelcomePage - Indicates whether the device selection dialog is displayed on the
 * welcome page or not.
 * @returns {Function}
 */
export function openSettingsDialog(defaultTab?: string, isDisplayedOnWelcomePage?: boolean) {
    return openDialog(SettingsDialog, {
        defaultTab,
        isDisplayedOnWelcomePage
    });
}

/**
 * Closes {@code SettingsDialog}.
 *
 * @returns {Function}
 */
export function closeSettingsDialog() {
    return hideDialog(SettingsDialog);
}

/**
 * Toggles the {@code SettingsDialog}.
 *
 * @param {string} defaultTab - The tab in {@code SettingsDialog} that should be
 * displayed initially.
 * @returns {Function}
 */
export function toggleSettingsDialog(defaultTab?: string) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const dialogComponent = getState()['features/base/dialog']?.component;

        if (dialogComponent) {
            dispatch(closeSettingsDialog());
        } else {
            dispatch(openSettingsDialog(defaultTab, false));
        }
    };
}

/**
 * Sets the visibility of the audio settings.
 *
 * @param {boolean} value - The new value.
 * @returns {Function}
 */
function setAudioSettingsVisibility(value: boolean) {
    return {
        type: SET_AUDIO_SETTINGS_VISIBILITY,
        value
    };
}

/**
 * Sets the visibility of the video settings.
 *
 * @param {boolean} value - The new value.
 * @returns {Function}
 */
function setVideoSettingsVisibility(value: boolean) {
    return {
        type: SET_VIDEO_SETTINGS_VISIBILITY,
        value
    };
}

/**
 * Submits the settings from the "More" tab of the settings dialog.
 *
 * @param {Object} newState - The new settings.
 * @returns {Function}
 */
export function submitMoreTab(newState: any) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getMoreTabProps(getState());

        const showPrejoinPage = newState.showPrejoinPage;

        if (showPrejoinPage !== currentState.showPrejoinPage) {
            dispatch(updateSettings({
                userSelectedSkipPrejoin: !showPrejoinPage
            }));
        }

        if (newState.maxStageParticipants !== currentState.maxStageParticipants) {
            dispatch(updateSettings({ maxStageParticipants: Number(newState.maxStageParticipants) }));
        }

        if (newState.currentLanguage !== currentState.currentLanguage) {
            i18next.changeLanguage(newState.currentLanguage);
        }
    };
}

/**
 * Submits the settings from the "Moderator" tab of the settings dialog.
 *
 * @param {Object} newState - The new settings.
 * @returns {Function}
 */
export function submitModeratorTab(newState: any) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getModeratorTabProps(getState());

        if (newState.followMeEnabled !== currentState.followMeEnabled) {
            dispatch(setFollowMe(newState.followMeEnabled));
        }

        if (newState.startReactionsMuted !== currentState.startReactionsMuted) {
            batch(() => {
                // updating settings we want to update and backend (notify the rest of the participants)
                dispatch(setStartReactionsMuted(newState.startReactionsMuted, true));
                dispatch(updateSettings({ soundsReactions: !newState.startReactionsMuted }));
            });
        }

        if (newState.startAudioMuted !== currentState.startAudioMuted
            || newState.startVideoMuted !== currentState.startVideoMuted) {
            dispatch(setStartMutedPolicy(
                newState.startAudioMuted, newState.startVideoMuted));
        }
    };
}

/**
 * Submits the settings from the "Profile" tab of the settings dialog.
 *
 * @param {Object} newState - The new settings.
 * @returns {Function}
 */
export function submitProfileTab(newState: any) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getProfileTabProps(getState());

        if (newState.displayName !== currentState.displayName) {
            APP.conference.changeLocalDisplayName(newState.displayName);
        }

        if (newState.email !== currentState.email) {
            APP.conference.changeLocalEmail(newState.email);
        }
    };
}

/**
 * Submits the settings from the "Sounds" tab of the settings dialog.
 *
 * @param {Object} newState - The new settings.
 * @returns {Function}
 */
export function submitNotificationsTab(newState: any) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getNotificationsTabProps(getState());
        const shouldNotUpdateReactionSounds = getModeratorTabProps(getState()).startReactionsMuted;
        const shouldUpdate = (newState.soundsIncomingMessage !== currentState.soundsIncomingMessage)
            || (newState.soundsParticipantJoined !== currentState.soundsParticipantJoined)
            || (newState.soundsParticipantKnocking !== currentState.soundsParticipantKnocking)
            || (newState.soundsParticipantLeft !== currentState.soundsParticipantLeft)
            || (newState.soundsTalkWhileMuted !== currentState.soundsTalkWhileMuted)
            || (newState.soundsReactions !== currentState.soundsReactions);

        if (shouldUpdate) {
            const settingsToUpdate = {
                soundsIncomingMessage: newState.soundsIncomingMessage,
                soundsParticipantJoined: newState.soundsParticipantJoined,
                soundsParticipantKnocking: newState.soundsParticipantKnocking,
                soundsParticipantLeft: newState.soundsParticipantLeft,
                soundsTalkWhileMuted: newState.soundsTalkWhileMuted,
                soundsReactions: newState.soundsReactions
            };

            if (shouldNotUpdateReactionSounds) {
                delete settingsToUpdate.soundsReactions;
            }
            dispatch(updateSettings(settingsToUpdate));
        }

        const enabledNotifications = newState.enabledNotifications;

        if (enabledNotifications !== currentState.enabledNotifications) {
            dispatch(updateSettings({
                userSelectedNotifications: {
                    ...getState()['features/base/settings'].userSelectedNotifications,
                    ...enabledNotifications
                }
            }));
        }
    };
}

/**
 * Toggles the visibility of the audio settings.
 *
 * @returns {void}
 */
export function toggleAudioSettings() {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const value = getState()['features/settings'].audioSettingsVisible;

        dispatch(setAudioSettingsVisibility(!value));
    };
}

/**
 * Toggles the visibility of the video settings.
 *
 * @returns {void}
 */
export function toggleVideoSettings() {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const value = getState()['features/settings'].videoSettingsVisible;

        dispatch(setVideoSettingsVisibility(!value));
    };
}

/**
 * Submits the settings from the "Shortcuts" tab of the settings dialog.
 *
 * @param {Object} newState - The new settings.
 * @returns {Function}
 */
export function submitShortcutsTab(newState: any) {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const currentState = getShortcutsTabProps(getState());

        if (newState.keyboardShortcutsEnabled !== currentState.keyboardShortcutsEnabled) {
            if (newState.keyboardShortcutsEnabled) {
                dispatch(enableKeyboardShortcuts());
            } else {
                dispatch(disableKeyboardShortcuts());
            }
        }
    };
}

/**
 * Submits the settings from the "Virtual Background" tab of the settings dialog.
 *
 * @param {Object} newState - The new settings.
 * @param {boolean} isCancel - Whether the change represents a cancel.
 * @returns {Function}
 */
export function submitVirtualBackgroundTab(newState: any, isCancel = false) {
    return async (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const state = getState();
        const track = getLocalVideoTrack(state['features/base/tracks'])?.jitsiTrack;

        if (newState.options?.selectedThumbnail) {
            await dispatch(toggleBackgroundEffect(newState.options, track));

            if (!isCancel) {
                // Set x scale to default value.
                // dispatch(updateSettings({
                //     localFlipX: true
                // }));

                virtualBackgroundLogger.info(`Virtual background type: '${
                    typeof newState.options.backgroundType === 'undefined'
                        ? 'none' : newState.options.backgroundType}' applied!`);
            }
        }
    };
}
