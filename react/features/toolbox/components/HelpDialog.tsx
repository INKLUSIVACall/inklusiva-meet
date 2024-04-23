import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { translate } from '../../base/i18n/functions';
import Dialog from '../../base/ui/components/web/Dialog';

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
            height: '75vh'
        },
        contentContainer: {
            width: '100%',
            height: 'calc(100vh - 480px)',
            minHeight: 'calc(100vh - 480px)',
            border: 'none',
            borderRadius: '0.5rem'
        }
    };
});

const HelpDialog = ({ t }: IProps) => {
    const { classes } = useStyles();

    return (
        <Dialog
            back = {{ hidden: true }}
            className = { classes.container }
            ok = {{ hidden: true }}
            titleKey = { 'Hilfe' }>
            <iframe
                className = { classes.contentContainer }
                src = 'https://conference.inklusiva-call.de/help/meeting/'
                title = { t('toolbar.helpDialogTitle') } />
        </Dialog>
    );
};

export default translate(connect()(HelpDialog));
