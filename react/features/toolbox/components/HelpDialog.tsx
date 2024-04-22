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
            width: '70vw',
            height: '75vh'
        },
        contentContainer: {
            width: '100%',
            height: '75vh'
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
            titleKey = { t('toolbar.helpDialogTitle') }>
            <iframe
                className = { classes.contentContainer }
                src = 'https://conference.inklusiva-call.de/help/meeting/'
                title = { t('toolbar.helpDialogTitle') } />
        </Dialog>
    );
};

export default translate(connect()(HelpDialog));
