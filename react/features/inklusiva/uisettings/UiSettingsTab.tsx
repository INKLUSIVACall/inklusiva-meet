import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../base/dialog/components/web/AbstractDialogTab';
import { translate } from '../../base/i18n/functions';
import Checkbox from '../../base/ui/components/web/Checkbox';
import Slider from '../../base/ui/components/web/Slider';
import { inklusivaSettingsStyles } from '../../inklusiva/ui-constants';
import { BRIGHTNESS_SLIDER_MAXIMUM, BRIGHTNESS_SLIDER_MINIMUM, CONTRAST_SLIDER_MAXIMUM, CONTRAST_SLIDER_MINIMUM, OPACITY_SLIDER_MAXIMUM, OPACITY_SLIDER_MINIMUM, SATURATION_SLIDER_MAXIMUM, SATURATION_SLIDER_MINIMUM, ZOOM_SLIDER_MAXIMUM, ZOOM_SLIDER_MINIMUM } from '../../video-menu/constants';

/**
 * The type of the React {@code Component} props of {@link OwnAudioTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

    /**
     * Whether the acoustic cues are enabled or not.
     */
    acousticCues: boolean;

    /**
     * Brightness value for user videos.
     */
    brightness: number;

    /**
     * CSS classes object.
     */
    classes: any;

    /**
     * Contrast value for user videos.
     */
    contrast: number;

    /**
     * The currently selected language to display in the language select
     * dropdown.
     */
    currentLanguage: string;

    /**
     * Dimming value for user videos.
     */
    dimming: number;

    /**
     * The global FontSize modifier. Can range from 0-2 (representing the values klein, mittel, groß).
     */
    fontSize: number;

    /**
     * The global iconSize modifier. Can range from 0-2 (representing the values klein, mittel, groß).
     */
    iconSize: number;

    /**
     * Are Interpreters Videos enabled?
     */
    interpreter: boolean;

    /**
     * Are User Videos enabled?
     */
    otherParticipants: boolean;

    /**
     * Saturation value for user videos.
     */
    saturation: number;

    /**
     * Is screensharing enabled?
     */
    screensharing: boolean;

    /**
     * Whether the visual cues are enabled or not.
     */
    visualCues: boolean;

    /**
     * Zoom value for user videos.
     */
    zoom: number;
}

const styles = (theme: Theme) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            width: '100%'
        },
        headline: {
            marginBottom: theme.spacing(3)
        },
        inputElement: {
            marginBottom: theme.spacing(1),
            fontWeight: 'bold',
            fontSize: ''
        },
        textareaElement: {
            marginBottom: theme.spacing(1)
        },
        description: {
            marginBottom: theme.spacing(3)
        },
        ...inklusivaSettingsStyles(theme)
    };
};

/**
 * React {@code Component} for modifying the user's UI settings.
 */
