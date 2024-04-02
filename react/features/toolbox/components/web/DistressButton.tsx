import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { translate } from '../../../base/i18n/functions';
import { IconSecurityOff, IconSecurityOn } from '../../../base/icons/svg';
import AbstractButton, { IProps as AbstractButtonProps } from '../../../base/toolbox/components/AbstractButton';
import { toggleInDistress } from '../../../inklusiva/sessiondata/actions';

const styles = () => {
    return {
        pendingContainer: {
            position: 'absolute' as const,
            bottom: '3px',
            right: '3px'
        }
    };
};

/**
 * The type of the React {@code Component} props of {@link AudioMuteButton}.
 */
interface IProps extends AbstractButtonProps {

    /**
     * The gumPending state from redux.
     */
    _inDistress: boolean;
}

/**
 * Component that renders a toolbar button for toggling audio mute.
 *
 * @augments AbstractAudioMuteButton
 */
class DistressButton extends AbstractButton<IProps> {
    icon = IconSecurityOff;
    label = 'Nofall-Knopf';
    tooltip = 'toolbar.enterFullScreen';
    accessibilityLabel = 'toolbar.accessibilityLabel.enterFullScreen';

    toggledIcon = IconSecurityOn;
    toggledLabel = 'Notfall-Knopf aktiv';
    toggledTooltip = 'toolbar.exitFullScreen';
    toggledAccessibilityLabel = 'toolbar.accessibilityLabel.exitFullScreen';

    /**
     * Initializes a new {@code AudioMuteButton} instance.
     *
     * @param {IProps} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: IProps) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onKeyboardShortcut = this._onKeyboardShortcut.bind(this);
        this._getTooltip = this._getLabel;
    }

    /**
     * Registers the keyboard shortcut that toggles the audio muting.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        // this.props.dispatch(registerShortcut({
        //     character: 'M',
        //     helpDescription: 'keyboardShortcuts.mute',
        //     handler: this._onKeyboardShortcut
        // }));
    }

    /**
     * Unregisters the keyboard shortcut that toggles the audio muting.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {
        // this.props.dispatch(unregisterShortcut('M'));
    }

    /**
     * Handles clicking the button, and toggles fullscreen.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(toggleInDistress());
    }

    /**
     * Indicates if audio is currently muted or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._inDistress;
    }

    /**
     * Creates an analytics keyboard shortcut event and dispatches an action to
     * toggle the audio muting.
     *
     * @private
     * @returns {void}
     */
    _onKeyboardShortcut() {
        // Ignore keyboard shortcuts if the audio button is disabled.
        if (this._isDisabled()) {
            return;
        }
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code AudioMuteButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _audioMuted: boolean,
 *     _disabled: boolean
 * }}
 */
function _mapStateToProps(state: IReduxState) {
    const inDistress = state['features/inklusiva/sessiondata']?.inDistress ?? false;

    return {
        _inDistress: inDistress
    };
}

export default withStyles(styles)(translate(connect(_mapStateToProps)(DistressButton)));
