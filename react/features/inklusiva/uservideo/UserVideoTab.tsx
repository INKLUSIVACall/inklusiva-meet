import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../base/dialog/components/web/AbstractDialogTab';
import { translate } from '../../base/i18n/functions';
import Slider from '../../base/ui/components/web/Slider';


/**
 * The type of the React {@code Component} props of {@link UserVideoTab}.
 */
export interface IProps extends AbstractDialogTabProps, WithTranslation {

    /**
     * CSS classes object.
     */
    classes: any;

    /**
     * Contrast value for user videos.
     */
    contrast: number;

    /**
     * The currently selected language to display in the language select
     * dropdown.
     */
    currentLanguage: string;

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
        }
    };
};

/**
 * React {@code Component} for modifying the user's video settings.
 *
 * @augments Component
 */
class UserVideoTab extends AbstractDialogTab<IProps, any> {
    /**
     * Initializes a new {@code UserVideoTab} instance.
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

        const { classes, t } = this.props;

        return (
            <div className = { classes.container }>
                <div className = { classes.inputblockContainer }>
                    <b className = { classes.headline }>
                        {t('toolbar.userVideo.containerHeadline')}
                    </b>
                </div>
                <div className = { classes.inputblockContainer }>
                    <b className = { classes.headline }>
                        {t('toolbar.userVideo.contrastSliderHeadline')}
                    </b>
                    <Slider
                        className = { classes.inputElement }
                        defaultValue = { 50 }
                        label = { t('toolbar.userVideo.contrastSliderHeadline') }
                        max = { 100 }
                        min = { 0 }
                        name = 'contrast-slider'
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange = { event =>
                            super._onChange({
                                contrast: event.target.value
                            })
                        }
                        step = { 1 } />
                </div>
            </div>

        );
    }
}

// export default translate(UserVideoTab);

export default withStyles(styles)(translate(UserVideoTab));
