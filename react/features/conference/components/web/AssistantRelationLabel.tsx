import React, { ReactElement } from 'react';
import { connect, useSelector } from 'react-redux';

import { IReduxState, IStore } from '../../../app/types';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { IconChatUnread, IconHandHoldingHand } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import {
    getLocalParticipant,
    getParticipantWithICRoleAndPartner,
    getRemoteParticipants,
    participantHasRole
} from '../../../base/participants/functions';
import { IParticipant } from '../../../base/participants/types';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { openChat } from '../../../chat/actions.web';
import { createBreakoutRoom } from '../../../breakout-rooms/actions';
import { getBreakoutRooms } from '../../../breakout-rooms/functions';
import { IStateful } from '../../../base/app/types';

/**
 * The type of the React {@code Component} props of {@link AssistantRelationLabel}.
 */
interface IProps {

    /**
     * Redux dispatch function.
     */
    dispatch: IStore['dispatch'];

    /**
     * The function to get the participant with a specific IC role and partner.
     *
     * @param {string} role - The IC role.
     * @param {string} partnerId - The partner ID.
     * @returns {IParticipant | undefined}
     */
    getParticipantWithICRoleAndPartner: Function;

    /**
     * The local participant.
     */
    localParticipant?: IParticipant;

    /**
     * The function to check if a participant has a specific role.
     *
     * @param {string} participantId - The ID of the participant.
     * @param {string} role - The role to check.
     * @returns {boolean}
     */
    participantHasRole: Function;


    /**
     * The remote participants.
     */
    remoteParticipants?: Map<string, IParticipant>;
}

/**
 * Label for the conference name.
 *
 * @param {IProps} props - The props of the component.
 * @returns {ReactElement}
 */
const AssistantRelationLabel = (props: IProps): ReactElement => {
    const dispatch = props.dispatch;

    let labelText: string | undefined;
    let tooltipText = '';
    let visible = false;
    let otherParticipant: IParticipant | undefined;

    const localId = props.localParticipant?.id;

    if (props.participantHasRole(localId, IC_ROLES.ASSISTED)) {
        const rolePartner = props.getParticipantWithICRoleAndPartner(
            IC_ROLES.ASSISTANT,
            props.localParticipant ? localId : ''
        );

        if (rolePartner === undefined) {
            tooltipText = 'Warte auf Assistenz';
            labelText = 'Warte auf Assistenz';
        } else {
            labelText = rolePartner?.name ?? '';
            tooltipText = `Ich werde von ${labelText} betreut`;
        }
        visible = true;
        otherParticipant = rolePartner;
    }

    if (props.participantHasRole(localId, IC_ROLES.ASSISTANT)) {
        const assistantRoleDefinition = (props.localParticipant?.icRoles ?? []).find(
            role => role.name === IC_ROLES.ASSISTANT
        );

        if (props.participantHasRole(assistantRoleDefinition?.partner ?? undefined, IC_ROLES.ASSISTED)) {
            const assistedParticipant = props.remoteParticipants?.get(assistantRoleDefinition?.partner ?? '');

            tooltipText = `${assistedParticipant?.name} wird von mir betreut`;
            labelText = assistedParticipant?.name ?? '';
            visible = true;
            otherParticipant = assistedParticipant;
        }
    }

    /**
     * OnClick handler for opening the private chat between the two participants.
     *
     * @returns {void}
     */
    const openPrivateChat = () => {
        dispatch(openChat(otherParticipant));
    };

    const openBreakoutRoom = () => {
        dispatch(createBreakoutRoom());
    };

    let buttons = <></>;

    if (otherParticipant) {
        buttons = (
            <>
                <Label
                    accessibilityText = { tooltipText }
                    className = { 'icLabelTransparent' }
                    icon = { IconChatUnread }
                    iconColor = '#fff'
                    id = 'assistantRelationLabel'
                    onClick = { openPrivateChat } />
                <Label
                    accessibilityText = { tooltipText }
                    className = { 'icLabelTransparent' }
                    icon = { IconHandHoldingHand }
                    iconColor = '#fff'
                    id = 'assistantRelationLabel'
                    onClick = { openBreakoutRoom } />
            </>
        );
    }

    return visible ? (
        <>
            <Tooltip
                content = { tooltipText }
                position = 'bottom'>
                <Label
                    accessibilityText = { tooltipText }
                    className = { 'icLabelTransparent' }
                    icon = { IconHandHoldingHand }
                    iconColor = '#fff'
                    id = 'assistantRelationLabel'
                    text = { labelText } />
            </Tooltip>
            { buttons }
        </>
    ) : <></>;
};

const mapStateToProps = (state: IReduxState) => {
    return {
        remoteParticipants: getRemoteParticipants(state),
        localParticipant: getLocalParticipant(state),
        participantHasRole: (participantId: string, role: string) =>
            participantHasRole(state, participantId, role),
        getParticipantWithICRoleAndPartner: (role: string, partnerId: string) =>
            getParticipantWithICRoleAndPartner(state, role, partnerId)
    };
};


export default connect(mapStateToProps)(AssistantRelationLabel);
