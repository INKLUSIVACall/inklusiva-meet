import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { translate } from '../../../base/i18n/functions';
import { getLocalParticipant } from '../../../base/participants/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import Tabs from '../../../base/ui/components/web/Tabs';
import PollsPane from '../../../polls/components/web/PollsPane';
import { WithTranslation } from 'react-i18next';

interface IProps extends WithTranslation {

}

const useStyles = makeStyles()(theme => {
    return {
        chatHeader: {
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
        chatPanel: {
            display: 'flex',
            flexDirection: 'column',

            // extract header + tabs height
            height: 'calc(100% - 110px)'
        }
    };
});

const ClosedCaptionHistoy({
    t
}: IProps) => {
    const { classes, cx } = useStyles();

    // TODO

    function renderHistory() {
        return (
            null
        )
    }
};