import React, { KeyboardEvent, ReactNode, useCallback } from 'react';
import { FocusOn } from 'react-focus-on';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import { IconCloseLarge } from '../../../base/icons/svg';
import { isElementInTheViewport } from '../../../base/ui/functions.web';
import { DRAWER_MAX_HEIGHT } from '../../constants';

interface IProps {

    /**
     * The component(s) to be displayed within the drawer menu.
     */
    children: ReactNode;

    /**
     * Class name for custom styles.
     */
    className?: string;

    /**
     * The id of the dom element acting as the Drawer label.
     */
    headingId?: string;

    /**
     * Whether the drawer should be shown or not.
     */
    isOpen: boolean;

    /**
     * Function that hides the drawer.
     */
    onClose?: () => void;
}

const useStyles = makeStyles()(theme => {
    return {
        drawer: {
            backgroundColor: theme.palette.ui01,
            maxHeight: `calc(${DRAWER_MAX_HEIGHT})`,
            borderRadius: '24px 24px 0 0'
        },
        drawerHeader: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '15px'
        },
        closeIcon: {
            cursor: 'pointer',
            '& svg': {
                width: '30px',
                height: '30px'
            }
        }
    };
});

/**
 * Component that displays the mobile friendly drawer on web.
 *
 * @returns {ReactElement}
 */
function Drawer({ children, className = '', headingId, isOpen, onClose }: IProps) {
    const { classes: styles } = useStyles();

    /**
     * Handles clicks within the menu, preventing the propagation of the click event.
     *
     * @param {Object} event - The click event.
     * @returns {void}
     */
    const handleInsideClick = useCallback(event => {
        event.stopPropagation();
    }, []);

    /**
     * Handles clicks outside of the menu, closing it, and also stopping further propagation.
     *
     * @param {Object} event - The click event.
     * @returns {void}
     */
    const handleOutsideClick = useCallback(
        event => {
            event.stopPropagation();
            onClose?.();
        },
        [ onClose ]
    );

    /**
     * Handles pressing the escape key, closing the drawer.
     *
     * @param {KeyboardEvent<HTMLDivElement>} event - The keydown event.
     * @returns {void}
     */
    const handleEscKey = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                onClose?.();
            }
        },
        [ onClose ]
    );

    /**
     * Handles key press events, specifically the Enter key.
     *
     * @param {KeyboardEvent<HTMLDivElement>} event - The key press event.
     * @returns {void}
     */
    const handleKeyPress = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                onClose?.();
            }
        },
        [ onClose ]
    );

    return isOpen ? (
        <div
            className = 'drawer-menu-container'
            onClick = { handleOutsideClick }
            onKeyDown = { handleEscKey }>
            <div
                className = { `drawer-menu ${styles.drawer} ${className}` }
                onClick = { handleInsideClick }>
                <FocusOn
                    returnFocus = {

                        // If we return the focus to an element outside the viewport the page will scroll to
                        // this element which in our case is undesirable and the element is outside of the
                        // viewport on purpose (to be hidden). For example if we return the focus to the toolbox
                        // when it is hidden the whole page will move up in order to show the toolbox. This is
                        // usually followed up with displaying the toolbox (because now it is on focus) but
                        // because of the animation the whole scenario looks like jumping large video.
                        isElementInTheViewport
                    }
                    scrollLock = { false }>
                    <div
                        aria-labelledby = { headingId ? `#${headingId}` : undefined }
                        aria-modal = { true }
                        data-autofocus = { true }
                        role = 'dialog'
                        tabIndex = { -1 }>
                        <div className = { styles.drawerHeader }>
                            <div
                                aria-label = 'Close Drawer'
                                className = { styles.closeIcon }
                                onClick = { onClose }
                                onKeyPress = { handleKeyPress }
                                role = 'button'
                                tabIndex = { 0 }>
                                <Icon src = { IconCloseLarge } />
                            </div>
                        </div>
                        {children}
                    </div>
                </FocusOn>
            </div>
        </div>
    ) : null;
}

export default Drawer;
