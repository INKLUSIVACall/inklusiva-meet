import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import Avatar from '../../../base/avatar/components/Avatar';
import Icon from '../../../base/icons/components/Icon';
import { IconCheck, IconCloseLarge } from '../../../base/icons/svg';
import { admitMultiple } from '../../../lobby/actions.web';
import { getKnockingParticipants, getLobbyEnabled } from '../../../lobby/functions';
import Drawer from '../../../toolbox/components/web/Drawer';
import JitsiPortal from '../../../toolbox/components/web/JitsiPortal';
import { useLobbyActions } from '../../hooks';

import LobbyParticipantItems from './LobbyParticipantItems';


import { IReduxState } from '../../../app/types';
import { rejectParticipantAudio, rejectParticipantVideo } from '../../../av-moderation/actions';
import participantsPaneTheme from '../../../base/components/themes/participantsPaneTheme.json';
import { isToolbarButtonEnabled } from '../../../base/config/functions.web';
import { MEDIA_TYPE } from '../../../base/media/constants';
import { getParticipantById, isScreenShareParticipant } from '../../../base/participants/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import Input from '../../../base/ui/components/web/Input';
import useContextMenu from '../../../base/ui/hooks/useContextMenu.web';
import { normalizeAccents } from '../../../base/util/strings.web';
import { getBreakoutRooms, getCurrentRoomId, isInBreakoutRoom } from '../../../breakout-rooms/functions';
import { showOverflowDrawer } from '../../../toolbox/functions.web';
import { muteRemote } from '../../../video-menu/actions.web';
import { getSortedParticipantIds, shouldRenderInviteButton } from '../../functions';
import { useParticipantDrawer } from '../../hooks';

import { InviteButton } from './InviteButton';
import MeetingParticipantContextMenu from './MeetingParticipantContextMenu';
import MeetingParticipantItems from './MeetingParticipantItems';

import { SEARCH_PARTICIPANTS_STATUS } from '../../constants';

const useStyles = makeStyles()(theme => {
    return {
        headingW: {
            color: theme.palette.warning02
        },
        heading: {
            color: theme.palette.text02,
            ...withPixelLineHeight(theme.typography.bodyShortBold),
            marginBottom: theme.spacing(3),
            fontSize: '0.875rem',

            [`@media(max-width: ${participantsPaneTheme.MD_BREAKPOINT})`]: {
                ...withPixelLineHeight(theme.typography.bodyShortBoldLarge)
            }
        },

        search: {
            margin: `${theme.spacing(3)} 0`,

            '& input': {
                textAlign: 'center',
                paddingRight: '16px'
            }
        },


        drawerActions: {
            listStyleType: 'none',
            margin: 0,
            padding: 0
        },
        drawerItem: {
            alignItems: 'center',
            color: theme.palette.text01,
            display: 'flex',
            padding: '12px 16px',
            ...withPixelLineHeight(theme.typography.bodyShortRegularLarge),

            '&:first-child': {
                marginTop: '15px'
            },

            '&:hover': {
                cursor: 'pointer',
                background: theme.palette.action02
            }
        },
        icon: {
            marginRight: 16
        },
        headingContainer: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between'
        },
        link: {
            ...withPixelLineHeight(theme.typography.labelBold),
            color: theme.palette.link01,
            cursor: 'pointer'
        }
    };
});

interface IProps {
    currentRoom?: { name: string; };
    overflowDrawer?: boolean;
    participantsCount?: number;
    searchString: string;
    setSearchString: (newValue: string) => void;
    showInviteButton?: boolean;
    sortedParticipantIds?: Array<string>;
}

/**
 * Renders the MeetingParticipantList component.
 * NOTE: This component is not using useSelector on purpose. The child components MeetingParticipantItem
 * and MeetingParticipantContextMenu are using connect. Having those mixed leads to problems.
 * When this one was using useSelector and the other two were not -the other two were re-rendered before this one was
 * re-rendered, so when participant is leaving, we first re-render the item and menu components,
 * throwing errors (closing the page) before removing those components for the participant that left.
 *
 * @returns {ReactNode} - The component.
 */
