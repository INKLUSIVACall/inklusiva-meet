import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import participantsPaneTheme from '../../../base/components/themes/participantsPaneTheme.json';
import { openDialog } from '../../../base/dialog/actions';
import { isMobileBrowser } from '../../../base/environment/utils';
import { IconCloseLarge, IconDotsHorizontal } from '../../../base/icons/svg';
import { isLocalParticipantModerator } from '../../../base/participants/functions';
import BaseDialog from '../../../base/ui/components/web/BaseDialog';
import Button from '../../../base/ui/components/web/Button';
import ClickableIcon from '../../../base/ui/components/web/ClickableIcon';
import { BUTTON_TYPES } from '../../../base/ui/constants.web';
import { findAncestorByClass } from '../../../base/ui/functions.web';
import { isAddBreakoutRoomButtonVisible } from '../../../breakout-rooms/functions';
import { toggleToolboxVisible } from '../../../toolbox/actions.any';
import MuteEveryoneDialog from '../../../video-menu/components/web/MuteEveryoneDialog';
import { close } from '../../actions.web';
import { BREAKOUTROOM_BUTTON_STATUS, BREAKOUTROOM_LIST_STATUS } from '../../constants';
import { getParticipantsPaneOpen, isMoreActionsVisible, isMuteAllVisible } from '../../functions';
import { AddBreakoutRoomButton } from '../breakout-rooms/components/web/AddBreakoutRoomButton';
import { RoomList } from '../breakout-rooms/components/web/RoomList';

import AllParticipants from './AllParticipants';
import { FooterContextMenu } from './FooterContextMenu';

const useStyles = makeStyles()(theme => {
    return {
        container: {
            boxSizing: 'border-box',
            flex: 1,
            overflowY: 'auto',
            position: 'relative',
            padding: `0 ${participantsPaneTheme.panePadding}px`,

            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },

        closeButton: {
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center'
        },

        header: {
            alignItems: 'center',
            boxSizing: 'border-box',
            display: 'flex',
            height: '60px',
            padding: `0 ${participantsPaneTheme.panePadding}px`,
            justifyContent: 'flex-end'
        },

        antiCollapse: {
            fontSize: 0,

            '&:first-child': {
                display: 'none'
            },

            '&:first-child + *': {
                marginTop: 0
            }
        },

        footer: {
            display: 'flex',
            justifyContent: 'flex-end',
            padding: `${theme.spacing(4)} ${participantsPaneTheme.panePadding}px`,

            '& > *:not(:last-child)': {
                marginRight: theme.spacing(3)
            }
        },

        footerMoreContainer: {
            position: 'relative'
        }
    };
});

const ParticipantsPane = () => {
    const { classes } = useStyles();
    const paneOpen = useSelector(getParticipantsPaneOpen);
    const isBreakoutRoomsSupported = useSelector((state: IReduxState) => state['features/base/conference'])
        .conference?.getBreakoutRooms()
        ?.isSupported();
    const showAddRoomButton = useSelector(isAddBreakoutRoomButtonVisible);
    const showFooter = useSelector(isLocalParticipantModerator);
    const showMuteAllButton = useSelector(isMuteAllVisible);
    const showMoreActionsButton = useSelector(isMoreActionsVisible);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [ contextOpen, setContextOpen ] = useState(false);
    const [ searchString, setSearchString ] = useState('');

    const onWindowClickListener = useCallback(
        (e: any) => {
            if (contextOpen && !findAncestorByClass(e.target, classes.footerMoreContainer)) {
                setContextOpen(false);
            }
        },
        [ contextOpen ]
    );

    useEffect(() => {
        window.addEventListener('click', onWindowClickListener);

        return () => {
            window.removeEventListener('click', onWindowClickListener);
        };
    }, []);

    const onClosePane = useCallback(() => {
        dispatch(close());
        if (isMobileBrowser()) {
            dispatch(toggleToolboxVisible());
        }
    }, []);

    const onDrawerClose = useCallback(() => {
        setContextOpen(false);
    }, []);

    const onMuteAll = useCallback(() => {
        dispatch(openDialog(MuteEveryoneDialog));
    }, []);

    const onToggleContext = useCallback(() => {
        setContextOpen(open => !open);
    }, []);

    if (!paneOpen) {
        return null;
    }

    const isSmallViewport = window.innerWidth < 450;

    const paneContent = (
        <>
            <div className = { classes.header }>
                <ClickableIcon
                    accessibilityLabel = { t('participantsPane.close', 'Close') }
                    icon = { IconCloseLarge }
                    onClick = { onClosePane } />
            </div>
            <div
                aria-label = { t('participantsPane.allParticipants') }
                className = { classes.container }
                tabIndex = { 0 }>
                <AllParticipants
                    searchString = { searchString }
                    setSearchString = { setSearchString } />
                {BREAKOUTROOM_LIST_STATUS && isBreakoutRoomsSupported && <RoomList searchString = { searchString } />}
                {BREAKOUTROOM_BUTTON_STATUS && showAddRoomButton && <AddBreakoutRoomButton />}
            </div>
            {showFooter && (
                <div className = { classes.footer }>
                    {showMuteAllButton && (
                        <Button
                            accessibilityLabel = { t('participantsPane.actions.muteAll') }
                            labelKey = { 'participantsPane.actions.muteAll' }
                            onClick = { onMuteAll }
                            type = { BUTTON_TYPES.SECONDARY } />
                    )}
                    {showMoreActionsButton && (
                        <div className = { classes.footerMoreContainer }>
                            <Button
                                accessibilityLabel = { t('participantsPane.actions.moreModerationActions') }
                                icon = { IconDotsHorizontal }
                                id = 'participants-pane-context-menu'
                                onClick = { onToggleContext }
                                type = { BUTTON_TYPES.SECONDARY } />
                            <FooterContextMenu
                                isOpen = { contextOpen }
                                onDrawerClose = { onDrawerClose }
                                onMouseLeave = { onToggleContext } />
                        </div>
                    )}
                </div>
            )}
        </>
    );

    return isSmallViewport ? (
        <BaseDialog
            onClose = { onClosePane }
            size = 'large'>
            {paneContent}
        </BaseDialog>
    ) : (
        <div className = 'participants_pane'>
            <div className = 'participants_pane-content'>{paneContent}</div>
        </div>
    );
};

export default ParticipantsPane;
