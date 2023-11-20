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


/**
 * The type of the React {@code Component} props of {@link UserVideoTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

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
     * fps value for user videos.
     */
    fps: number;

    /**
     * Are User Videos enabled?
     */
    otherParticipants: boolean;

    /**
     * Saturation value for user videos.
     */
    saturation: number;

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
            padding: '0 2px',
            width: '100%'
        },
        headline: {
            marginBottom: theme.spacing(3)
        },
        inputElement: {
            marginBottom: theme.spacing(1),
            fontWeight: 'bold'
        },
        textareaElement: {
            marginBottom: theme.spacing(1)
        },
        description: {
            marginBottom: theme.spacing(3)
        },
        inputblockContainer: {
            marginBottom: theme.spacing(5)
        }
    };
};

/**
 * React {@code Component} for modifying the user's video settings.
 *
 * @augments Component
 */
class UserVideoTab extends AbstractDialogTab<IProps, any> {
    /**
     * Initializes a new {@code UserVideoTab} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: IProps) {
        super(props);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {

        const { brightness, classes, contrast, dimming, fps, otherParticipants, saturation, zoom, t } = this.props;

        return (
            <div className = { classes.container }>
                <b className = { classes.headline }>
                    {t('toolbar.userVideo.containerHeadline')}
                </b>
                <div className = { classes.inputblockContainer }>
                    <Checkbox
                        checked = { otherParticipants }
                        className = { classes.inputElement }
                        label = { t('toolbar.userVideo.videoVisibilityEngage') }
                        // eslint-disable-next-line react/jsx-no-bind
                        name = 'video-visibility-toggle'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { () =>
                            super._onChange({
                                otherParticipants: !otherParticipants
                            })
                        } />
                    <div className = { classes.description }>
                        {t('toolbar.userVideo.videoVisibilityToggleHeadline')}
                    </div>
                </div>
                <div className = { classes.inputblockContainer }>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { contrast }
                        label = { t('toolbar.userVideo.contrastSliderHeadline') }
                        max = { 100 }
                        min = { 0 }
                        name = 'contrast-slider'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { event =>
                            super._onChange({
                                contrast: event.target.value
                            })
                        }
                        step = { 1 } />
                    <span>{ contrast }%</span>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { brightness }
                        label = { t('toolbar.userVideo.brightnessSliderHeadline') }
                        max = { 100 }
                        min = { 0 }
                        name = 'brightness-slider'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { event =>
                            super._onChange({
                                brightness: event.target.value
                            })
                        }
                        step = { 1 } />
                    <span>{ brightness }%</span>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { dimming }
                        label = { t('toolbar.userVideo.dimSliderHeadline') }
                        max = { 100 }
                        min = { 0 }
                        name = 'dimmer-slider'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { event =>
                            super._onChange({
                                dimming: event.target.value
                            })
                        }
                        step = { 1 } />
                    <span>{ dimming }%</span>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { saturation }
                        label = { t('toolbar.userVideo.saturationSliderHeadline') }
                        max = { 100 }
                        min = { 0 }
                        name = 'saturation-slider'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { event =>
                            super._onChange({
                                saturation: event.target.value
                            })
                        }
                        step = { 1 } />
                    <span>{ saturation }%</span>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { zoom }
                        label = { t('toolbar.userVideo.zoomSliderHeadline') }
                        max = { 100 }
                        min = { 0 }
                        name = 'zoom-slider'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { event =>
                            super._onChange({
                                zoom: event.target.value
                            })
                        }
                        step = { 1 } />
                    <span>{ zoom }%</span>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { fps }
                        label = { t('toolbar.userVideo.fpsSliderHeadline') }
                        max = { 100 }
                        min = { 0 }
                        name = 'fps-slider'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { event =>
                            super._onChange({
                                fps: event.target.value
                            })
                        }
                        step = { 1 } />
                    <span>{ fps }fps</span>
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(translate(UserVideoTab));
