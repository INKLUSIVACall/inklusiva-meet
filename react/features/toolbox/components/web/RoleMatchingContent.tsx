/* eslint-disable react/no-multi-comp */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState, IStore } from '../../../app/types';
import { getCurrentConference } from '../../../base/conference/functions';
import { ICRole, IC_ROLES } from '../../../base/conference/icRoles';
import { IJitsiConference } from '../../../base/conference/reducer';
import { IconUser } from '../../../base/icons/svg';
import { getLocalParticipant, getRemoteParticipants } from '../../../base/participants/functions';
import { IParticipant } from '../../../base/participants/types';
import { IProps as AbstractButtonProps } from '../../../base/toolbox/components/AbstractButton';
import Button from '../../../base/ui/components/web/Button';
import ContextMenu from '../../../base/ui/components/web/ContextMenu';
import ContextMenuItem from '../../../base/ui/components/web/ContextMenuItem';
import ContextMenuItemGroup from '../../../base/ui/components/web/ContextMenuItemGroup';
import { BUTTON_TYPES, TEXT_OVERFLOW_TYPES } from '../../../base/ui/constants.web';
import { hideRoleMatching } from '../../../inklusiva/rolematching/functions';


const useStyles = makeStyles()(theme => {
    return {
        contextMenu: {
            position: 'relative',
            right: 'auto',
            margin: 0,
            marginBottom: theme.spacing(1),
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'auto',
            width: '300px'
        },

        header: {
            '&:hover': {
                backgroundColor: 'initial',
                cursor: 'initial'
            }
        },

        list: {
            margin: 0,
            padding: 0,
            listStyleType: 'none'
        },

        checkboxContainer: {
            padding: '10px 16px'
        },
        button: {
            width: '100%'
        },
        assistanceName: {
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
        }
    };
});

/**
 * The type of the React {@code Component} props of {@link RoleMatchingContent}.
 */
interface IProps {

    /**
     * Conference object for the current conference.
     */
    _conference?: IJitsiConference;

    /**
     * Hide the visibility of the popup.
     */
    _hideVisibility: Function;

    /**
     * The local participant.
     */
    _localParticipant?: IParticipant;

    /**
     * The remote participants.
     */
    _remoteParticipants?: Map<string, IParticipant>;
}
const RoleMatchingContent = (props: IProps) => {
    const { classes } = useStyles();

    // Transform the remote participants map into an array of objects with the name and id of the participant.
    const assistees = Array.from(props._remoteParticipants?.values() || [])
        .filter(participant => props._conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTED))
        .map(participant => {
            return {
                name: participant.name,
                participantId: participant.id
            };
        });

    let assistedBy: IParticipant | null = null;
    let assistedByName = '';

    Array.from(props._remoteParticipants?.values() || []).forEach(participant => {
        const roles = props._conference?.getMemberICRoles(participant.id);

        roles.forEach((role: ICRole) => {
            if (role.name === IC_ROLES.ASSISTANT && role.partner === props._localParticipant?.id) {
                assistedBy = participant;
                assistedByName = participant?.name ?? '';
            }
        });
    });

    const _onClickNeedAssistance = function() {
        props._conference?.addLocalICRole(IC_ROLES.ASSISTED);
        props._hideVisibility();
    };

    const _onClickOfferAssistance = function(participantId: string) {
        props._conference?.addLocalICRole(IC_ROLES.ASSISTANT, participantId);
        props._hideVisibility();
    };

    /**
     * Renders a single microphone entry.
     *
     * @param {Object} data - An object with the deviceId, jitsiTrack & label of the microphone.
     * @param {number} index - The index of the element, used for creating a key.
     * @param {length} length - The length of the microphone list.
     * @returns {React$Node}
     */
    const _renderAssistees = (data: { name: string; participantId: string; }, index: number, length: number) => (
        <li
            aria-posinset = { index }
            aria-setsize = { length }
            key = { index }
            role = 'radio'
            tabIndex = { 0 }>
            <ContextMenuItem
                accessibilityLabel = { 'alfj' }
                overflowType = { TEXT_OVERFLOW_TYPES.SCROLL_ON_HOVER }>
                <Button
                    className = { classes.button }
                    label = { `... ${data.name}` }
                    onClick = { () => _onClickOfferAssistance(data.participantId) }
                    type = { BUTTON_TYPES.PRIMARY } />
            </ContextMenuItem>
        </li>
    );

    return (
        <ContextMenu
            aria-labelledby = 'audio-settings-button'
            className = { classes.contextMenu }
            hidden = { false }
            id = 'audio-settings-dialog'
            tabIndex = { -1 }>
            <ContextMenuItemGroup>
                {assistedBy === null && (
                    <ContextMenuItem accessibilityLabel = { 'Ich benötige Assistenz' }>
                        <Button
                            className = { classes.button }
                            label = 'Ich benötige Assistenz'
                            onClick = { _onClickNeedAssistance }
                            type = { BUTTON_TYPES.PRIMARY } />
                    </ContextMenuItem>
                )}
                {assistedBy !== null && (
                    <ContextMenuItem
                        accessibilityLabel = { `Assistenz durch ${assistedByName}` }>
                        <div className = { classes.assistanceName }>{`Assistenz durch ${assistedByName}`} </div>
                    </ContextMenuItem>
                )}
            </ContextMenuItemGroup>
            {assistees.length > 0 && (
                <ContextMenuItemGroup>
                    <ContextMenuItem
                        accessibilityLabel = { 'Ich übernehme Assistenz für...' }
                        className = { classes.header }
                        icon = { IconUser }
                        id = { 'assistees' }
                        text = { 'Ich übernehme Assistenz für...' } />
                    <ul
                        aria-labelledby = { 'assistees' }
                        className = { classes.list }
                        role = 'radiogroup'
                        tabIndex = { -1 }>
                        {assistees.map((data: any, i: number) => _renderAssistees(data, i, assistees.length))}
                    </ul>
                </ContextMenuItemGroup>
            )}
        </ContextMenu>
    );
};

const mapStateToProps = (state: IReduxState) => {
    return {
        _remoteParticipants: getRemoteParticipants(state),
        _localParticipant: getLocalParticipant(state),
        _conference: getCurrentConference(state)
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
        _hideVisibility() {
            dispatch(hideRoleMatching());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RoleMatchingContent);
