import React from 'react';
import { makeStyles } from 'tss-react/mui';
import clsx from 'clsx';

import Icon from '../../../base/icons/components/Icon';
import { IconRaiseHand } from '../../../base/icons/svg';

const useStyles = makeStyles()(theme => {
    return {
        indicator: {
            backgroundColor: theme.palette.warning02,
            borderRadius: `${Number(theme.shape.borderRadius) / 2}px`,
            height: '20px',
            width: '20px',
            padding:'0 !important',
        }
    };
});

export const RaisedHandIndicator = () => {
    const { classes: styles, theme } = useStyles();

    return (
        <div className = { clsx(styles.indicator, 'raised-hand-indicator') }>
            <Icon
                color = { theme.palette.icon04 }
                size = { 16 }
                src = { IconRaiseHand } />
        </div>
    );
};
