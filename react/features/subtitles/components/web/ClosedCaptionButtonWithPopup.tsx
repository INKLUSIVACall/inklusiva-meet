import React, { Component } from 'react';
import { WithTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import ClosedCaptionButton from './ClosedCaptionButton';
import ClosedCaptionButtonPopup from './ClosedCaptionButtonPopup';
import { IReduxState, IStore } from '../../../app/types';
import { isMobileBrowser } from '../../../base/environment/utils';
import { translate } from '../../../base/i18n/functions';
import { IconArrowUp, IconBubble } from '../../../base/icons/svg';
import JitsiMeetJS from '../../../base/lib-jitsi-meet';
import { IGUMPendingState } from '../../../base/media/types';
import ToolboxButtonWithIcon from '../../../base/toolbox/components/web/ToolboxButtonWithIcon';
import { toggleClosedCaptionPopup } from '../../actions.web';
import { getClosedCaptionVisibility } from '../../functions';


interface IProps extends WithTranslation {

    /**
     * The button's key.
     */
    buttonKey: string;

    /**
     * The gumPending state from redux.
     */
    gumPending: IGUMPendingState;

    /**
     * External handler for click action.
     */
    handleClick: Function;
    
    /**
     * Defines whether popup is open.
     */
    isOpen: boolean;

    /**
     * The selected language from the redux state.
     */
    language: string;

    /**
     * Click handler for the small icon. Opens audio options.
     */
    onCCOptionsClick: Function;

    /**
     * Whether subtitles are enabled.
     */
    requestingSubtitles: boolean;

    /**
     * Flag controlling the visibility of the button.
     */
    visible: boolean;
}

/**
 * Button used for cc settings.
 *
 * @returns {ReactElement}
 */
class ClosedCaptionButtonWithPopup extends Component<IProps> {
    /**
     * Initializes a new {@code ClosedCaptionButtonWithPopup} instance.
     *
     * @inheritdoc
     */
    constructor(props: IProps) {
        super(props);

        this._onEscClick = this._onEscClick.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    /**
     * Click handler for the more actions entries.
     *
     * @param {KeyboardEvent} event - Esc key click to close the popup.
     * @returns {void}
     */
    _onEscClick(event: React.KeyboardEvent) {
        if (event.key === 'Escape' && this.props.isOpen) {
            event.preventDefault();
            event.stopPropagation();
            this._onClick();
        }
    }

    /**
     * Click handler for the more actions entries.
     *
     * @param {MouseEvent} e - Mouse event.
     * @returns {void}
     */
    _onClick(e?: React.MouseEvent) {
        const { onCCOptionsClick, isOpen } = this.props;

        if (isOpen) {
            e?.stopPropagation();
        }
        onCCOptionsClick();
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { buttonKey, gumPending, isOpen, language, requestingSubtitles, visible, t } = this.props;

        return visible ? (
            <ClosedCaptionButtonPopup>
                <ToolboxButtonWithIcon
                    ariaControls = 'toolbar.accessibilityLabel.ccHistory'
                    ariaExpanded = { isOpen }
                    ariaHasPopup = { true }
                    ariaLabel = { t('toolbar.accessibility.ccHistory') }
                    buttonKey = { buttonKey }
                    icon = { IconArrowUp }
                    iconDisabled = { false }
                    iconId = 'closed-caption-button-icon'
                    iconTooltip = { t('toolbar.ccHistory') }
                    onIconClick = { this._onClick }>
                    <ClosedCaptionButton
                        _language = { language }
                        _requestingSubtitles = { requestingSubtitles }
                        _subtitles = { language }/>
                </ToolboxButtonWithIcon>
            </ClosedCaptionButtonPopup>
        ) : <ClosedCaptionButton
                _language = { language }
                _requestingSubtitles = { requestingSubtitles }
                _subtitles = { language }/>
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
function mapStateToProps(state: IReduxState) {
    const { isNarrowLayout } = state['features/base/responsive-ui'];
    const { gumPending } = state['features/base/media'].audio;

    return {
        gumPending,
        isOpen: Boolean(getClosedCaptionVisibility(state)),
        visible: !isMobileBrowser() && !isNarrowLayout
    };
}

const mapDispatchToProps = {
    onCCOptionsClick: toggleClosedCaptionPopup
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(ClosedCaptionButtonWithPopup));
