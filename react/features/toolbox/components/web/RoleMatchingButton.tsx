import { connect } from 'react-redux';

import { IReduxState, IStore } from '../../../app/types';
import { isIosMobileBrowser } from '../../../base/environment/utils';
import { translate } from '../../../base/i18n/functions';
import { IconUser } from '../../../base/icons/svg';
import AbstractButton, { IProps as AbstractButtonProps } from '../../../base/toolbox/components/AbstractButton';
import { toggleRoleMatchingMenuVisibility } from '../../../inklusiva/rolematching/actions';

interface IProps extends AbstractButtonProps {

    /**
     * Whether or not the popup is open.
     */
    _isOpen?: boolean;

    /**
     * Toggles the visibility of the popup.
     */
    _toggleVisibility: Function;

}

/**
 * Implementation of a button for toggling fullscreen state.
 */
class RoleMatchingButton extends AbstractButton<IProps> {
    accessibilityLabel = 'toolbar.accessibilityLabel.enterFullScreen';
    toggledAccessibilityLabel = 'toolbar.accessibilityLabel.exitFullScreen';
    label = 'toolbar.assistance';
    toggledLabel = 'toolbar.assistance';
    tooltip = 'toolbar.assistance';
    toggledTooltip = 'toolbar.assistance';
    toggledIcon = IconUser;
    icon = IconUser;

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
        this.props._toggleVisibility();
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

/**
 * Maps dispatching of some action to React component props.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @private
 * @returns {{
 *     _toggleVisibility: Function
 * }}
 */
const mapDispatchToProps = (dispatch: IStore['dispatch']) => {
    return {
        /**
         * Dispatches actions to store the last applied transform to a video.
         *
         * @private
         * @returns {void}
         */
        _toggleVisibility() {
            dispatch(toggleRoleMatchingMenuVisibility());
        }
    };
};


export default translate(connect(mapStateToProps, mapDispatchToProps)(RoleMatchingButton));
