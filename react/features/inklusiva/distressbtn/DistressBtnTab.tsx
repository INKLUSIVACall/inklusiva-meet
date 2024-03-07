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
import { inklusivaSettingsStyles } from '../ui-constants';

/**
 * The type of the React {@code Component} props of {@link OwnAudioTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

    /**
     *  Is distressbutton enabled?
     */
    active: boolean;

    /**
     * CSS classes object.
     */
    classes: any;

    /**
     * The currently selected language to display in the language select
     * dropdown.
     */
    currentLanguage: string;

    /**
     * Tile dimming value for distress mode.
     */
    dimming: number;

    /**
     * Is distress message enabled?
     */
    message: boolean;

    /**
     * The actual distress message.
     */
    messageText: string;

    /**
     * Volume value for distress mode.
     */
    volume: number;
}

const styles = (theme: Theme) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            width: '100%'
        },
        headline: {
            marginBottom: theme.spacing(3),
            fontSize: '0.875rem'
        },
        inputElement: {
            marginBottom: theme.spacing(1),
            fontWeight: 'bold'
        },
        textareaElement: {
            marginBottom: theme.spacing(1),
            fontSize: '1rem',
            width: '100%'
        },
        description: {
            marginBottom: theme.spacing(3),
            marginTop: theme.spacing(2),
            fontSize: '0.875rem',
            fontWeight: 'normal'
        },
        ...inklusivaSettingsStyles(theme)
    };
};

class DistressBtnTab extends AbstractDialogTab<IProps, any> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { classes, active, dimming, volume, message, messageText, t } = this.props;

        return (
            <div className = { classes.container }>
                <h2>{t('settings.distressbtn.btn_engage_headline')}</h2>
                <p className = 'mt-05'>{t('settings.distressbtn.intro')}</p>
                <h3>{t('settings.distressbtn.btn_engage_headline')}</h3>
                <Checkbox
                    checked = { active }
                    className = { classes.inputElement }
                    label = { t('settings.distressbtn.btn_engage_label') }
                    name = 'distressbtn_enable'
                    onChange = { () =>
                        super._onChange({
                            active: !active
                        })
                    } />
                <p className = 'mt-05'>{t('settings.distressbtn.btn_engage_desc')}</p>

                <h3>{t('settings.distressbtn.sliders_headline')}</h3>

                <div className = { classes.controlContainer }>
                    <div className = { classes.controlColumn }>
                        <Slider
                            id = 'dimming-slider'
                            className = { classes.inputElement }
                            defaultValue = { dimming }
                            label = { t('settings.distressbtn.dimlights_label') }
                            max = { 100 }
                            min = { 0 }
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
                            id = 'volume-slider'
                            className = { classes.inputElement }
                            defaultValue = { volume }
                            label = { t('settings.distressbtn.setvolume_label') }
                            max = { 100 }
                            min = { 0 }
                            onChange = { event =>
                                super._onChange({
                                    volume: event.target.value
                                })
                            }
                            step = { 1 } />
                    </div>
                    <div className = { classes.valueColumn }>{volume}%</div>
                </div>

                <div className = { classes.inputblockContainer }>
                    <div className = 'mt-15'>
                        <Checkbox
                            checked = { message }
                            className = { classes.inputElement }
                            label = { t('settings.distressbtn.messagebtn_enable_label') }
                            name = 'messagebtn_enable'
                            onChange = { () =>
                                super._onChange({
                                    message: !message
                                })
                            } />
                    </div>

                    <p className = 'mt-05'>{t('settings.distressbtn.messagebtn_enable_desc')}</p>
                    <textarea
                        aria-label = 'Notfallnachricht'
                        className = { classes.textareaElement }
                        defaultValue = { messageText }
                        id = 'distress_message'
                        onChange = { event =>
                            super._onChange({
                                messageText: event.target.value
                            })
                        }
                        placeholder = { t('settings.distressbtn.message_placeholder') }
                        rows = { 3 } />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(translate(DistressBtnTab));
