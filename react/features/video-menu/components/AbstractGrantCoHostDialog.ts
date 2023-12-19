import { Component } from 'react';
import { WithTranslation } from 'react-i18next';

import { createRemoteVideoMenuButtonEvent } from '../../analytics/AnalyticsEvents';
import { sendAnalytics } from '../../analytics/functions';
import { IReduxState, IStore } from '../../app/types';
import { addIcRole, grantModerator } from '../../base/participants/actions';
import { getParticipantById } from '../../base/participants/functions';
import { IC_ROLES } from '../../base/conference/icRoles';

interface IProps extends WithTranslation {

    /**
     * The Redux dispatch function.
     */
    dispatch: IStore['dispatch'];

    /**
     * The ID of the remote participant to be granted co-host rights.
     */
    participantID: string;

    /**
     * The name of the remote participant to be granted co-host rights.
     */
    participantName?: string;
}

/**
 * Abstract dialog to confirm granting co-host to a participant.
 */
export default class AbstractGrantCoHostDialog
    extends Component<IProps> {
    /**
     * Initializes a new {@code AbstractGrantCoHostDialog} instance.
     *
     * @inheritdoc
     */
    constructor(props: IProps) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
    }

    /**
     * Callback for the confirm button.
     *
     * @private
     * @returns {boolean} - True (to note that the modal should be closed).
     */
    _onSubmit() {
        const { dispatch, participantID } = this.props;

        sendAnalytics(createRemoteVideoMenuButtonEvent(
            'grant.moderator.button',
            {
                'participant_id': participantID
            }));

        dispatch(grantModerator(participantID));
        dispatch(addIcRole(participantID, IC_ROLES.COHOST));

        return true;
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code AbstractGrantCoHostDialog}'s props.
 *
 * @param {IReduxState} state - The redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component.
 * @returns {IProps}
 */
export function abstractMapStateToProps(state: IReduxState, ownProps: IProps) {

    return {
        participantName: getParticipantById(state, ownProps.participantID)?.name
    };
}
