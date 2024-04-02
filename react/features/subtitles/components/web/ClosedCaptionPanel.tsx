import React, { useCallback, useEffect, useRef } from 'react';
import { WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { scrollIntoView } from 'seamless-scroll-polyfill';
import { makeStyles } from 'tss-react/mui';

import { IReduxState, IStore } from '../../../app/types';
import { translate } from '../../../base/i18n/functions';
import Icon from '../../../base/icons/components/Icon';
import { IconCloseLarge } from '../../../base/icons/svg';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import { toggleCCHistoryPanel } from '../../actions.web';
import { HISTORY_PANEL_SIZE } from '../../constants';

interface IProps extends WithTranslation {

    /**
     * Intersection observer used to detect intersections of messages with the bottom of the message container.
     */
    _bottomListObserver: IntersectionObserver;

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

interface IState {

    /**
     * Indicates whether new transcription messages arrived while scolling through
     * the history. Triggers a message (Not implemented).
     */
    hasNewMessages: boolean;

    /**
     * Indicates whether the user scrolled to the bottom of the history. That is when
     * automatic scrolling is enabled for displaying new transcription messages (Does
     * not work).
     */
    isScrolledToBottom: boolean;

    /**
     * The last transcriptino message in the history (Not implemented).
     */
    lastTranscriptionMessageID: string;
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
            fontSize: '1rem',
            paddingLeft: '25px',
            paddingRight: '20px',
            marginBottom: '1rem',
            overflowAnchor: 'auto'
        }
    };
});

const ClosedCaptionHistory = ({
    _bottomListObserver,
    _isOpen,
    _transcriptionHistory,
    _transcriptionHistoryLength,
    dispatch,
    t
}: IProps) => {
    const { classes } = useStyles();

    // Variables to check whether to scroll while a new transcription is added
    // to the history panel, or not (this is the case if scrolled up in the
    // transcription history). Right now we just implemented isScrolledToBottom
    // but it does not work.
    const state: IState = {
        hasNewMessages: false,
        isScrolledToBottom: true,
        lastTranscriptionMessageID: ''
    };

    const onToggleHistory = useCallback(() => {
        dispatch(toggleCCHistoryPanel());
    }, []);

    const onEscClick = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Escape' && _isOpen) {
                event.preventDefault();
                event.stopPropagation();
                onToggleHistory();
            }
        },
        [ _isOpen ]
    );

    const _transcriptionsListEndRef = React.createRef<HTMLDivElement>();

    /**
     * _HandleIntersectBottomList.
     * When entry is intersecting with bottom of container set last message as last read message.
     * When entry is not intersecting update only isScrolledToBottom with false value.
     *
     * @param {Array} entries - List of entries.
     * @private
     * @returns {void}
     */
    const handleIntersectBottomList = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && _transcriptionHistoryLength) {
                state.isScrolledToBottom = true;
            }

            if (!entry.isIntersecting) {
                state.isScrolledToBottom = false;
            }
        });
    };

    /**
     * Create observer to react when scroll position is at bottom or leave the bottom.
     *
     * @private
     * @returns {void}
     */
    const createBottomListObserver = () => {
        const options = {
            root: document.querySelector('#CCHistoryPanel'),
            rootMargin: '35px',
            threshold: 0.5
        };

        const target = document.querySelector('#transcriptionsListEnd');

        if (target) {
            _bottomListObserver = new IntersectionObserver(handleIntersectBottomList, options);
            _bottomListObserver.observe(target);
        }
    };

    useEffect(() => {
        createBottomListObserver();
    });

    useEffect(() => {
        if (state.isScrolledToBottom === true) {
            if (_transcriptionsListEndRef.current) {
                scrollIntoView(_transcriptionsListEndRef.current as Element, {
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }
    }, [ _transcriptionHistoryLength ]);


    /**
     * Renders the panel header.
     *
     * @returns {ReactElement}
     */
    function renderPanelHeader() {
        return (
            <div
                className = { classes.panelHeader }
                id = 'CCHistoryHeader'>
                <span
                    aria-level = { 1 }
                    role = 'heading'>
                    {t('cc.title')}
                </span>
                <Icon
                    ariaLabel = { t('toolbar.closeChat') }
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick = { onToggleHistory }
                    // eslint-disable-next-line react/jsx-no-bind
                    onKeyPress = { onEscClick }
                    role = 'button'
                    src = { IconCloseLarge }
                    tabIndex = { 0 } />
            </div>
        );
    }

    /**
     * Renders the cc history panel.
     *
     * @returns {ReactElement}
     */
    function renderPanel() {
        return (
            <div
                className = { classes.panel }
                id = 'CCHistoryPanel'>
                {_transcriptionHistory.map(transcriptionHistory => (
                    <div className = { classes.content }>
                        {transcriptionHistory.participantName.length > 15
                            ? `${transcriptionHistory.participantName.substr(0, 12)}...`
                            : transcriptionHistory.participantName}
                        : {transcriptionHistory.final}
                    </div>
                ))}
                <div
                    id = 'transcriptionsListEnd'
                    ref = { _transcriptionsListEndRef } />
            </div>
        );
    }

    return _isOpen ? (
        <div
            className = { classes.container }
            id = 'sideToolbarContainerCC'
            onKeyDown = { onEscClick }>
            {renderPanelHeader()}
            {renderPanel()}
        </div>
    )
        : <></>
    ;
};

function _mapStateToProps(state: IReduxState, _ownProps: any) {
    const isOpen = state['features/subtitles']._historyVisibility;
    const transcriptionHistory = state['features/subtitles']._transcriptionHistory;

    return {
        _isOpen: isOpen,
        _transcriptionHistory: transcriptionHistory,
        _transcriptionHistoryLength: transcriptionHistory.length
    };
}

export default translate(connect(_mapStateToProps)(ClosedCaptionHistory));

