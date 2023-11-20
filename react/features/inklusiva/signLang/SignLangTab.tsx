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
 * The type of the React {@code Component} props of {@link SignLangTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

    /**
     * Whether or not SignLang is enabled.
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
     * Displaytype.
     */
    display: string;

    /**
     * Windowsize.
     */
    windowSize: number;
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
            fontWeight: 'bold'
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
        const { active, classes, display, windowSize, t } = this.props;

        return (
            <div className = { classes.tabcontainer }>
                <b className = { classes.headline }>{t('toolbar.signlangtab.btn_engage_headline')}</b>
                <div
                    aria-hidden = 'true'
                    className = { classes.description }
                    id = 'btn_engage_desc'>
                    {t('toolbar.signlangtab.btn_engage_desc')}
                </div>

                <div className = { classes.inputblockContainer }>
                    <Checkbox
                        checked = { active }
                        className = { classes.inputElement }
                        label = { t('toolbar.signlangtab.btn_engage_label') }
                        onChange = { () =>
                            super._onChange({
                                active: !active
                            })
                        } />
                </div>

                <div className = { classes.inputblockContainer }>
                    <fieldset>
                        <legend>{t('toolbar.signlangtab.display_headline')}</legend>
                        <div
                            aria-labelledby = 'display_headline'
                            role = 'radiogroup'>
                            <input
                                checked = { display === 'window' }
                                className = 'radio'
                                id = 'opt1'
                                name = 'display_radiogroup'
                                onChange = { event =>
                                    super._onChange({
                                        display: event.target.value
                                    })
                                }
                                type = 'radio'
                                value = 'window' />

                            <label htmlFor = 'opt1'>{t('toolbar.signlangtab.display_option1')}</label>
                            <input
                                checked = { display === 'tile' }
                                className = 'radio'
                                id = 'opt2'
                                name = 'display_radiogroup'
                                onChange = { event =>
                                    super._onChange({
                                        display: event.target.value
                                    })
                                }
                                type = 'radio'
                                value = 'tile' />
                            <label htmlFor = 'opt2'>{t('toolbar.signlangtab.display_option2')}</label>
                        </div>
                    </fieldset>
                </div>

                <div className = { classes.inputblockContainer }>
                    <Slider
                        className={classes.inputElement}
                        label={t('toolbar.signlangtab.windowsize_label')}
                        max={100}
                        min={0}
                        step={1}
                        defaultValue={windowSize}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={event =>
                            super._onChange({
                                windowSize: event.target.value
                            })
                        }/>
                    <span>{windowSize}%</span>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(translate(SignLangTab));

// falls styles vorhanden (siehe MoreTab):
// export default withStyles(styles)(translate(NewTab));