function AllParticipants({
    currentRoom,
    overflowDrawer,
    participantsCount,
    searchString,
    setSearchString,
    showInviteButton,
    sortedParticipantIds = []
}: IProps) {
    const dispatch = useDispatch();
    const { t } = useTranslation();


    const participants = useSelector(getKnockingParticipants);
    const { classes } = useStyles();
    const admitAll = useCallback(() => {
        dispatch(admitMultiple(participants));
    }, [ dispatch, participants ]);


    const [ lowerMenu, , toggleMenu, menuEnter, menuLeave, raiseContext ] = useContextMenu<string>();
    const muteAudio = useCallback(id => () => {
        dispatch(muteRemote(id, MEDIA_TYPE.AUDIO));
        dispatch(rejectParticipantAudio(id));
    }, [ dispatch ]);
    const stopVideo = useCallback(id => () => {
        dispatch(muteRemote(id, MEDIA_TYPE.VIDEO));
        dispatch(rejectParticipantVideo(id));
    }, [ dispatch ]);
    const [ drawerParticipant, closeDrawer, openDrawerForParticipant ] = useParticipantDrawer();

    const [ admit, reject ] = useLobbyActions(drawerParticipant, closeDrawer);

    // FIXME:
    // It seems that useTranslation is not very scalable. Unmount 500 components that have the useTranslation hook is
    // taking more than 10s. To workaround the issue we need to pass the texts as props. This is temporary and dirty
    // solution!!!
    // One potential proper fix would be to use react-window component in order to lower the number of components
    // mounted.
    const participantActionEllipsisLabel = t('participantsPane.actions.moreParticipantOptions');
    const youText = t('chat.you');
    const isBreakoutRoom = useSelector(isInBreakoutRoom);
    const visitorsCount = useSelector((state: IReduxState) => state['features/visitors'].count || 0);

    const { classes: styles, cx } = useStyles();

    var allParticipantsCount = participants.length;
    if (participantsCount != undefined) {
        allParticipantsCount += participantsCount;
    }

    return (
        <>
            <div className = { classes.headingContainer }>
                <span
                    aria-level = { 1 }
                    className = 'sr-only'
                    role = 'heading'>
                    { t('participantsPane.title') }
                </span>
                {visitorsCount > 0 && (
                    <div className = { cx(styles.heading, styles.headingW) }>
                        {t('participantsPane.headings.visitors', { count: visitorsCount })}
                    </div>
                )}
                <div className = { styles.heading }>
                    {currentRoom?.name
                        ? `${currentRoom.name} (${participantsCount})`
                        : t('participantsPane.headings.participantsList', { count: allParticipantsCount })}

                </div>
                {
                    participants.length > 1
                    && <div
                        className = { classes.link }
                        onClick = { admitAll }>{t('lobby.admitAll')}</div>
                }
            </div>
            {showInviteButton && <InviteButton />}
            {SEARCH_PARTICIPANTS_STATUS && <Input
                className = { styles.search }
                clearable = { true }
                id = 'participants-search-input'
                onChange = { setSearchString }
                placeholder = { t('participantsPane.search') }
                value = { searchString } />}
            <div>
                <MeetingParticipantItems
                    isInBreakoutRoom = { isBreakoutRoom }
                    lowerMenu = { lowerMenu }
                    muteAudio = { muteAudio }
                    openDrawerForParticipant = { openDrawerForParticipant }
                    overflowDrawer = { overflowDrawer }
                    participantActionEllipsisLabel = { participantActionEllipsisLabel }
                    participantIds = { sortedParticipantIds }
                    raiseContextId = { raiseContext.entity }
                    searchString = { normalizeAccents(searchString) }
                    stopVideo = { stopVideo }
                    toggleMenu = { toggleMenu }
                    youText = { youText } />


                <LobbyParticipantItems
                    openDrawerForParticipant = { openDrawerForParticipant }
                    overflowDrawer = { overflowDrawer ?? false }
                    participants = { participants } />
                <JitsiPortal>
                    <Drawer
                        isOpen = { Boolean(drawerParticipant && overflowDrawer) }
                        onClose = { closeDrawer }>
                        <ul className = { classes.drawerActions }>
                            <li className = { classes.drawerItem }>
                                <Avatar
                                    className = { classes.icon }
                                    participantId = { drawerParticipant?.participantID }
                                    size = { 20 } />
                                <span>{ drawerParticipant?.displayName }</span>
                            </li>
                            <li
                                className = { classes.drawerItem }
                                onClick = { admit }>
                                <Icon
                                    className = { classes.icon }
                                    size = { 20 }
                                    src = { IconCheck } />
                                <span>{ t('lobby.admit') }</span>
                            </li>
                            <li
                                className = { classes.drawerItem }
                                onClick = { reject }>
                                <Icon
                                    className = { classes.icon }
                                    size = { 20 }
                                    src = { IconCloseLarge } />
                                <span>{ t('lobby.reject')}</span>
                            </li>
                        </ul>
                    </Drawer>
                </JitsiPortal>

            </div>
            <MeetingParticipantContextMenu
                closeDrawer = { closeDrawer }
                drawerParticipant = { drawerParticipant }
                muteAudio = { muteAudio }
                offsetTarget = { raiseContext?.offsetTarget }
                onEnter = { menuEnter }
                onLeave = { menuLeave }
                onSelect = { lowerMenu }
                overflowDrawer = { overflowDrawer }
                participantID = { raiseContext?.entity } />

        </>
    );
}

/**
 * Maps (parts of) the redux state to the associated props for this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The own props of the component.
 * @private
 * @returns {IProps}
 */
function _mapStateToProps(state: IReduxState) {
    let sortedParticipantIds: any = getSortedParticipantIds(state);

    // Filter out the virtual screenshare participants since we do not want them to be displayed as separate
    // participants in the participants pane.
    sortedParticipantIds = sortedParticipantIds.filter((id: any) => {
        const participant = getParticipantById(state, id);

        return !isScreenShareParticipant(participant);
    });

    const participantsCount = sortedParticipantIds.length;
    const showInviteButton = shouldRenderInviteButton(state) && isToolbarButtonEnabled('invite', state);
    const overflowDrawer = showOverflowDrawer(state);
    const currentRoomId = getCurrentRoomId(state);
    const currentRoom = getBreakoutRooms(state)[currentRoomId];

    return {
        currentRoom,
        overflowDrawer,
        participantsCount,
        showInviteButton,
        sortedParticipantIds
    };
}

export default connect(_mapStateToProps)(AllParticipants);
