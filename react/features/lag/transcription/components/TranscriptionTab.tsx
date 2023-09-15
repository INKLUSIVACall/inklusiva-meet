import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../../base/dialog/components/web/AbstractDialogTab';
import { WithTranslation } from 'react-i18next';
import { translate } from '../../../base/i18n/functions';
import React from 'react';
import Checkbox from '../../../base/ui/components/web/Checkbox';
import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
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
     *  determines how large fonts will be displayed
     */
    fontSize: number;

    /**
     * history (text length value), subtitle speed
    */
    history: number;

    /**
     * CSS classes object.
     */
    classes: any;

    /**
     * The currently selected language to display in the language select
     * dropdown.
     */
    currentLanguage: string;
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
        const{
            active,
            classes,
            fontSize,
            history,
            t            
        } = this.props;

        let textlength = t("toolbar.transcription.history_textlength_long")
        
        if(history >= 0 && history < 50){
            textlength = t("toolbar.transcription.history_textlength_short")
        }else if (history >= 50 && history <75){
            textlength = t("toolbar.transcription.history_textlength_medium")
        }else {
            textlength = t("toolbar.transcription.history_textlength_long")
        }

        return (
            <div className={ classes.tabcontainer }>
                <b className={ classes.headline }>{t("toolbar.transcription.btn_engage_headline")}</b>
                <div className={classes.description} id="btn_engage_desc" aria-hidden="true">
                {t("toolbar.transcription.btn_engage_desc")}
                </div>

                <div className={ classes.inputblockContainer }>              
                    <Checkbox
                    className={ classes.inputElement }
                    checked={active}
                    label={t("toolbar.transcription.btn_engage_label")}
                    onChange={ () => super._onChange({
                        active: !active
                    })} />
                </div>

                <div className={ classes.inputblockContainer }>
                    <Slider
                    className={ classes.inputElement }
                    label = {t("toolbar.transcription.fontsize_label")}
                    min = { 0 }
                    max = { 200 }
                    step = { 1 }
                    defaultValue = { fontSize }
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange = { (event) => super._onChange({
                        fontSize: event.target.value
                    }) } />
                    <span>{ fontSize }%</span>
                </div>
                
                <div className={ classes.inputblockContainer }>
                    <Slider
                    className={ classes.inputElement }
                    label = {t("toolbar.transcription.history_label")}
                    min = { 0 }
                    max = { 100 }
                    step = { 1 }
                    defaultValue = { history }
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange = { (event) => {
                        super._onChange({
                            history: event.target.value
                        });                      
                    } } />
                    <span>{ textlength }</span>
                </div>
            </div>
            );
    }
}


export default (withStyles(styles)(translate(TranscriptionTab)));