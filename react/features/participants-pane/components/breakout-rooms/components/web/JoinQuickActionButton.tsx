import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { createBreakoutRoomsEvent } from '../../../../../analytics/AnalyticsEvents';
import { sendAnalytics } from '../../../../../analytics/functions';
import { IStateful } from '../../../../../base/app/types';
import { getRemoteParticipantCountWithFake } from '../../../../../base/participants/functions';
import Button from '../../../../../base/ui/components/web/Button';
import { moveToRoom } from '../../../../../breakout-rooms/actions';

interface IProps {

    /**
     * The room to join.
     */
    room: {
        id: string;
        jid: string;
    };
}

const useStyles = makeStyles()(theme => {
    return {
        button: {
            marginRight: theme.spacing(2)
        }
    };
});

const JoinActionButton = ({ room }: IProps) => {
    const { classes: styles } = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onJoinRoom = useCallback(e => {
        e.stopPropagation();
        sendAnalytics(createBreakoutRoomsEvent('join'));
        dispatch(moveToRoom(room.jid));
    }, [ dispatch, room ]);

    if (useSelector((state: IStateful) => getRemoteParticipantCountWithFake(state)) > 0) {
        return (
            <Button
                accessibilityLabel = { t('breakoutRooms.actions.join') }
                className = { styles.button }
                labelKey = { 'breakoutRooms.actions.join' }
                onClick = { onJoinRoom }
                size = 'small'
                testId = { `join-room-${room.id}` } />
        );
    }

    return null;
};

export default JoinActionButton;
