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
 * The type of the React {@code Component} props of {@link SignLangTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

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
     * Whether or not SignLang is enabled.
     */
    signLangActive: boolean;

    /**
     * Displaytype.
     */
    signLangDisplay: string;

    /**
     * Windowsize.
     */
    signLangWindowSize: number;

    /**
     * Whether or not Transcription is enabled.
     */
    transcriptionActive: boolean;

    /**
     * Font-size of the transcription.
     */
    transcriptionFontSize: number;

    /**
     * History (text length value), subtitle speed.
     */
    transcriptionHistory: number;
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
            marginBottom: theme.spacing(1)
        },
        description: {
            marginBottom: theme.spacing(3),
            fontSize: '0.875rem'
        },
        ...inklusivaSettingsStyles(theme)
    };
};

class SignLangTranscriptionTab extends AbstractDialogTab<IProps, any> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            transcriptionActive,
            transcriptionFontSize,
            transcriptionHistory,
            classes,
            signLangDisplay,
            signLangWindowSize,
            t
        } = this.props;

        const getSizeDescription = (size: number) => t(`settings.uiSettings.fontSizes.size${size}`);
        const getLengthDescription = (size: number) => t(`settings.uiSettings.length.size${size}`);

        return (
            <div className = { classes.container }>
                <h2>{t('settings.transcription.headline')}</h2>
                <p className = 'mt-05'>
                    {t('settings.transcription.intro')}
                </p>
                <h3>{t('settings.transcription.headlineDisplay')} </h3>

                <div className = { classes.controlContainer }>
                    <div className = { [ classes.controlColumn, classes.flexDirectionRow ].join(' ') }>
                        <input
                            checked = { signLangDisplay === 'window' }
                            className = 'radio'
                            id = 'opt1'
                            name = 'display_radiogroup'
                            onChange = { event =>
                                super._onChange({
                                    signLangDisplay: event.target.value
                                })
                            }
                            type = 'radio'
                            value = 'window' />
                        <label
                            className = { classes.controlColumnLabel }
                            htmlFor = 'opt1'>
                            {t('settings.transcription.display_option1')}
                        </label>
                    </div>
                </div>
                <div className = { classes.controlContainer }>
                    <div className = { [ classes.controlColumn, classes.flexDirectionRow ].join(' ') }>
                        <input
                            checked = { signLangDisplay === 'tile' }
                            className = 'radio'
                            id = 'opt2'
                            name = 'display_radiogroup'
                            onChange = { event =>
                                super._onChange({
                                    signLangDisplay: event.target.value
                                })
                            }
                            type = 'radio'
                            value = 'tile' />
                        <label
                            className = { classes.controlColumnLabel }
                            htmlFor = 'opt2'>
                            {t('settings.transcription.display_option2')}
                        </label>
                    </div>
                </div>

                <div className = { [ classes.controlContainer, 'mt-1' ].join(' ') }>
                    <div className = { classes.controlColumn }>
                        <Slider
                            className = { classes.inputElement }
                            defaultValue = { signLangWindowSize }
                            label = { t('settings.transcription.windowsize_label') }
                            max = { 100 }
                            min = { 0 }
                            onChange = { event =>
                                super._onChange({
                                    signLangWindowSize: event.target.value
                                })
                            }
                            step = { 1 } />
                    </div>
                    <div className = { classes.valueColumn }>{signLangWindowSize}%</div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(translate(SignLangTranscriptionTab));
