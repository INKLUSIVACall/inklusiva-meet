import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../base/dialog/components/web/AbstractDialogTab';
import { WithTranslation } from 'react-i18next';
import { translate } from '../../base/i18n/functions';
import React from 'react';
import Checkbox from '../../base/ui/components/web/Checkbox';
import Slider from '../../base/ui/components/web/Slider';


import { isDistressBtnEnabled } from './functions.web';
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
        headlineContainer: {
            marginBottom: theme.spacing(3)
        },
        inputContainer: {
            marginBottom: theme.spacing(3)
        },
        contextContainer: {
            marginBottom: theme.spacing(5)
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
            message_text
        } = this.props;

        return (
        <div className={ classes.container}>
            <div className = { classes.inputblockContainer } >
                <div className={ classes.headlineContainer }>
                <b>Ich möchte einen Notfallbutton</b>
                </div>
                <div className={ classes.inputContainer }>
                        <Checkbox
                            label = "Notfallbutton aktivieren"
                            // eslint-disable-next-line react/jsx-no-bind
                            checked= { active }
                            onChange = { () => super._onChange({
                                active: !active
                            }) } />
                </div>
                    <div className={ classes.contextContainer }>
                        Der Notfallbutton ermöglicht einen sofortigen Einfluss auf die Audio- und Videoübertragung im meeting.
                        Einer bestimmten Begleitperson kann eine vorab geschriebene Nachricht übermittelt werden.
                    </div>
            </div>
            <div className = { classes.inputblockContainer }>
                <b className={ classes.headline }>Aktionen nach dem Klick:</b>
                <div className={ classes.inputContainer }>
                    <Slider
                        label = "Kacheln dimmen"
                        min = { 0 }
                        max = { 100 }
                        step = { 1 }
                        defaultValue = { dimming }
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { (event) => super._onChange({
                            dimming: event.target.value
                        }) } />
                </div>
                <div className={ classes.inputContainer }>
                    <Slider
                        label = "Lautstärke anpassen"
                        min = { 0 }
                        max = { 100 }
                        step = { 1 }
                        defaultValue = { volume }
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { (event) => super._onChange({
                            volume: event.target.value
                        }) } />
                    </div>    
            </div>
            <div className={ classes.inputblockContainer }>
                <div className={ classes.inputContainer }>
                        <Checkbox
                            label = "Nachricht versenden"
                            // eslint-disable-next-line react/jsx-no-bind
                            checked= { message }
                            onChange = { () => super._onChange({
                                message: !message
                            }) } />
                </div>
                <div className={ classes.contextContainer }>
                    Nach dem Klick auf den Notfallbutton wird eine private Nachricht an eine Begleitperson gesendet. 
                    Vorerst ist das der Moderator.
                    Im Meeting kann eine bevorzugte Begleitperson eingestellt werden.
                </div>
                <b className={ classes.headline }>Nachricht verfassen </b>
                Hier eine Textarea vom Mui einfügen
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
