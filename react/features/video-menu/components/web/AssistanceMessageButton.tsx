import React, { Component } from 'react';
import { WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { IReduxState, IStore } from '../../../app/types';
import { getCurrentConference } from '../../../base/conference/functions';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { IJitsiConference } from '../../../base/conference/reducer';
import { translate } from '../../../base/i18n/functions';
import { IconHandHoldingHand } from '../../../base/icons/svg';
import { getParticipantById } from '../../../base/participants/functions';
import { IParticipant } from '../../../base/participants/types';
import ContextMenuItem from '../../../base/ui/components/web/ContextMenuItem';
import { setParticipant } from '../../../inklusiva/rolematching/functions';
import { NOTIFY_CLICK_MODE } from '../../../toolbox/constants';
import { IButtonProps } from '../../types';

interface IProps extends IButtonProps, WithTranslation {
    _conference?: IJitsiConference;

    /**
     * The participant to send the assistance message to.
     */
    _participant?: IParticipant;

    /**
     * Redux dispatch function.
     */
    dispatch: IStore['dispatch'];
}

/**
 * A custom implementation of the PrivateMessageButton specialized for
 * the web version of the remote video menu. When the web platform starts to use
 * the {@code AbstractButton} component for the remote video menu, we can get rid
 * of this component and use the generic button in the chat feature.
 */
class AssistanceMessageButton extends Component<IProps> {
    /**
     * Instantiates a new Component instance.
     *
     * @inheritdoc
     */
    constructor(props: IProps) {
        super(props);

        this._onClick = this._onClick.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { t } = this.props;

        return (
            <ContextMenuItem
                accessibilityLabel = { t('toolbar.accesibilityLabel.assistanceMessage') }
                icon = { IconHandHoldingHand }
                onClick = { this._onClick }
                text = { t('toolbar.assistanceMessage') } />
        );
    }

    /**
     * Callback to be invoked on pressing the button.
     *
     * @param {React.MouseEvent|undefined} e - The click event.
     * @returns {void}
     */
    _onClick() {
        const { _participant, dispatch, notifyClick, notifyMode, _conference } = this.props;

        notifyClick?.();
        if (notifyMode === NOTIFY_CLICK_MODE.PREVENT_AND_NOTIFY) {
            return;
        }

        if (_participant) {
            dispatch(setParticipant(_participant));
            _conference?.addLocalICRole(IC_ROLES.ASSISTED, _participant?.id);
        }
    }
}

/**
 * Maps part of the Redux store to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @param {IProps} ownProps - The own props of the component.
 * @returns {IProps}
 */
function _mapStateToProps(state: IReduxState, ownProps: any) {
    const { visible } = ownProps;
    const conference = getCurrentConference(state);

    return {
        _participant: getParticipantById(state, ownProps.participantID),
        _conference: conference,
        visible
    };
}

export default translate(connect(_mapStateToProps)(AssistanceMessageButton));
