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
     * Whether the acoustic cues are enabled or not.
     */
    acousticCues: boolean;

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
     * The global FontSize modifier. Can range from 0-2 (representing the values klein, mittel, groß).
     */
    fontSize: number;

    /**
     * The global iconSize modifier. Can range from 0-2 (representing the values klein, mittel, groß).
     */
    iconSize: number;

    /**
     * Whether the visual cues are enabled or not.
     */
    visualCues: boolean;


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
            fontSize: '0.875rem'
        },
        textareaElement: {
            marginBottom: theme.spacing(1)
        },
        description: {
            marginBottom: theme.spacing(3)
        },
        inputblockContainer: {
            marginBottom: theme.spacing(5)
        }
    };
};

/**
 * React {@code Component} for modifying the user's UI settings.
 */
class UiSettingsTab extends AbstractDialogTab<IProps, any> {
    /**
     * Initializes a new {@code OwnAudioTab} instance.
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
        const { classes, fontSize, iconSize, visualCues, acousticCues, t } = this.props;

        return (
            <div className = { classes.container }>
                <div className = { classes.inputblockContainer }>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { fontSize }
                        label = { t('settings.uiSettings.fontSize') }
                        max = { 2 }
                        min = { 0 }
                        onChange = { event =>
                            super._onChange({
                                fontSize: parseInt(event.target.value, 10)
                            })
                        }
                        step = { 1 } />
                </div>
                <div className = { classes.inputblockContainer }>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { iconSize }
                        label = { t('settings.uiSettings.iconSize') }
                        max = { 2 }
                        min = { 0 }
                        onChange = { event =>
                            super._onChange({
                                iconSize: parseInt(event.target.value, 10)
                            })
                        }
                        step = { 1 } />
                </div>
                <div className = { classes.inputblockContainer }>
                    <div>
                        <b className = { classes.headline }>
                            {t('settings.uiSettings.acousticcues.headline')}
                        </b>
                    </div>
                    <Checkbox
                        checked = { acousticCues }
                        className = { classes.inputElement }
                        label = { t('settings.uiSettings.acousticcues.label') }
                        // eslint-disable-next-line react/jsx-no-bind
                        name = 'acousticcues_enable'
                        onChange = { () =>
                            super._onChange({
                                acousticCues: !acousticCues
                            })
                        } />

                    <div className = { classes.description }>
                        {t('settings.uiSettings.acousticcues.description')}
                    </div>
                </div>
                <div className = { classes.inputblockContainer }>
                    <div>
                        <b className = { classes.headline }>
                            {t('settings.uiSettings.visualcues.headline')}
                        </b>
                    </div>
                    <Checkbox
                        checked = { visualCues }
                        className = { classes.inputElement }
                        label = { t('settings.uiSettings.visualcues.label') }
                        // eslint-disable-next-line react/jsx-no-bind
                        name = 'visualcues_enable'
                        onChange = { () =>
                            super._onChange({
                                visualCues: !visualCues
                            })
                        } />

                    <div className = { classes.description }>
                        {t('settings.uiSettings.visualcues.description')}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(translate(UiSettingsTab));
