import { connect } from 'react-redux';

import { translate } from '../../base/i18n/functions';
import { IconHelp } from '../../base/icons/svg';
import AbstractButton, { IProps as AbstractButtonProps } from '../../base/toolbox/components/AbstractButton';
import { toggleHelpDialogVisibility } from '../actions.web';

/**
 * Implements an {@link AbstractButton} to open the help dialog in a new window.
 */
class HelpButton extends AbstractButton<AbstractButtonProps> {
    accessibilityLabel = 'toolbar.accessibilityLabel.help';
    icon = IconHelp;
    label = 'toolbar.help';
    tooltip = 'toolbar.help';

    /**
     * Handles clicking / pressing the button, and opens a new window with the help dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch } = this.props;

        dispatch(toggleHelpDialogVisibility());
    }
}

export default translate(connect()(HelpButton));
