import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../base/dialog/components/web/AbstractDialogTab';
import { WithTranslation } from 'react-i18next';
import { translate } from '../../base/i18n/functions';
import React from 'react';
import Checkbox from '../../base/ui/components/web/Checkbox';
import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import Slider from '../../base/ui/components/web/Slider';


/**
 * The type of the React {@code Component} props of {@link SignLangTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

    /**
     * Whether or not SignLang is enabled.
     */
    active: boolean;

    /**
     * Displaytype
     */
    display: string;

    /**
     * windowsize
     */
    windowSize: number;

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


class SignLangTab extends AbstractDialogTab<IProps, any> {
    /**
     * Initializes a new {@code SignLangTab} instance.
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
            display,
            windowSize,
            t
        } = this.props;


        return (
            <div className={ classes.tabcontainer }>
                <b className={ classes.headline }>{t("toolbar.signlangtab.btn_engage_headline")}</b>
                <div className={classes.description} id="btn_engage_desc" aria-hidden="true">
                {t("toolbar.signlangtab.btn_engage_desc")}
                </div>

                <div className={ classes.inputblockContainer }>              
                    <Checkbox
                    className={ classes.inputElement }
                    checked={active}
                    label={t("toolbar.signlangtab.btn_engage_label")}
                    onChange={ () => super._onChange({
                        active: !active
                    })} />
                </div>

                <b id="display_headline" className={ classes.headline }>{t("toolbar.signlangtab.display_headline")}</b>
                <div className={ classes.inputblockContainer }>
                    
                    <div role='radiogroup' aria-labelledby='display_headline'>
                        <input id="opt1" 
                        type='radio' 
                        className='radio' 
                        name="display_radiogroup" 
                        value="window"
                        checked={ display === "window" }
                        onChange={ (event) => super._onChange({
                            display: event.target.value
                        })} />

                        <label htmlFor="opt1">{t("toolbar.signlangtab.display_option1")}</label>
                        <input id="opt2" 
                        type='radio' 
                        className='radio' 
                        name="display_radiogroup" 
                        value="tile"
                        checked={ display === "tile" }
                        onChange={ (event) => super._onChange({
                            display: event.target.value
                        })} />
                        <label htmlFor='opt2'>{t("toolbar.signlangtab.display_option2")}</label>
                    </div>
                </div>

                    <b className={ classes.headline }>{t("toolbar.signlangtab.windowsize_headline")}</b>
                <div className={ classes.inputblockContainer }>
                    <Slider
                    className={ classes.inputElement }
                    label = {t("toolbar.signlangtab.windowsize_label")}
                    min = { 0 }
                    max = { 100 }
                    step = { 1 }
                    defaultValue = { windowSize }
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange = { (event) => super._onChange({
                        windowSize: event.target.value
                    }) } />
                </div>
            </div>
            );
    }
}


export default (withStyles(styles)(translate(SignLangTab)));
// falls styles vorhanden (siehe MoreTab):
// export default withStyles(styles)(translate(NewTab));
