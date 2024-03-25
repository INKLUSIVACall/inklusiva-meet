import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { isIosMobileBrowser } from '../../../base/environment/utils';
import { translate } from '../../../base/i18n/functions';
import { IconHandHoldingHand } from '../../../base/icons/svg';
import AbstractButton, { IProps as AbstractButtonProps } from '../../../base/toolbox/components/AbstractButton';
import { toggleRoleMatchingPanel } from '../../actions.web';
import { toggleAssistancePanel } from '../../../inklusiva/rolematching/functions';

interface IProps extends AbstractButtonProps {

    /**
     * Whether or not the popup is open.
     */
    _isOpen?: boolean;
}

/**
 * Implementation of a button for toggling fullscreen state.
 */
class RoleMatchingButton extends AbstractButton<IProps> {
    accessibilityLabel = 'toolbar.accessibilityLabel.assistance';
    toggledAccessibilityLabel = 'toolbar.assistance';
    label = 'toolbar.assistance';
    toggledLabel = 'toolbar.assistance';
    tooltip = 'toolbar.assistance';
    toggledTooltip = 'toolbar.assistance';
    toggledIcon = IconHandHoldingHand;
    icon = IconHandHoldingHand;

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._isOpen;
    }

    /**
     * Handles clicking the button, and toggles fullscreen.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch } = this.props;

        dispatch(toggleRoleMatchingPanel());
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
const mapStateToProps = (state: IReduxState) => {
    return {
        _fullScreen: state['features/toolbox'].fullScreen,
        visible: !isIosMobileBrowser()
    };
};

export default translate(connect(mapStateToProps)(RoleMatchingButton));
