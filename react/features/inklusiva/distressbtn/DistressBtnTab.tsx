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
            fontSize: '1rem'
        },
        description: {
            marginBottom: theme.spacing(3),
            fontSize: '0.875rem'
        },
        inputblockContainer: {
            marginBottom: theme.spacing(5),
            fontSize: '0.875rem'
        }
    };
};

class DistressBtnTab extends AbstractDialogTab<IProps, any> {
    /**
     * Initializes a new {@code NotfallBtnTab} instance.
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
        const { classes, active, dimming, volume, message, message_text, t }
            = this.props;

        return (
            <div className = { classes.container }>
                <div className = { classes.inputblockContainer }>
                    <b className = { classes.headline }>
                        {t('toolbar.distressbtn.btn_engage_headline')}
                    </b>
                    <Checkbox
                        checked={active}
                        className={classes.inputElement}
                        onChange={() =>
                            super._onChange({
                                active: !active,
                            })
                        }
                        label={t("toolbar.distressbtn.btn_engage_label")}
                        // eslint-disable-next-line react/jsx-no-bind
                        name="distressbtn_enable"/>

                    <div className = { classes.description }>
                        {t('toolbar.distressbtn.btn_engage_desc')}
                    </div>
                </div>
                <div className = { classes.inputblockContainer }>
                    <b className = { classes.headline }>
                        {t('toolbar.distressbtn.sliders_headline')}
                    </b>
                    <Slider
                        className={classes.inputElement}
                        label={t("toolbar.distressbtn.dimlights_label")}
                        max={100}
                        min={0}
                        step={1}
                        defaultValue={dimming}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={(event) =>
                            super._onChange({
                                dimming: event.target.value,
                            })
                        }/>
                    <span>{dimming}%</span>

                    <Slider
                        className={classes.inputElement}
                        label={t("toolbar.distressbtn.setvolume_label")}
                        max={100}
                        min={0}
                        step={1}
                        defaultValue={volume}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={(event) =>
                            super._onChange({
                                volume: event.target.value,
                            })
                        }/>
                    <span>{volume}%</span>
                </div>
                <div className = { classes.inputblockContainer }>
                    <Checkbox
                        checked={message}
                        className={classes.inputElement}
                        onChange={() =>
                            super._onChange({
                                message: !message,
                            })
                        }
                        label={t("toolbar.distressbtn.messagebtn_enable_label")}
                        // eslint-disable-next-line react/jsx-no-bind
                        name="messagebtn_enable"/>

                    <div className = { classes.description }>
                        {t('toolbar.distressbtn.messagebtn_enable_desc')}
                    </div>
                    <div>
                        <b className = { classes.headline }>
                            {t('toolbar.distressbtn.message_headline')}{' '}
                        </b>
                    </div>
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
                        cols = { 35 }
                        defaultValue = { message_text }
                        id = 'distress_message'
                        onChange = { event =>
                            super._onChange({
                                message_text: event.target.value
                            })
                        }
                        placeholder = { message_text }
                        rows = { 10 } />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(translate(DistressBtnTab));
