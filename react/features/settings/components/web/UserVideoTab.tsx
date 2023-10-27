import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';

import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../../base/dialog/components/web/AbstractDialogTab';
import { translate } from '../../../base/i18n/functions';


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

}

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
        return (
            // Hier weitere Componenten einfügen die gerendert werden sollen.
            <div>Lorem ipsum dolor sit amet</div>
        );
    }
}

export default withStyles(styles)(translate(UseVideoTab));
