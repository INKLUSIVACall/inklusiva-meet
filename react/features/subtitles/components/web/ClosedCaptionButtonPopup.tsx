import React, { ReactElement, ReactNode } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { IReduxState } from '../../../app/types';
import { SMALL_MOBILE_WIDTH } from '../../../base/responsive-ui/constants';
import Button from '../../../base/ui/components/web/Button';
import { toggleClosedCaptionPopup } from '../../actions.web';
import AccessiblePopover from '../../../inklusiva/accessiblePopover/accessiblePopover';
import { getClosedCaptionVisibility } from '../../functions';
import { IconBubble } from '../../../base/icons/svg';


interface IProps {
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
     * The popup placement enum value.
     */
    popupPlacement: string;
}

const useStyles = makeStyles()(() => {
    return {
        container: {
            display: 'inline-block'
        },
        button: {
            padding: '2px',

            '&:hover': {
                backgroundColor: theme.palette.action03
            }
        }
    };
});

function _onClick() {
    //
}

/**
 * Popup with audio settings.
 *
 * @returns {ReactElement}
 */
function ClosedCaptionButtonPopover({
    children,
    isOpen,
    onClose,
    popupPlacement
}: IProps) {
    const { classes, cx } = useStyles();

    let content: ReactElement | null = null;
    content = (
        <Button
            accessibilityLabel = 'toolbar.accessibilityLabel.ccHistory'
            className = { classes.button }
            icon = { IconBubble }
            onClick = { _onClick } />
    )

    return (
        <div className = { cx(classes.container, 'audio-preview') }>
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
    onClose: toggleClosedCaptionPopup()
};

export default connect(mapStateToProps, mapDispatchToProps)(ClosedCaptionButtonPopover);