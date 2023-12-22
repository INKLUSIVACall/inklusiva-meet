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
    message_text: string;

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
            padding: '0 2px',
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
        inputblockContainer: {
            marginBottom: theme.spacing(5),
            fontSize: '0.875rem'
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

class DistressBtnTab extends AbstractDialogTab<IProps, any> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { classes, active, dimming, volume, message, message_text, t } = this.props;

        return (
            <div className = { classes.container }>
                <h2>{t('toolbar.distressbtn.btn_engage_headline')}</h2>
                <Checkbox
                    checked = { active }
                    className = { classes.inputElement }
                    label = { t('toolbar.distressbtn.btn_engage_label') }
                    name = 'distressbtn_enable'
                    onChange = { () =>
                        super._onChange({
                            active: !active
                        })
                    } />

                <div className = { classes.description }>{t('toolbar.distressbtn.btn_engage_desc')}</div>

                <h3>{t('toolbar.distressbtn.sliders_headline')}</h3>

                <div className = { classes.controlContainer }>
                    <div className = { classes.controlColumn }>
                        <Slider
                            className = { classes.inputElement }
                            defaultValue = { dimming }
                            label = { t('toolbar.distressbtn.dimlights_label') }
                            max = { 100 }
                            min = { 0 }
                            onChange = { event =>
                                super._onChange({
                                    dimming: event.target.value
                                })
                            }
                            step = { 1 } />
                    </div>
                    <div className = { classes.valueColum }>{dimming}%</div>
                </div>

                <div className = { classes.controlContainer }>
                    <div className = { classes.controlColumn }>
                        <Slider
                            className = { classes.inputElement }
                            defaultValue = { volume }
                            label = { t('toolbar.distressbtn.setvolume_label') }
                            max = { 100 }
                            min = { 0 }
                            onChange = { event =>
                                super._onChange({
                                    volume: event.target.value
                                })
                            }
                            step = { 1 } />
                    </div>
                    <div className = { classes.valueColum }>{volume}%</div>
                </div>
                <h3>{t('toolbar.distressbtn.message_headline')}</h3>

                <Checkbox
                    checked = { message }
                    className = { classes.inputElement }
                    label = { t('toolbar.distressbtn.messagebtn_enable_label') }
                    name = 'messagebtn_enable'
                    onChange = { () =>
                        super._onChange({
                            message: !message
                        })
                    } />

                <div className = { classes.description }>{t('toolbar.distressbtn.messagebtn_enable_desc')}</div>
                <div />
                <div
                    aria-hidden = 'true'
                    className = { classes.description }
                    id = 'textarea_desc'>
                    {t('toolbar.distressbtn.message_desc')}
                </div>
                <textarea
                    aria-describedby = 'textarea_desc'
                    aria-label = 'Notfallnachricht'
                    className = { classes.textareaElement }
                    defaultValue = { message_text }
                    id = 'distress_message'
                    onChange = { event =>
                        super._onChange({
                            message_text: event.target.value
                        })
                    }
                    placeholder = { message_text }
                    rows = { 3 } />
            </div>
        );
    }
}

export default withStyles(styles)(translate(DistressBtnTab));
