import AbstractDialogTab, {
    IProps as AbstractDialogTabProps
} from '../../../base/dialog/components/web/AbstractDialogTab';
import { WithTranslation } from 'react-i18next';
import { translate } from '../../../base/i18n/functions';
import React from 'react';
import { Checkbox } from '@mui/material';

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

    //ggf weitere Props, siehe andere Tabs...
}

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
        } = this.props;

        return (
            <div>
                hallo welt
            </div>
            );
    }
}

export default translate(SignLangTab);
// falls styles vorhanden (siehe MoreTab):
// export default withStyles(styles)(translate(NewTab));
