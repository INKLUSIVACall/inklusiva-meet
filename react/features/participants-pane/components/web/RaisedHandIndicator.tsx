import React from 'react';
import { makeStyles } from 'tss-react/mui';
import clsx from 'clsx';

import Icon from '../../../base/icons/components/Icon';
import { IconRaiseHand } from '../../../base/icons/svg';

import { IReduxState } from '../../../app/types';
import { IStateful } from '../../../base/app/types';
import { getRaisedHandPosition } from '../../functions';
import { getLocalParticipant } from '../../../base/participants/functions';
import { connect } from 'react-redux';


const useStyles = makeStyles()(theme => {
    return {
        indicator: {
            backgroundColor: theme.palette.warning02,
            borderRadius: `${Number(theme.shape.borderRadius) / 2}px`,
            height: '20px',
            width: '40px',
            padding:'0 !important',
            display:'flex',
        },
        indicatorText: {
            color: theme.palette.icon04,
            flexGrow: 1,
        }
    };
});

interface IProps {
    participantID: string;
    state: IReduxState;
}

function RaisedHandIndicator({
    participantID,
    state
}:IProps) {
    const { classes: styles, theme } = useStyles();
    const raisedHandPosition = getRaisedHandPosition(state, participantID);
    const iconStyle = {
        display: 'inline',
        flexGrow: 1,
    };
    return (
        <div className = { clsx(styles.indicator, 'raised-hand-indicator') }>
            <Icon
                color = { theme.palette.icon04 }
                size = { 16 }
                src = { IconRaiseHand }
                style = { iconStyle }/>
                <span className = {clsx(styles.indicatorText)}>
                    {raisedHandPosition}
                </span>
        </div>
    );
};

function _mapStateToProps(state: IReduxState) {
    return {
        state: state,
    };
}

export default connect(_mapStateToProps)(RaisedHandIndicator);
