import React, { ReactElement, ReactNode } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { IReduxState } from '../../../app/types';
import { SMALL_MOBILE_WIDTH } from '../../../base/responsive-ui/constants';
import Button from '../../../base/ui/components/web/Button';
import { setHistoryVisibility, toggleCCHistoryPanel, toggleClosedCaptionPopup } from '../../actions.web';
import AccessiblePopover from '../../../inklusiva/accessiblePopover/accessiblePopover';
import { getClosedCaptionVisibility } from '../../functions';
import { IconBubble, IconDownload } from '../../../base/icons/svg';
import ContextMenu from '../../../base/ui/components/web/ContextMenu';
import { WithTranslation } from 'react-i18next';
import { translate } from '../../../base/i18n/functions';


interface IProps extends WithTranslation {
    /**
    * Component's children (the audio button).
    */
    children: ReactNode;

    /**
    * Flag controlling the visibility of the popup.
    */
    isOpen: boolean;

    /**
    * Callback executed when the popup closes.
    */
    onClose: Function;

    /**
     * Click handler for the history button.
     */
    onClickHistory: Function;

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
    t
}: IProps) {
    const { classes, cx } = useStyles();
    const dispatch = useDispatch();

    const _onClickHistory = () => {
        onClickHistory();
    }

    const _onClickDownload = () => {
        // TODO
    }

    
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
                    label = { t('toolbar.ccHistory') }
                    icon = { IconBubble }
                    onClick = { _onClickHistory } />
                <Button
                    accessibilityLabel = { t('toolbar.accessibilityLabel.ccDownload') }
                    className = { classes.button }
                    label = { t('toolbar.ccDownload') }
                    icon = { IconDownload }
                    onClick = { _onClickDownload } />
            </ContextMenu>
        
    )

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
        isOpen: Boolean(getClosedCaptionVisibility(state))
    };
}

const mapDispatchToProps = {
    onClickHistory: toggleCCHistoryPanel,
    onClose: toggleClosedCaptionPopup
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(ClosedCaptionButtonPopup));