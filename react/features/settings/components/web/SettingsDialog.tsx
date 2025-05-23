import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState, IStore } from '../../../app/types';
import {
    IconAudioOnly,
    IconBell,
    IconBellConcierge,
    IconCalendar,
    IconGear,
    IconHands,
    IconImage,
    IconModerator,
    IconShortcuts,
    IconUser,
    IconVideo,
    IconVolumeUp
} from '../../../base/icons/svg';
import DialogWithTabs, { IDialogTab } from '../../../base/ui/components/web/DialogWithTabs';
import { isCalendarEnabled } from '../../../calendar-sync/functions.web';
import { submitAudioDeviceSelectionTab, submitVideoDeviceSelectionTab } from '../../../device-selection/actions.web';
import AudioDevicesSelection from '../../../device-selection/components/AudioDevicesSelection';
import VideoDeviceSelection from '../../../device-selection/components/VideoDeviceSelection';
import {
    getAudioDeviceSelectionDialogProps,
    getVideoDeviceSelectionDialogProps
} from '../../../device-selection/functions.web';
import DistressBtnTab from '../../../inklusiva/distressbtn/DistressBtnTab';
import { submitNewDistressBtnTab } from '../../../inklusiva/distressbtn/actions.web';
import { getDistressBtnTabProps } from '../../../inklusiva/distressbtn/functions.web';
import SignLangTranscriptionTab from '../../../inklusiva/signLang/SignLangTranscriptionTab';
import { submitSignLangTabProps } from '../../../inklusiva/signLang/actions.web';
import { getSignLangTabProps } from '../../../inklusiva/signLang/functions.web';
import UiSettingsTab from '../../../inklusiva/uisettings/UiSettingsTab';
import { submitUISettingsTabProps } from '../../../inklusiva/uisettings/actions.web';
import { getUISettingsTabProps } from '../../../inklusiva/uisettings/functions';
import { checkBlurSupport, checkVirtualBackgroundEnabled } from '../../../virtual-background/functions';
import { iAmVisitor } from '../../../visitors/functions';
import {
    submitModeratorTab,
    submitMoreTab,
    submitNotificationsTab,
    submitProfileTab,
    submitShortcutsTab,
    submitVirtualBackgroundTab
} from '../../actions.web';
import { SETTINGS_TABS } from '../../constants';
import {
    getModeratorTabProps,
    getMoreTabProps,
    getNotificationsMap,
    getNotificationsTabProps,
    getProfileTabProps,
    getShortcutsTabProps,
    getVirtualBackgroundTabProps
} from '../../functions.web';

import CalendarTab from './CalendarTab';
import ModeratorTab from './ModeratorTab';
import MoreTab from './MoreTab';
import NotificationsTab from './NotificationsTab';
import ProfileTab from './ProfileTab';
import ShortcutsTab from './ShortcutsTab';
import VirtualBackgroundTab from './VirtualBackgroundTab';

/**
 * The type of the React {@code Component} props of
 * {@link ConnectedSettingsDialog}.
 */
interface IProps {

    /**
     * Information about the tabs to be rendered.
     */
    _tabs: IDialogTab<any>[];

    /**
     * Which settings tab should be initially displayed. If not defined then
     * the first tab will be displayed.
     */
    defaultTab: string;

    /**
     * Invoked to save changed settings.
     */
    dispatch: IStore['dispatch'];

    /**
     * Indicates whether the device selection dialog is displayed on the
     * welcome page or not.
     */
    isDisplayedOnWelcomePage: boolean;
}

const useStyles = makeStyles()(() => {
    return {
        settingsDialog: {
            display: 'flex',
            width: '100%'
        }
    };
});