class UiSettingsTab extends AbstractDialogTab<IProps, any> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            classes,
            fontSize,
            iconSize,
            visualCues,
            contrast,
            brightness,
            dimming,
            interpreter,
            otherParticipants,
            saturation,
            screensharing,
            zoom,
            t
        } = this.props;

        const getSizeDescription = (size: number) => t(`settings.uiSettings.fontSizes.size${size}`);

        return (
            <div className = { classes.container }>
                <h2> {t('settings.uiSettings.headline')} </h2>
                <p className = 'mt-05'> {t('settings.uiSettings.intro')} </p>
                <div className = { classes.inputblockContainer }>
                    <h3>{t('settings.uiSettings.visualcues.headline')}</h3>
                    <p> {t('settings.uiSettings.visualcues.description')} </p>
                    <Checkbox
                        checked = { visualCues }
                        className = { classes.inputElement }
                        label = { t('settings.uiSettings.visualcues.label') }
                        name = 'visualcues_enable'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { () =>
                            super._onChange({
                                visualCues: !visualCues
                            })
                        } />
                </div>

                <div className = { classes.inputblockContainer }>
                    <h3>{t('settings.uiSettings.fontSize')}</h3>
                    <div className = { classes.controlContainer }>
                        <div className = { classes.controlColumn }>
                            <Slider
                                className = { classes.inputElement }
                                defaultValue = { fontSize }
                                label = { t('settings.uiSettings.fontSize') }
                                max = { 2 }
                                min = { 0 }
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange = { event =>
                                    super._onChange({
                                        fontSize: parseInt(event.target.value, 10)
                                    })
                                }
                                step = { 1 } />
                        </div>
                        <div className = { classes.valueColumn }>
                            {getSizeDescription(fontSize) }
                        </div>
                    </div>
                    <div className = { classes.controlContainer }>
                        <div className = { classes.controlColumn }>
                            <Slider
                                className = { classes.inputElement }
                                defaultValue = { iconSize }
                                label = { t('settings.uiSettings.iconSize') }
                                max = { 2 }
                                min = { 0 }
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange = { event =>
                                    super._onChange({
                                        iconSize: parseInt(event.target.value, 10)
                                    })
                                }
                                step = { 1 } />
                        </div>
                        <div className = { classes.valueColumn }>
                            {getSizeDescription(iconSize) }
                        </div>
                    </div>
                </div>
                <div className = { classes.inputblockContainer }>
                    <h3 className = 'mt-1'>{t('settings.uiSettings.videoOutput')}</h3>
                    <Checkbox
                        checked = { otherParticipants }
                        className = { classes.inputElement }
                        label = { t('settings.userVideo.videoVisibilityEngage') }
                        name = 'video-visibility-toggle'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { () =>
                            super._onChange({
                                otherParticipants: !otherParticipants
                            })
                        } />
                </div>

                {/* TODO: Vorläufig auskommentiert, erst die noch verbleibenden Probleme mit der Darstellung lösen. */}

                {/* <div className = { classes.inputblockContainer }> */}
                {/*     <Checkbox */}
                {/*         checked = { interpreter } */}
                {/*         className = { classes.inputElement } */}
                {/*         label = { t('settings.userVideo.interpreterHeadline') } */}
                {/*         name = 'video-visibility-toggle' */}
                {/*         // eslint-disable-next-line react/jsx-no-bind */}
                {/*         onChange = { () => */}
                {/*             super._onChange({ */}
                {/*                 interpreter: !interpreter */}
                {/*             }) */}
                {/*         } /> */}
                {/* </div> */}
                {/* <div className = { classes.inputblockContainer }> */}
                {/*     <Checkbox */}
                {/*         checked = { screensharing } */}
                {/*         className = { classes.inputElement } */}
                {/*         label = { t('settings.userVideo.screensharingHeadline') } */}
                {/*         name = 'video-visibility-toggle' */}
                {/*         // eslint-disable-next-line react/jsx-no-bind */}
                {/*         onChange = { () => */}
                {/*             super._onChange({ */}
                {/*                 screensharing: !screensharing */}
                {/*             }) */}
                {/*         } /> */}
                {/* </div> */}
                <div className = { classes.inputblockContainer }>
                    <div className = { classes.controlContainer }>
                        <div className = { classes.controlColumn }>
                            <Slider
                                className = { classes.inputElement }
                                defaultValue = { contrast }
                                label = { t('settings.userVideo.contrastSliderHeadline') }
                                max = { CONTRAST_SLIDER_MAXIMUM }
                                min = { CONTRAST_SLIDER_MINIMUM }
                                name = 'contrast-slider'
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange = { event =>
                                    super._onChange({
                                        contrast: event.target.value
                                    })
                                }
                                step = { 1 } />
                        </div>
                        <div className = { classes.valueColumn }>{contrast}%</div>
                    </div>
                    <div className = { classes.controlContainer }>
                        <div className = { classes.controlColumn }>
                            <Slider
                                className = { classes.inputElement }
                                defaultValue = { brightness }
                                label = { t('settings.userVideo.brightnessSliderHeadline') }
                                max = { BRIGHTNESS_SLIDER_MAXIMUM }
                                min = { BRIGHTNESS_SLIDER_MINIMUM }
                                name = 'brightness-slider'
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange = { event =>
                                    super._onChange({
                                        brightness: event.target.value
                                    })
                                }
                                step = { 1 } />
                        </div>
                        <div className = { classes.valueColumn }>{brightness}%</div>
                    </div>
                    <div className = { classes.controlContainer }>
                        <div className = { classes.controlColumn }>
                            <Slider
                                className = { classes.inputElement }
                                defaultValue = { dimming }
                                label = { t('settings.userVideo.dimSliderHeadline') }
                                max = { OPACITY_SLIDER_MAXIMUM }
                                min = { OPACITY_SLIDER_MINIMUM }
                                name = 'dimmer-slider'
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange = { event =>
                                    super._onChange({
                                        dimming: event.target.value
                                    })
                                }
                                step = { 1 } />
                        </div>
                        <div className = { classes.valueColumn }>{dimming}%</div>
                    </div>
                    <div className = { classes.controlContainer }>
                        <div className = { classes.controlColumn }>
                            <Slider
                                className = { classes.inputElement }
                                defaultValue = { saturation }
                                label = { t('settings.userVideo.saturationSliderHeadline') }
                                max = { SATURATION_SLIDER_MAXIMUM }
                                min = { SATURATION_SLIDER_MINIMUM }
                                name = 'saturation-slider'
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange = { event =>
                                    super._onChange({
                                        saturation: event.target.value
                                    })
                                }
                                step = { 1 } />
                        </div>
                        <div className = { classes.valueColumn }>{saturation}%</div>
                    </div>
                    <div className = { classes.controlContainer }>
                        <div className = { classes.controlColumn }>
                            <Slider
                                className = { classes.inputElement }
                                defaultValue = { zoom }
                                label = { t('settings.userVideo.zoomSliderHeadline') }
                                max = { ZOOM_SLIDER_MAXIMUM }
                                min = { ZOOM_SLIDER_MINIMUM }
                                name = 'zoom-slider'
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange = { event =>
                                    super._onChange({
                                        zoom: event.target.value
                                    })
                                }
                                step = { 1 } />
                        </div>
                        <div className = { classes.valueColumn }>{zoom}%</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(translate(UiSettingsTab));
