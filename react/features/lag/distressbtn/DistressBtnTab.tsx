import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../base/dialog/components/web/AbstractDialogTab';
import { WithTranslation } from 'react-i18next';
import { translate } from '../../base/i18n/functions';
import React from 'react';
import Checkbox from '../../base/ui/components/web/Checkbox';
import Slider from '../../base/ui/components/web/Slider';
import { withStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { connect } from 'react-redux';

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
     *  Is distressbutton enabled?
     */
    active: boolean; 

    /**
     * tile dimming value for distress mode 
    */
    dimming: number;

    /**
    * volume value for distress mode
    */
    volume: number;

    /**
    * Is distress message enabled?
    */
    message: boolean;

    /**
    * the actual distress message
    */
    message_text: string;

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

        const {
            classes,
            active, 
            dimming, 
            volume, 
            message, 
            message_text,
            t
        } = this.props;

        return (
        <div className={ classes.container}>
            <div className = { classes.inputblockContainer } >
                <b className={ classes.headline }>{ t("toolbar.distressbtn.btn_engage_headline") }</b>
                        <Checkbox
                            className={ classes.inputElement }
                            label = {t("toolbar.distressbtn.btn_engage_label")}
                            // eslint-disable-next-line react/jsx-no-bind
                            name='distressbtn_enable'
                            checked= { active }
                            onChange = { () => super._onChange({
                                active: !active
                            }) } />
                
                    <div className={ classes.description }>
                        {t("toolbar.distressbtn.btn_engage_desc")}
                    </div>
            </div>
            <div className = { classes.inputblockContainer }>
                <b className={ classes.headline }>{t("toolbar.distressbtn.sliders_headline")}</b>
                    <Slider
                        className={ classes.inputElement }
                        label = {t("toolbar.distressbtn.dimlights_label")}
                        min = { 0 }
                        max = { 100 }
                        step = { 1 }
                        defaultValue = { dimming }
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { (event) => super._onChange({
                            dimming: event.target.value
                        }) } />
                
                
                    <Slider
                        className={ classes.inputElement }
                        label = {t("toolbar.distressbtn.setvolume_label")}
                        min = { 0 }
                        max = { 100 }
                        step = { 1 }
                        defaultValue = { volume }
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { (event) => super._onChange({
                            volume: event.target.value
                        }) } />
            </div>
            <div className={ classes.inputblockContainer }>
                        <Checkbox
                            className={ classes.inputElement }
                            label = {t("toolbar.distressbtn.messagebtn_enable_label")}
                            // eslint-disable-next-line react/jsx-no-bind
                            name='messagebtn_enable'
                            checked= { message }
                            onChange = { () => super._onChange({
                                message: !message
                            }) } />
                
                <div className={ classes.description}>
                    {t("toolbar.distressbtn.messagebtn_enable_desc")}
                </div>
                <div>
                <b className={ classes.headline }>{t("toolbar.distressbtn.message_headline")} </b>
                </div>
                <div className={classes.description} id="textarea_desc" aria-hidden="true">
                {t("toolbar.distressbtn.message_desc")}
                </div>
                <textarea id="distress_message"
                aria-label="Notfallnachricht"
                aria-describedby='textarea_desc'
                className={ classes.textareaElement }
                defaultValue= { message_text }
                placeholder={ message_text }
                onChange = {(event) => super._onChange({
                    message_text: event.target.value })}                
                    />
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state: IReduxState) => {
    return {
        active: state['features/base/devices'].availableDevices ?? {},
        
    };
};

export default (withStyles(styles)(translate(DistressBtnTab)));
