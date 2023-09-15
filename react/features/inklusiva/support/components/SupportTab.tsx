import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../../base/dialog/components/web/AbstractDialogTab';
import { WithTranslation } from 'react-i18next';
import { translate } from '../../../base/i18n/functions';
import React from 'react';
import Checkbox from '../../../base/ui/components/web/Checkbox';
import { withStyles } from '@mui/styles';
import { Theme } from '@mui/material';

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

    /**
     *  eyesight string: blind, impaired, no support needed
     */
    eyesight: string; 

    /**
     *  hearing string: deaf, impaired, no support needed
    */
    hearing: string;

/**
 * Whether or not a screenreader is used
 */
    screenreader: boolean;

    /**
    *  whether or not client is highly sensitive
    */
    senses: boolean;

    /**
    * whether or not client has learning difficulties
    */
    learning_difficulties: boolean;

// ADDITIONAL STUFF 
// Will we use it, won't we use it? HOW will we use it? Nobody knows!
// Written down here just in case we'll need it later on

    /**
    * Whether or not the user is affected by dyslexia
    */
    dyslexia: boolean;

    /**
     *  Whether or not user is associated with sign language
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
            fontWeight: 'bold',
        },
        textareaElement: {
            marginBottom: theme.spacing(1),
        },
        description: {
            marginBottom: theme.spacing(3)
        },
        inputblockContainer: {
            marginBottom: theme.spacing(5)
        },
        warning:{
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

        const {
            classes,
            eyesight,
            hearing,
            screenreader,
            senses,
            learning_difficulties,
            t
        } = this.props;

        return (
        <div className={ classes.container}>

            <div className= { classes.warning }>
                <b>{t("toolbar.support.warning_headline") }</b>
                <p>{t("toolbar.support.warning_text")}</p>
            </div>

            <div className={ classes.inputblockContainer }>
                <fieldset>
                    <legend >
                        {t("toolbar.support.eyesight_headline")}
                    </legend>
                    <div role='radiogroup' aria-labelledby='eyesight_headline'>
                        <div>
                            <input id="opt1_eyesight_radiogroup" 
                            type='radio' 
                            className='radio' 
                            name="eyesight_radiogroup" 
                            value="blind"
                            checked={ eyesight === "blind" }
                            onChange={ (event) => super._onChange({
                                eyesight: event.target.value
                            })} />
                            <label htmlFor="opt1_eyesight_radiogroup">{t("toolbar.support.eyesight_option1_label")}</label>
                        </div>

                        <div>
                            <input id="opt2_eyesight_radiogroup" 
                            type='radio' 
                            className='radio' 
                            name="eyesight_radiogroup" 
                            value="visually_impaired"
                            checked={ eyesight === "visually_impaired" }
                            onChange={ (event) => super._onChange({
                                eyesight: event.target.value
                            })} />
                            <label htmlFor='opt2_eyesight_radiogroup'>{t("toolbar.support.eyesight_option2_label")}</label>
                        </div>
                        
                        <div>
                            <input id="opt3_eyesight_radiogroup" 
                            type='radio' 
                            className='radio' 
                            name="eyesight_radiogroup" 
                            value="normal"
                            checked={ eyesight === "normal" }
                            onChange={ (event) => super._onChange({
                                eyesight: event.target.value
                            })} />
                            <label htmlFor='opt3_eyesight_radiogroup'>{t("toolbar.support.eyesight_option3_label")}</label>
                        </div>

                    </div>
                </fieldset>
            </div>

            <div className={ classes.inputblockContainer }>
                <fieldset>
                    <legend >
                        {t("toolbar.support.hearing_headline")}
                    </legend>
                    <div role='radiogroup' aria-labelledby='hearing_headline'>
                        <div>
                            <input id="opt1_hearing_radiogroup" 
                            type='radio' 
                            className='radio' 
                            name="hearing_radiogroup" 
                            value="deaf"
                            checked={ hearing === "deaf" }
                            onChange={ (event) => super._onChange({
                                hearing: event.target.value
                            })} />
                            <label htmlFor="opt1_hearing_radiogroup">{t("toolbar.support.hearing_option1_label")}</label>
                        </div>

                        <div>
                            <input id="opt2_hearing_radiogroup" 
                            type='radio' 
                            className='radio' 
                            name="hearing_radiogroup" 
                            value="hard_of_hearing"
                            checked={ hearing === "hard_of_hearing" }
                            onChange={ (event) => super._onChange({
                                hearing: event.target.value
                            })} />
                            <label htmlFor='opt2_hearing_radiogroup'>{t("toolbar.support.hearing_option2_label")}</label>
                        </div>
                        
                        <div>
                            <input id="opt3_hearing_radiogroup" 
                            type='radio' 
                            className='radio' 
                            name="hearing_radiogroup" 
                            value="normal"
                            checked={ hearing === "normal" }
                            onChange={ (event) => super._onChange({
                                hearing: event.target.value
                            })} />
                            <label htmlFor='opt3_hearing_radiogroup'>{t("toolbar.support.hearing_option3_label")}</label>
                        </div>

                    </div>
                </fieldset>
            </div>

            <div className = { classes.inputblockContainer } >
                    <Checkbox
                        className={ classes.inputElement }
                        label = {t("toolbar.support.screenreader_label")}
                        // eslint-disable-next-line react/jsx-no-bind
                        name='screenreader_enable'
                        checked= { screenreader }
                        onChange = { () => super._onChange({
                            screenreader: !screenreader
                        }) } />
            </div>

            <div className={ classes.inputblockContainer }>
                <Checkbox
                    className={ classes.inputElement }
                    label = {t("toolbar.support.senses_label")}
                    // eslint-disable-next-line react/jsx-no-bind
                    name='senses_enable'
                    checked= { senses }
                    onChange = { () => super._onChange({
                        senses: !senses
                    }) } />
            </div>
            <div className={ classes.inputblockContainer }>
                <Checkbox
                    className={ classes.inputElement }
                    label = {t("toolbar.support.learning_difficulties_label")}
                    // eslint-disable-next-line react/jsx-no-bind
                    name='learning_difficulties_enable'
                    checked= { learning_difficulties }
                    onChange = { () => super._onChange({
                        learning_difficulties: !learning_difficulties
                    }) } />
            </div>
        </div>
        );
    }
}

export default (withStyles(styles)(translate(SupportTab)));
