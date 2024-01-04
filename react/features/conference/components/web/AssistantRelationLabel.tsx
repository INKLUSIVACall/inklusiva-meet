import React, { ReactElement, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { IReduxState, IStore } from '../../../app/types';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { IconChatUnread, IconHandHoldingHand, IconShare } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import {
    getLocalParticipant,
    getParticipantWithICRoleAndPartner,
    getRemoteParticipants,
    participantHasRole
} from '../../../base/participants/functions';
import { IParticipant } from '../../../base/participants/types';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { createBreakoutRoom, moveToRoom, sendParticipantToRoom } from '../../../breakout-rooms/actions';
import { getBreakoutRooms } from '../../../breakout-rooms/functions';
import { IRoom } from '../../../breakout-rooms/types';
import { openChat } from '../../../chat/actions.web';

/**
 * The type of the React {@code Component} props of {@link AssistantRelationLabel}.
 */
interface IProps {

    /**
     * List of breakout rooms.
     */
    _breakoutRooms: IRoom[];

    /**
     * The function to get the participant with a specific IC role and partner.
     *
     * @param {string} role - The IC role.
     * @param {string} partnerId - The partner ID.
     * @returns {IParticipant | undefined}
     */
    _getParticipantWithICRoleAndPartner: Function;

    /**
     * The local participant.
     */
    _localParticipant?: IParticipant;

    /**
     * The function to check if a participant has a specific role.
     *
     * @param {string} participantId - The ID of the participant.
     * @param {string} role - The role to check.
     * @returns {boolean}
     */
    _participantHasRole: Function;

    /**
     * The remote participants.
     */
    _remoteParticipants?: Map<string, IParticipant>;
}

/**
 * Label for the conference name.
 *
 * @param {IProps} props - The props of the component.
 * @returns {ReactElement}
 */
const AssistantRelationLabel = ({
    _breakoutRooms,
    _localParticipant,
    _remoteParticipants,
    _participantHasRole,
    _getParticipantWithICRoleAndPartner
}: IProps): ReactElement => {
    const dispatch: IStore['dispatch'] = useDispatch();
    let labelText: string | undefined;
    let tooltipText = '';
    let visible = false;
    let otherParticipant: IParticipant | undefined;

    const localId = _localParticipant?.id;

    if (_participantHasRole(localId, IC_ROLES.ASSISTED)) {
        const rolePartner = _getParticipantWithICRoleAndPartner(IC_ROLES.ASSISTANT, _localParticipant ? localId : '');

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

    if (_participantHasRole(localId, IC_ROLES.ASSISTANT)) {
        const assistantRoleDefinition = (_localParticipant?.icRoles ?? []).find(
            role => role.name === IC_ROLES.ASSISTANT
        );

        if (_participantHasRole(assistantRoleDefinition?.partner ?? undefined, IC_ROLES.ASSISTED)) {
            const assistedParticipant = _remoteParticipants?.get(assistantRoleDefinition?.partner ?? '');

            tooltipText = `${assistedParticipant?.name} wird von mir betreut`;
            labelText = assistedParticipant?.name ?? '';
            visible = true;
            otherParticipant = assistedParticipant;
        }
    }
    visible = true;

    /**
     * OnClick handler for opening the private chat between the two participants.
     *
     * @returns {void}
     */
    const openPrivateChat = () => {
        dispatch(openChat(otherParticipant));
    };

    const breakoutRoomName = '_private_';

    useEffect(() => {
        // iterate over all breakout rooms and check if there is a breakout room with the name
        const breakoutRoom = Object.values(_breakoutRooms).find(room => room.name === breakoutRoomName);

        // check if there is a participant with the localId in the breakout room
        if (breakoutRoom && otherParticipant && _localParticipant) {
            const localParticipantInRoom = Object.values(breakoutRoom.participants).find(
                participant => participant.jid === localId
            );
            const otherParticipantInRoom = Object.values(breakoutRoom.participants).find(
                participant => participant.jid !== otherParticipant.id
            );

            if (!localParticipantInRoom && _localParticipant) {
                dispatch(moveToRoom(breakoutRoom.jid));
            }
            if (!otherParticipantInRoom && otherParticipant) {
                dispatch(sendParticipantToRoom(otherParticipant.id, breakoutRoom.jid));
            }
        }
    }, [ _breakoutRooms ]);

    const openBreakoutRoom = () => {
        dispatch(createBreakoutRoom(breakoutRoomName));
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
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick = { openPrivateChat } />
                <Label
                    accessibilityText = { tooltipText }
                    className = { 'icLabelTransparent' }
                    icon = { IconShare }
                    iconColor = '#fff'
                    id = 'assistantRelationLabel'
                    // eslint-disable-next-line react/jsx-no-bind
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
            {buttons}
        </>
    )
        : <></>
    ;
};

const mapStateToProps = (state: IReduxState) => {
    return {
        // _breakoutRooms: Object.values(getBreakoutRooms(state)).filter(room => !room.isMainRoom),
        _breakoutRooms: getBreakoutRooms(state),
        _remoteParticipants: getRemoteParticipants(state),
        _localParticipant: getLocalParticipant(state),
        _participantHasRole: (participantId: string, role: string) => participantHasRole(state, participantId, role),
        _getParticipantWithICRoleAndPartner: (role: string, partnerId: string) =>
            getParticipantWithICRoleAndPartner(state, role, partnerId)
    };
};

export default connect(mapStateToProps)(AssistantRelationLabel);
