import clsx from 'clsx';
import React, { ReactNode, useCallback } from 'react';
import { WithTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import Avatar from '../../../base/avatar/components/Avatar';
import { translate } from '../../../base/i18n/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import ListItem from '../../../base/ui/components/web/ListItem';
import {
    ACTION_TRIGGER,
    ACTIVE_CONNECTION,
    type ActionTrigger,
    AudioStateIcons,
    ConnectionStateIcons,
    DEFAULT_MEETING_ROLE,
    DEFAULT_MEETING_STATE,
    ESCORT_REQUIRED,
    EscortIcons,
    MEDIA_STATE,
    MediaState,
    MeetingRoleIcons,
    MeetingStateIcons,
    SUPPORT_OFFERED,
    SupportOfferIcons,
    TECHNICAL_SUPPORT_REQUIRED,
    TechnicalSupportIcons,
    VideoStateIcons
} from '../../constants';

import RaisedHandIndicator from './RaisedHandIndicator';

interface IProps extends WithTranslation {

    /**
     * Type of trigger for the participant actions.
     */
    actionsTrigger?: ActionTrigger;

    /**
     * Media state for audio.
     */
    audioMediaState?: MediaState;

    /**
     * React children.
     */
    children?: ReactNode;

    /**
     * Whether or not to disable the moderator indicator.
     */
    disableModeratorIndicator?: boolean;

    /**
     * The name of the participant. Used for showing lobby names.
     */
    displayName?: string;

    /**
     * True if the user is in the Lobby.
     */
    inLobby?: boolean;

    /**
     * Is this item highlighted/raised.
     */
    isHighlighted?: boolean;

    /**
     * Whether or not the participant is a moderator.
     */
    isModerator?: boolean;

    /**
     * True if the participant is local.
     */
    local?: boolean;

    /**
     * Callback for when the mouse leaves this component.
     */
    onLeave?: (e?: React.MouseEvent) => void;

    /**
     * Opens a drawer with participant actions.
     */
    openDrawerForParticipant?: Function;

    /**
     * If an overflow drawer can be opened.
     */
    overflowDrawer?: boolean;

    /**
     * The ID of the participant.
     */
    participantID: string;

    /**
     * True if the participant have raised hand.
     */
    raisedHand?: boolean;

    /**
     * Media state for video.
     */
    videoMediaState?: MediaState;

    /**
     * The translated "you" text.
     */
    youText?: string;
}

const useStyles = makeStyles()(theme => {
    return {
        nameContainer: {
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
            fontSize: '0.875rem'
        },

        name: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },

        moderatorLabel: {
            ...withPixelLineHeight(theme.typography.labelBold),
            color: theme.palette.text03
        },

        avatar: {
            marginRight: theme.spacing(3)
        }
    };
});

/**
 * A component representing a participant entry in ParticipantPane and Lobby.
 *
 * @param {IProps} props - The props of the component.
 * @returns {ReactNode}
 */
function ParticipantItem({
    actionsTrigger = ACTION_TRIGGER.HOVER,
    audioMediaState = MEDIA_STATE.NONE,
    children,
    disableModeratorIndicator,
    displayName,
    isHighlighted,
    isModerator,
    local,
    onLeave,
    openDrawerForParticipant,
    overflowDrawer,
    participantID,
    raisedHand,
    t,
    videoMediaState = MEDIA_STATE.NONE,
    youText,
    inLobby
}: IProps) {
    const onClick = useCallback(
        () =>
            openDrawerForParticipant?.({
                participantID,
                displayName
            }),
        []
    );

    const { classes } = useStyles();

    const meetingRole = DEFAULT_MEETING_ROLE;

    const icon
        = (<Avatar
            className = { classes.avatar }
            displayName = { displayName }
            participantId = { participantID }
            size = { 32 } />)
    ;

    // Reading roles of participant
    const store = useStore();
    const { conference } = store.getState()['features/base/conference'];
    const icRoles = conference?.getMemberICRoles(participantID);

    // Role cascading
    let mainRole = DEFAULT_MEETING_ROLE;

    if (isModerator) {
        mainRole = (icRoles && icRoles[0]?.name) || 'moderator';
    } else {
        mainRole = (icRoles && icRoles[0]?.name) || 'participant';
    }

    // Getting the role icon
    const roleIcon = MeetingRoleIcons[mainRole];

    const text = (
        <>
            <div
                tabIndex = { 0 }
                className = { classes.nameContainer }>
                {inLobby && <div className = { clsx(classes.name, 'lobby-participant-name') }>{displayName}</div>}
                {!inLobby && <div className = { classes.name }>{displayName}</div>}
                {local ? <span>&nbsp;({youText})</span> : null}

                <div className = 'LeftPlacedIcons'>
                    {/* {TECHNICAL_SUPPORT_REQUIRED && TechnicalSupportIcons} */}
                    {/* {ESCORT_REQUIRED && EscortIcons} */}
                    {/* {SUPPORT_OFFERED && SupportOfferIcons} */}
                    {ACTIVE_CONNECTION && ConnectionStateIcons}
                    {raisedHand && <RaisedHandIndicator participantID = { participantID } />}
                </div>
            </div>
            {/* {isModerator && !disableModeratorIndicator && <div className = { classes.moderatorLabel }>
                {t('videothumbnail.moderator')}
            </div>}*/}
        </>
    );

    const indicators = (
        <>
            <div className = 'MiddlePlacedIcons'>
                {VideoStateIcons[videoMediaState]}
                {AudioStateIcons[audioMediaState]}
            </div>
            <div className = 'RightPlacedIcons'>
                {MeetingStateIcons[DEFAULT_MEETING_STATE]}
                {roleIcon}
            </div>
        </>
    );

    return (
        <ListItem
            actions = { children }
            hideActions = { local }
            icon = { icon }
            id = { `participant-item-${participantID}` }
            indicators = { indicators }
            isHighlighted = { isHighlighted }
            onClick = { !local && overflowDrawer ? onClick : undefined }
            onMouseLeave = { onLeave }
            textChildren = { text }
            trigger = { actionsTrigger } />
    );
}

export default translate(ParticipantItem);