const SettingsDialog = ({ _tabs, defaultTab, dispatch }: IProps) => {
    const { classes } = useStyles();

    const correctDefaultTab = _tabs.find(tab => tab.name === defaultTab)?.name;
    const tabs = _tabs.map(tab => {
        return {
            ...tab,
            className: `settings-pane ${classes.settingsDialog}`,
            submit: (...args: any) => tab.submit && dispatch(tab.submit(...args))
        };
    });

    return (
        <DialogWithTabs
            className = 'settings-dialog'
            defaultTab = { correctDefaultTab }
            tabs = { tabs }
            titleKey = 'settings.title' />
    );
};

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code ConnectedSettingsDialog} component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The props passed to the component.
 * @private
 * @returns {{
 *     tabs: Array<Object>
 * }}
 */
function _mapStateToProps(state: IReduxState, ownProps: any) {
    const { isDisplayedOnWelcomePage } = ownProps;
    const configuredTabs = interfaceConfig.SETTINGS_SECTIONS || [];

    // The settings sections to display.
    const showDeviceSettings = configuredTabs.includes('devices');
    const moreTabProps = getMoreTabProps(state);
    const distressBtnTabProps = getDistressBtnTabProps(state);
    const moderatorTabProps = getModeratorTabProps(state);
    const { showModeratorSettings } = moderatorTabProps;
    const showMoreTab = configuredTabs.includes('more');
    const showProfileSettings = configuredTabs.includes('profile') && !state['features/base/config'].disableProfile;
    const showCalendarSettings = configuredTabs.includes('calendar') && isCalendarEnabled(state);
    const showSoundsSettings = configuredTabs.includes('sounds');
    const enabledNotifications = getNotificationsMap(state);
    const showNotificationsSettings = Object.keys(enabledNotifications).length > 0;
    const virtualBackgroundSupported = checkBlurSupport();
    const enableVirtualBackground = checkVirtualBackgroundEnabled(state);
    const tabs: IDialogTab<any>[] = [];
    const _iAmVisitor = iAmVisitor(state);

    const signLangTabProps = getSignLangTabProps(state);
    const uiSettingsTabProps = getUISettingsTabProps(state);

    if (showDeviceSettings) {
        if (showProfileSettings) {
            tabs.push({
                name: SETTINGS_TABS.PROFILE,
                component: ProfileTab,
                labelKey: 'profile.title',
                props: getProfileTabProps(state),
                submit: submitProfileTab,
                icon: IconUser,
                specialTab: true
            });
        }

        tabs.push({
            name: SETTINGS_TABS.UI_TAB,
            component: UiSettingsTab,
            labelKey: 'settings.uiTab',
            props: uiSettingsTabProps,
            propsUpdateFunction: (tabState: any, newProps: typeof uiSettingsTabProps) => {
                return {
                    ...newProps,
                    fontSize: tabState?.fontSize,
                    iconSize: tabState?.iconSize,
                    acousticCues: tabState?.acousticCues,
                    visualCues: tabState?.visualCues,
                    contrast: tabState?.contrast,
                    brightness: tabState?.brightness,
                    dimming: tabState?.dimming,
                    interpreter: tabState?.interpreter,
                    otherParticipants: tabState?.otherParticipants,
                    saturation: tabState?.saturation,
                    screensharing: tabState?.screensharing,
                    zoom: tabState?.zoom
                };
            },
            submit: submitUISettingsTabProps,
            icon: IconAudioOnly,
            specialTab: true
        });

        tabs.push({
            name: SETTINGS_TABS.AUDIO,
            component: AudioDevicesSelection,
            labelKey: 'settings.audio',
            props: getAudioDeviceSelectionDialogProps(state, isDisplayedOnWelcomePage),
            propsUpdateFunction: (tabState: any, newProps: ReturnType<typeof getAudioDeviceSelectionDialogProps>) => {
                // Ensure the device selection tab gets updated when new devices
                // are found by taking the new props and only preserving the
                // current user selected devices. If this were not done, the
                // tab would keep using a copy of the initial props it received,
                // leaving the device list to become stale.
                //
                return {
                    ...newProps,
                    othersVolume: tabState.othersVolume,
                    highFrequencies: tabState.highFrequencies,
                    amplify: tabState.amplify,
                    balance: tabState.balance,
                    acousticCues: tabState.acousticCues,
                    noiseSuppressionEnabled: tabState.noiseSuppressionEnabled,
                    selectedAudioInputId: tabState.selectedAudioInputId,
                    selectedAudioOutputId: tabState.selectedAudioOutputId,
                    othersAudio: tabState.othersAudio
                };
            },
            submit: (newState: any) => submitAudioDeviceSelectionTab(newState, isDisplayedOnWelcomePage),
            icon: IconVolumeUp,
            specialTab: true
        });

        tabs.push({
            name: SETTINGS_TABS.DISTRESSBTN_TAB,
            component: DistressBtnTab,
            labelKey: 'settings.distressBtnTab', // muss in Sprachdatei gesetzt werden
            props: getDistressBtnTabProps(state),
            propsUpdateFunction: (tabState: any, newProps: typeof distressBtnTabProps) => {
            // Updates tab props, keeping users selection
                return {
                    ...newProps,
                    active: tabState?.active,
                    dimming: tabState?.dimming,
                    volume: tabState?.volume,
                    message: tabState?.message,
                    messageText: tabState?.messageText
                };
            },
            submit: submitNewDistressBtnTab,
            icon: IconBellConcierge,
            specialTab: true
        });

        tabs.push({
            name: SETTINGS_TABS.SIGNLANGTRANSRIPTION_TAB,
            component: SignLangTranscriptionTab,
            labelKey: 'settings.SignLangTranscriptionTab',
            props: signLangTabProps,
            propsUpdateFunction: (tabState: any, newProps: typeof signLangTabProps) => {
                return {
                    ...newProps,
                    signLangActive: tabState?.signLangActive,
                    signLangDisplay: tabState?.signLangDisplay,
                    signLangWindowSize: tabState?.signLangWindowSize,
                    transcriptionActive: tabState?.transcriptionActive,
                    transcriptionFontSize: tabState?.transcriptionFontSize,
                    transcriptionHistory: tabState.transcriptionHistory
                };
            },
            submit: submitSignLangTabProps,
            icon: IconHands,
            specialTab: true,
            separatorAfter: true
        });

        !_iAmVisitor
            && tabs.push({
                name: SETTINGS_TABS.VIDEO,
                component: VideoDeviceSelection,
                labelKey: 'settings.video',
                props: getVideoDeviceSelectionDialogProps(state, isDisplayedOnWelcomePage),
                propsUpdateFunction: (
                        tabState: any,
                        newProps: ReturnType<typeof getVideoDeviceSelectionDialogProps>
                ) => {
                    // Ensure the device selection tab gets updated when new devices
                    // are found by taking the new props and only preserving the
                    // current user selected devices. If this were not done, the
                    // tab would keep using a copy of the initial props it received,
                    // leaving the device list to become stale.

                    return {
                        ...newProps,
                        currentFramerate: tabState?.currentFramerate,
                        hideSelfView: tabState.hideSelfView,
                        localFlipX: tabState.localFlipX,
                        selectedVideoInputId: tabState.selectedVideoInputId
                    };
                },
                submit: (newState: any) => submitVideoDeviceSelectionTab(newState, isDisplayedOnWelcomePage),
                icon: IconVideo
            });
    }

    if (virtualBackgroundSupported && !_iAmVisitor && enableVirtualBackground) {
        tabs.push({
            name: SETTINGS_TABS.VIRTUAL_BACKGROUND,
            component: VirtualBackgroundTab,
            labelKey: 'virtualBackground.title',
            props: getVirtualBackgroundTabProps(state, isDisplayedOnWelcomePage),
            propsUpdateFunction: (
                    tabState: any,
                    newProps: ReturnType<typeof getVirtualBackgroundTabProps>,
                    tabStates: any
            ) => {
                const videoTabState = tabStates[tabs.findIndex(tab => tab.name === SETTINGS_TABS.VIDEO)];

                return {
                    ...newProps,
                    selectedVideoInputId: videoTabState?.selectedVideoInputId || newProps.selectedVideoInputId,
                    options: tabState.options
                };
            },
            submit: (newState: any) => submitVirtualBackgroundTab(newState),
            cancel: () => {
                const { options } = getVirtualBackgroundTabProps(state, isDisplayedOnWelcomePage);

                return submitVirtualBackgroundTab(
                    {
                        options: {
                            backgroundType: options.backgroundType,
                            enabled: options.backgroundEffectEnabled,
                            url: options.virtualSource,
                            selectedThumbnail: options.selectedThumbnail,
                            blurValue: options.blurValue
                        }
                    },
                    true
                );
            },
            icon: IconImage
        });
    }

    if ((showSoundsSettings || showNotificationsSettings) && !_iAmVisitor) {
        tabs.push({
            name: SETTINGS_TABS.NOTIFICATIONS,
            component: NotificationsTab,
            labelKey: 'settings.notifications',
            propsUpdateFunction: (tabState: any, newProps: ReturnType<typeof getNotificationsTabProps>) => {
                return {
                    ...newProps,
                    enabledNotifications: tabState?.enabledNotifications || {},
                    soundsIncomingMessage: tabState?.soundsIncomingMessage,
                    soundsParticipantJoined: tabState?.soundsParticipantJoined,
                    soundsParticipantKnocking: tabState?.soundsParticipantKnocking,
                    soundsParticipantLeft: tabState?.soundsParticipantLeft,
                    soundsReactions: tabState?.soundsReactions,
                    soundsTalkWhileMuted: tabState?.soundsTalkWhileMuted
                };
            },
            props: getNotificationsTabProps(state, showSoundsSettings),
            submit: submitNotificationsTab,
            icon: IconBell
        });
    }

    if (showModeratorSettings && !_iAmVisitor) {
        tabs.push({
            name: SETTINGS_TABS.MODERATOR,
            component: ModeratorTab,
            labelKey: 'settings.moderator',
            props: moderatorTabProps,
            propsUpdateFunction: (tabState: any, newProps: typeof moderatorTabProps) => {
                // Updates tab props, keeping users selection

                return {
                    ...newProps,
                    followMeEnabled: tabState?.followMeEnabled,
                    startAudioMuted: tabState?.startAudioMuted,
                    startVideoMuted: tabState?.startVideoMuted,
                    startReactionsMuted: tabState?.startReactionsMuted
                };
            },
            submit: submitModeratorTab,
            icon: IconModerator
        });
    }

    if (showCalendarSettings && !_iAmVisitor) {
        tabs.push({
            name: SETTINGS_TABS.CALENDAR,
            component: CalendarTab,
            labelKey: 'settings.calendar.title',
            icon: IconCalendar
        });
    }

    !_iAmVisitor
        && tabs.push({
            name: SETTINGS_TABS.SHORTCUTS,
            component: ShortcutsTab,
            labelKey: 'settings.shortcuts',
            props: getShortcutsTabProps(state, isDisplayedOnWelcomePage),
            propsUpdateFunction: (tabState: any, newProps: ReturnType<typeof getShortcutsTabProps>) => {
                // Updates tab props, keeping users selection

                return {
                    ...newProps,
                    keyboardShortcutsEnabled: tabState?.keyboardShortcutsEnabled
                };
            },
            submit: submitShortcutsTab,
            icon: IconShortcuts
        });


    if (showMoreTab && !_iAmVisitor) {
        tabs.push({
            name: SETTINGS_TABS.MORE,
            component: MoreTab,
            labelKey: 'settings.more',
            props: moreTabProps,
            propsUpdateFunction: (tabState: any, newProps: typeof moreTabProps) => {
                // Updates tab props, keeping users selection

                return {
                    ...newProps,
                    currentLanguage: tabState?.currentLanguage,
                    showPrejoinPage: tabState?.showPrejoinPage,
                    maxStageParticipants: tabState?.maxStageParticipants
                };
            },
            submit: submitMoreTab,
            icon: IconGear
        });
    }

    return { _tabs: tabs };
}

export default connect(_mapStateToProps)(SettingsDialog);
