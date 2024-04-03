import React, { ReactElement, ReactNode } from 'react';
import { WithTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { getConferenceName } from '../../../base/conference/functions';
import { translate } from '../../../base/i18n/functions';
import { IconBubble, IconDownload } from '../../../base/icons/svg';
import { SMALL_MOBILE_WIDTH } from '../../../base/responsive-ui/constants';
import Button from '../../../base/ui/components/web/Button';
import ContextMenu from '../../../base/ui/components/web/ContextMenu';
import AccessiblePopover from '../../../inklusiva/accessiblePopover/accessiblePopover';
import { toggleCCHistoryPanel, toggleClosedCaptionPopup } from '../../actions.web';
import { getClosedCaptionVisibility } from '../../functions';


interface IProps extends WithTranslation {

    /**
     * The name of the conference.
     */
    _conferenceName: string;

    /**
     * The whole history of the transcription. The messages are saved in an array as
     * Objects with the timeout of the transcription message, the final transcription message, and
     * the name of the message's participant; as well as the stable and unstable state of the
     * message.
     */
    _transcriptionHistory: any[];

    /**
    * Component's children (the audio button).
    */
    children: ReactNode;

    /**
    * Flag controlling the visibility of the popup.
    */
    isOpen: boolean;

    /**
     * Click handler for the history button.
     */
    onClickHistory: Function;

    /**
    * Callback executed when the popup closes.
    */
    onClose: Function;

    /**
     * The popup placement enum value.
     */
    popupPlacement: string;
}

const useStyles = makeStyles()(theme => {
    return {
        container: {
            background: 'none',
            display: 'inline-block'
        },
        buttonContainer: {
            position: 'relative',
            right: 'auto',
            margin: 0,
            marginBottom: theme.spacing(1),
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'auto',
            width: '300px'
        },
        button: {
            width: 'fit-content',
            background: 'none',
            marginBottom: '0.7rem',
            textAlign: 'left',
            paddingLeft: '10px',

            '&:hover': {
                backgroundColor: theme.palette.action03Hover
            }
        }
    };
});

/**
 * Popup with audio settings.
 *
 * @returns {ReactElement}
 */
function ClosedCaptionButtonPopup({
    children,
    isOpen,
    onClickHistory,
    onClose,
    popupPlacement,
    _transcriptionHistory,
    _conferenceName,
    t
}: IProps) {
    const { classes } = useStyles();

    const _onClickHistory = () => {
        onClickHistory();
    };

    const _onClickDownload = () => {
        const formattedMessages = _transcriptionHistory.map(message => {
            const { participantName, final } = message;
            const messageText = final;

            return `${participantName}: ${messageText}`;
        });

        const content = formattedMessages.join('\n');

        const element = document.createElement('a');
        const file = new Blob([ content ], { type: 'text/plain' });

        element.href = URL.createObjectURL(file);
        element.download = `${_conferenceName}_transkript.txt`;
        document.body.appendChild(element); // Required for this to work in Firefox
        element.click();
    };


    let content: ReactElement | null = null;

    content = (
        <ContextMenu
            aria-labelledby = 'cc-settings-button'
            className = { classes.buttonContainer }
            hidden = { false }
            id = 'closed-caption-dialog'
            role = 'radiogroup'
            tabIndex = { -1 }>
            <Button
                accessibilityLabel = { t('toolbar.accessibilityLabel.ccHistory') }
                className = { classes.button }
                icon = { IconBubble }
                label = { t('toolbar.ccHistory') }
                // eslint-disable-next-line react/jsx-no-bind
                onClick = { _onClickHistory } />
            <Button
                accessibilityLabel = { t('toolbar.accessibilityLabel.ccDownload') }
                className = { classes.button }
                icon = { IconDownload }
                label = { t('toolbar.ccDownload') }
                // eslint-disable-next-line react/jsx-no-bind
                onClick = { _onClickDownload } />

        </ContextMenu>

    );

    return (
        <div className = { classes.container }>
            <AccessiblePopover
                allowClick = { true }
                content = { content }
                headingId = 'cc-settings-button'
                onPopoverClose = { onClose }
                position = { popupPlacement }
                trigger = 'click'
                visible = { isOpen }>
                {children}
            </AccessiblePopover>
        </div>
    );
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
function mapStateToProps(state: IReduxState) {
    const { clientWidth } = state['features/base/responsive-ui'];

    return {
        popupPlacement: clientWidth <= Number(SMALL_MOBILE_WIDTH) ? 'auto' : 'top-end',
        isOpen: Boolean(getClosedCaptionVisibility(state)),
        _transcriptionHistory: state['features/subtitles']._transcriptionHistory,
        _conferenceName: state['features/base/conference'].room ?? ''
    };
}

const mapDispatchToProps = {
    onClickHistory: toggleCCHistoryPanel,
    onClose: toggleClosedCaptionPopup
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(ClosedCaptionButtonPopup));

