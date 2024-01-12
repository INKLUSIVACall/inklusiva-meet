import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { IconPin, IconPinned } from '../../../base/icons/svg';
import Button from '../../../base/ui/components/web/Button';
import { pinUser, unpinUser } from '../../../inklusiva/pinuser/actions';
import { isUserPinned } from '../../../inklusiva/pinuser/functions';

interface IProps {

    /**
     * Whether the participant is pinned or not.
     */
    _userPinned: boolean;

    /**
     * Id of the participant for which the component is displayed.
     */
    participantId?: string;

    /**
     * Whether the buttton is visible or not.
     */
    visible?: boolean;
}

const useStyles = makeStyles()(() => {
    return {
        pinUserButton: {
            padding: '3px !important',
            borderRadius: '4px',

            '& svg': {
                width: '18px',
                height: '18px'
            }
        }
    };
});

const PinUserButton = ({ visible, _userPinned, participantId }: IProps) => {
    const { classes } = useStyles();

    const dispatch = useDispatch();

    const _onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (_userPinned) {
            dispatch(unpinUser(participantId ?? null));
        } else {
            dispatch(pinUser(participantId ?? null));
        }
    };

    return visible ? (
        <Button
            accessibilityLabel = 'Nutzer anpinnen'
            className = { classes.pinUserButton }
            icon = { _userPinned ? IconPinned : IconPin }
            // eslint-disable-next-line react/jsx-no-bind
            onClick = { _onClick }
            size = 'small' />
    ) : null;
};

function _mapStateToProps(state: IReduxState, ownProps: Partial<IProps>) {
    const userPinned = isUserPinned(state, ownProps.participantId);

    return {
        visible:
            userPinned
            || (ownProps.visible && state['features/base/participants'].local?.id !== ownProps.participantId),
        participantId: ownProps.participantId,
        _userPinned: userPinned
    };
}

export default connect(_mapStateToProps)(PinUserButton);
