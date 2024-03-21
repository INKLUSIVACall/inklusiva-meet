import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState, IStore } from '../../../app/types';
import { translate } from '../../../base/i18n/functions';
import { getLocalParticipant } from '../../../base/participants/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import Tabs from '../../../base/ui/components/web/Tabs';
import PollsPane from '../../../polls/components/web/PollsPane';
import { WithTranslation } from 'react-i18next';
import { setHistoryVisibility } from '../../actions.any';
import { toggleCCHistoryPanel } from '../../actions.web';
import { IconCloseLarge } from '../../../base/icons/svg';
import Icon from '../../../base/icons/components/Icon';
import { isTranscriptionEnabled } from '../../../inklusiva/transcription/functions.web';
import { forEach } from 'lodash';
import { HISTORY_PANEL_SIZE } from '../../constants';

interface IProps extends WithTranslation {
    /**
     * Indicates whether the CC history is open.
     */
    _isOpen: boolean;

    /**
     * The whole histroy of the transcription. The messages are saved in an array as 
     * Objects with the timeout of the transcription message, the final transcription message, and
     * the name of the message's participant; as well as the stable and unstable state of the
     * message.
     */
    _transcriptionHistory: any[];

    /**
     * The length of the ztanscription history. To update the cc panel.
     */
    _transcriptionHistoryLength: number;

    /**
     * The Redux dispatch function.
     */
    dispatch: IStore['dispatch'];
}

const useStyles = makeStyles()(theme => {
    return {
        container: {
            backgroundColor: theme.palette.ui01,
            flexShrink: 0,
            overflow: 'hidden',
            position: 'relative',
            transition: 'width .16s ease-in-out',
            width: `${HISTORY_PANEL_SIZE}px`,
            zIndex: 300,

            '@media (max-width: 580px)': {
                height: '100vh',
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                width: 'auto'
            },

            '*': {
                userSelect: 'text',
                '-webkit-user-select': 'text'
            }
        },
        panelHeader: {
            height: '60px',
            position: 'relative',
            width: '100%',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
            alignItems: 'center',
            boxSizing: 'border-box',
            color: theme.palette.text01,
            ...withPixelLineHeight(theme.typography.heading6),
            fontSize: '1rem',

            '.jitsi-icon': {
                cursor: 'pointer'
            }
        },
        panel: {
            display: 'flex',
            flexDirection: 'column',

            // extract header + tabs height
            height: 'calc(100% - 110px)',
            overflowAnchor: 'auto',
            overflowY: 'scroll'
        },
        content: {
            display: 'flex',
            fontSize: '15px',
            paddingLeft: '25px',
            paddingRight: '20px',
            marginBottom: '1rem',
            overflowAnchor: 'auto'
        }
    };
});


const ClosedCaptionHistory = ({
    _isOpen,
    _transcriptionHistory,
    dispatch,
    t
}: IProps) => {
    const { classes, cx } = useStyles();

    const onToggleHistory = useCallback(() => {
        dispatch(toggleCCHistoryPanel());
    }, []);

    const onEscClick = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Escape' && _isOpen) {
            event.preventDefault();
            event.stopPropagation();
            onToggleHistory();
        }
    }, [ _isOpen ]);


    /**
     * Renders the panel header.
     * 
     * @returns 
     */
    function renderPanelHeader() {
        return (
            <div
                className = { classes.panelHeader }
                id = 'CCHistoryHeader'>
                <span
                    aria-level = { 1 }
                    role = 'heading'>
                    { t('cc.title') }
                </span>
                <Icon
                    ariaLabel = { t('toolbar.closeChat') }
                    onClick = { onToggleHistory }
                    onKeyPress = { onEscClick }
                    role = 'button'
                    src = { IconCloseLarge }
                    tabIndex = { 0 } />
            </div>
        )
    }

    /**
     * Renders the cc history panel.
     * 
     * @returns
     */
    function renderPanel() {
        return (
            <div
                className = { classes.panel }
                id = 'CCHistoryPanel'>
                    { _transcriptionHistory.map(transcriptionHistory => (
                        <div
                            className = { classes.content }>
                            {transcriptionHistory.participantName}: {transcriptionHistory.final}
                        </div>
                    )) }
            </div>
        )
        
    }


    return (
        _isOpen ? <div
            className = { classes.container }
            id = 'sideToolbarContainerCC'
            onKeyDown = { onEscClick } >
                { renderPanelHeader() }
                { renderPanel() }
            </div>
        : <></>
    );
};


function _mapStateToProps(state: IReduxState, _ownProps: any) {
    const isOpen = state['features/subtitles']._historyVisibility;
    const transcriptionHistory = state['features/subtitles']._transcriptionHistory;

    return {
        _isOpen: isOpen,
        _transcriptionHistory: transcriptionHistory,
        _transcriptionHistoryLength: transcriptionHistory.length
    }
}

export default translate(connect(_mapStateToProps)(ClosedCaptionHistory));