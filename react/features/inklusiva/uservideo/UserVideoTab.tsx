import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../base/dialog/components/web/AbstractDialogTab';
import { translate } from '../../base/i18n/functions';
import { getRemoteParticipants } from '../../base/participants/functions';
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
        },
        controlContainer: {
            display: 'flex'
        },
        controlColumn: {
            flex: '1 1 auto',
            marginBottom: '10px !important'
        },
        valueColum: {
            flex: '0 0 20%',
            paddingLeft: theme.spacing(5)
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

        const { brightness, classes, contrast, dimming, interpreter, otherParticipants, saturation,
            screensharing, zoom, t } = this.props;

        // let participants = getRemoteParticipants(getState());

        return (
            <div className = { classes.container }>
                <h2>
                    {t('toolbar.userVideo.containerHeadline')}
                </h2>
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
                    <Checkbox
                        checked = { interpreter }
                        className = { classes.inputElement }
                        label = { t('toolbar.userVideo.interpreterHeadline') }
                        // eslint-disable-next-line react/jsx-no-bind
                        name = 'video-visibility-toggle'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { () =>
                            super._onChange({
                                interpreter: !interpreter
                            })
                        } />
                    <div className = { classes.description }>
                        {t('toolbar.userVideo.interpreterDescription')}
                    </div>
                    <Checkbox
                        checked = { screensharing }
                        className = { classes.inputElement }
                        label = { t('toolbar.userVideo.screensharingHeadline') }
                        // eslint-disable-next-line react/jsx-no-bind
                        name = 'video-visibility-toggle'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { () =>
                            super._onChange({
                                screensharing: !screensharing
                            })
                        } />
                    <div className = { classes.description }>
                        {t('toolbar.userVideo.screensharingDescription')}
                    </div>
                </div>
                <div className = { classes.controlContainer }>
                    <div className = { classes.controlColumn }>
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
                    </div>
                    <div className = { classes.valueColum } >
                        { contrast }%
                    </div>
                </div>
                <div className = { classes.controlContainer }>
                    <div className = { classes.controlColumn }>
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

                                // for (let p of participants.keys()) {
                                //     console.log(123456, p)
                                //     dispatch(setParticipantBrightness(p, brightness))
                                // };
                                })
                            }
                            step = { 1 } />
                    </div>
                    <div className = { classes.valueColum } >
                        { brightness }%
                    </div>
                </div>
                <div className = { classes.controlContainer }>
                    <div className = { classes.controlColumn }>
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
                    </div>
                    <div className = { classes.valueColum } >
                        { dimming }%
                    </div>
                </div>
                <div className = { classes.controlContainer }>
                    <div className = { classes.controlColumn }>
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
                    </div>
                    <div className = { classes.valueColum } >
                        { saturation }%
                    </div>
                </div>
                <div className = { classes.controlContainer }>
                    <div className = { classes.controlColumn }>
                        <Slider
                            className = { classes.inputElement }
                            defaultValue = { zoom }
                            label = { t('toolbar.userVideo.zoomSliderHeadline') }
                            max = { 200 }
                            min = { 0 }
                            name = 'zoom-slider'
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange = { event =>
                                super._onChange({
                                    zoom: event.target.value
                                })
                            }
                            step = { 1 } />
                    </div>
                    <div className = { classes.valueColum } >
                        { zoom }%
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(translate(UserVideoTab));
