import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import Popover from '../../../base/popover/components/Popover.web';
import { SMALL_MOBILE_WIDTH } from '../../../base/responsive-ui/constants';
import { getRoleMatchingVisibility } from '../../../inklusiva/rolematching/functions';

import RoleMatchingContent from './RoleMatchingContent';

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
     * The popup placement enum value.
     */
    popupPlacement: string;

}

const useStyles = makeStyles()(() => {
    return {
        container: {
            display: 'inline-block'
        }
    };
});

/**
 * Popup with audio settings.
 *
 * @returns {ReactElement}
 */
function RoleMathingPopup({ children, isOpen, popupPlacement }: IProps) {
    const { classes, cx } = useStyles();

    return (
        <div className = { cx(classes.container, 'audio-preview') }>
            <Popover
                allowClick = { true }
                content = { <RoleMatchingContent /> }
                headingId = 'audio-settings-button'
                onPopoverClose = { () => {} }
                position = { popupPlacement }
                trigger = 'click'
                visible = { isOpen }>
                {children}
            </Popover>
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
        isOpen: Boolean(getRoleMatchingVisibility(state))
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoleMathingPopup);
