import React, { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { hideDialog } from '../../base/dialog/actions';
import { translate } from '../../base/i18n/functions';
import { IconCloseLarge } from '../../base/icons/svg';
import BaseDialog from '../../base/ui/components/web/BaseDialog';
import ClickableIcon from '../../base/ui/components/web/ClickableIcon';

interface IProps {

    /**
     * The function to translate human-readable text.
     */
    t: Function;
}

const useStyles = makeStyles()(() => {
    return {
        container: {
            width: '90vw',
            height: 'auto',
            marginTop: '2rem !important',
            position: 'relative'
        },
        contentContainer: {
            width: '100%',
            height: '1000px',
            border: 'none'
        },
        modalHeaderCloseButton: {
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            backgroundColor: 'black'
        }
    };
});

const HelpDialog = ({ t }: IProps) => {
    const { classes } = useStyles();

    const dispatch = useDispatch();
    const onClose = () => {
        console.log('onClose');
        dispatch(hideDialog());
    };

    return (
        <BaseDialog
            className = { classes.container }
            size = 'large'
            titleKey = { 'Hilfe' }>
            <ClickableIcon
                accessibilityLabel = { t('dialog.accessibilityLabel.close') }
                className = { classes.modalHeaderCloseButton }
                icon = { IconCloseLarge }
                id = 'modal-header-close-button'
                onClick = { onClose } />

            <iframe
                className = { classes.contentContainer }
                src = 'https://conference.inklusiva-call.de/help/meeting/'
                title = { t('toolbar.helpDialogTitle') } />
        </BaseDialog>
    );
};

export default translate(connect()(HelpDialog));
