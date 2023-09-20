import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../../base/dialog/components/web/AbstractDialogTab';
import { translate } from '../../../base/i18n/functions';
import Checkbox from '../../../base/ui/components/web/Checkbox';


/**
 * The type of the React {@code Component} props of {@link OwnAudioTab}.
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

    // ADDITIONAL STUFF
// Will we use it, won't we use it? HOW will we use it? Nobody knows!
// Written down here just in case we'll need it later on
/**
     * Whether or not the user is affected by dyslexia.
     */
    dyslexia: boolean;

    /**
     *  Eyesight string: blind, impaired, no support needed.
     */
    eyesight: string;

    /**
     *  Hearing string: deaf, impaired, no support needed.
     */
    hearing: string;

    /**
     * Whether or not client has learning difficulties.
     */
    learning_difficulties: boolean;

    /**
     * Whether or not a screenreader is used.
     */
    screenreader: boolean;


    /**
     *  Whether or not client is highly sensitive.
     */
    senses: boolean;

    /**
     *  Whether or not user is associated with sign language.
     */
    signLang: boolean;
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
        warning: {
            height: '120px',
            width: '350px',
            backgroundColor: 'b6d7a8',
            color: 'black'
        }
    };
};

class SupportTab extends AbstractDialogTab<IProps, any> {
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
        const { classes, eyesight, hearing, screenreader, senses, learning_difficulties, t } = this.props;

        return (
            <div className = { classes.container }>
                <div className = { classes.warning }>
                    <b>{t('toolbar.support.warning_headline')}</b>
                    <p>{t('toolbar.support.warning_text')}</p>
                </div>

                <div className = { classes.inputblockContainer }>
                    <fieldset>
                        <legend>{t('toolbar.support.eyesight_headline')}</legend>
                        <div
                            aria-labelledby = 'eyesight_headline'
                            role = 'radiogroup'>
                            <div>
                                <input
                                    checked = { eyesight === 'blind' }
                                    className = 'radio'
                                    id = 'opt1_eyesight_radiogroup'
                                    name = 'eyesight_radiogroup'
                                    onChange = { event =>
                                        super._onChange({
                                            eyesight: event.target.value
                                        })
                                    }
                                    type = 'radio'
                                    value = 'blind' />
                                <label htmlFor = 'opt1_eyesight_radiogroup'>
                                    {t('toolbar.support.eyesight_option1_label')}
                                </label>
                            </div>

                            <div>
                                <input
                                    checked = { eyesight === 'visually_impaired' }
                                    className = 'radio'
                                    id = 'opt2_eyesight_radiogroup'
                                    name = 'eyesight_radiogroup'
                                    onChange = { event =>
                                        super._onChange({
                                            eyesight: event.target.value
                                        })
                                    }
                                    type = 'radio'
                                    value = 'visually_impaired' />
                                <label htmlFor = 'opt2_eyesight_radiogroup'>
                                    {t('toolbar.support.eyesight_option2_label')}
                                </label>
                            </div>

                            <div>
                                <input
                                    checked = { eyesight === 'normal' }
                                    className = 'radio'
                                    id = 'opt3_eyesight_radiogroup'
                                    name = 'eyesight_radiogroup'
                                    onChange = { event =>
                                        super._onChange({
                                            eyesight: event.target.value
                                        })
                                    }
                                    type = 'radio'
                                    value = 'normal' />
                                <label htmlFor = 'opt3_eyesight_radiogroup'>
                                    {t('toolbar.support.eyesight_option3_label')}
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className = { classes.inputblockContainer }>
                    <fieldset>
                        <legend>{t('toolbar.support.hearing_headline')}</legend>
                        <div
                            aria-labelledby = 'hearing_headline'
                            role = 'radiogroup'>
                            <div>
                                <input
                                    checked = { hearing === 'deaf' }
                                    className = 'radio'
                                    id = 'opt1_hearing_radiogroup'
                                    name = 'hearing_radiogroup'
                                    onChange = { event =>
                                        super._onChange({
                                            hearing: event.target.value
                                        })
                                    }
                                    type = 'radio'
                                    value = 'deaf' />
                                <label htmlFor = 'opt1_hearing_radiogroup'>
                                    {t('toolbar.support.hearing_option1_label')}
                                </label>
                            </div>

                            <div>
                                <input
                                    checked = { hearing === 'hard_of_hearing' }
                                    className = 'radio'
                                    id = 'opt2_hearing_radiogroup'
                                    name = 'hearing_radiogroup'
                                    onChange = { event =>
                                        super._onChange({
                                            hearing: event.target.value
                                        })
                                    }
                                    type = 'radio'
                                    value = 'hard_of_hearing' />
                                <label htmlFor = 'opt2_hearing_radiogroup'>
                                    {t('toolbar.support.hearing_option2_label')}
                                </label>
                            </div>

                            <div>
                                <input
                                    checked = { hearing === 'normal' }
                                    className = 'radio'
                                    id = 'opt3_hearing_radiogroup'
                                    name = 'hearing_radiogroup'
                                    onChange = { event =>
                                        super._onChange({
                                            hearing: event.target.value
                                        })
                                    }
                                    type = 'radio'
                                    value = 'normal' />
                                <label htmlFor = 'opt3_hearing_radiogroup'>
                                    {t('toolbar.support.hearing_option3_label')}
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className = { classes.inputblockContainer }>
                    <Checkbox
                        checked={screenreader}
                        className={classes.inputElement}
                        onChange={() =>
                            super._onChange({
                                screenreader: !screenreader
                            })
                        }
                        label={t('toolbar.support.screenreader_label')}
                        // eslint-disable-next-line react/jsx-no-bind
                        name="screenreader_enable"/>
                </div>

                <div className = { classes.inputblockContainer }>
                    <Checkbox
                        checked={senses}
                        className={classes.inputElement}
                        onChange={() =>
                            super._onChange({
                                senses: !senses
                            })
                        }
                        label={t('toolbar.support.senses_label')}
                        // eslint-disable-next-line react/jsx-no-bind
                        name="senses_enable"/>
                </div>
                <div className = { classes.inputblockContainer }>
                    <Checkbox
                        checked={learning_difficulties}
                        className={classes.inputElement}
                        onChange={() =>
                            super._onChange({
                                learning_difficulties: !learning_difficulties
                            })
                        }
                        label={t('toolbar.support.learning_difficulties_label')}
                        // eslint-disable-next-line react/jsx-no-bind
                        name="learning_difficulties_enable"/>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(translate(SupportTab));
