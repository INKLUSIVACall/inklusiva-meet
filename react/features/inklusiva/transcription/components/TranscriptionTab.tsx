import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../../base/dialog/components/web/AbstractDialogTab';
import { translate } from '../../../base/i18n/functions';
import Checkbox from '../../../base/ui/components/web/Checkbox';
import Slider from '../../../base/ui/components/web/Slider';

/**
 * The type of the React {@code Component} props of {@link TranscriptionTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

    /**
     * Whether or not Transcription is enabled.
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
     *  Determines how large fonts will be displayed.
     */
    fontSize: number;

    /**
     * History (text length value), subtitle speed.
     */
    history: number;
}

const styles = (theme: Theme) => {
    return {
        tabcontainer: {
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
            fontWeight: 'bold',
            fontSize: '0.875rem'
        },
        textareaElement: {
            marginBottom: theme.spacing(1)
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

class TranscriptionTab extends AbstractDialogTab<IProps, any> {
    /**
     * Initializes a new {@code TranscriptionTab} instance.
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
        const { active, classes, fontSize, history, t } = this.props;

        let textlength = t('toolbar.transcription.history_textlength_long');

        if (history >= 0 && history < 50) {
            textlength = t('toolbar.transcription.history_textlength_short');
        } else if (history >= 50 && history < 75) {
            textlength = t('toolbar.transcription.history_textlength_medium');
        } else {
            textlength = t('toolbar.transcription.history_textlength_long');
        }

        return (
            <div className = { classes.tabcontainer }>
                <b className = { classes.headline }>{t('toolbar.transcription.btn_engage_headline')}</b>
                <div
                    aria-hidden = 'true'
                    className = { classes.description }
                    id = 'btn_engage_desc'>
                    {t('toolbar.transcription.btn_engage_desc')}
                </div>

                <div className = { classes.inputblockContainer }>
                    <Checkbox
                        checked = { active }
                        className = { classes.inputElement }
                        label = { t('toolbar.transcription.btn_engage_label') }
                        onChange = { () =>
                            super._onChange({
                                active: !active
                            })
                        } />
                </div>

                <div className = { classes.inputblockContainer }>
                    <Slider
                        id = 'fontsize-slider'
                        className = { classes.inputElement }
                        defaultValue = { fontSize }
                        label = { t('toolbar.transcription.fontsize_label') }
                        max = { 200 }
                        min = { 0 }
                        onChange = { event =>
                            super._onChange({
                                fontSize: event.target.value
                            })
                        }
                        step = { 1 } />
                    <span>{fontSize}%</span>
                </div>

                <div className = { classes.inputblockContainer }>
                    <Slider
                        id = 'history-slider'
                        className = { classes.inputElement }
                        defaultValue = { history }
                        label = { t('toolbar.transcription.history_label') }
                        max = { 100 }
                        min = { 0 }
                        onChange = { event => {
                            super._onChange({
                                history: event.target.value
                            });
                        } }
                        step = { 1 } />
                    <span>{textlength}</span>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(translate(TranscriptionTab));
