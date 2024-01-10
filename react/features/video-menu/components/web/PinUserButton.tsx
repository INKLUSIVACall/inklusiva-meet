import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { IconPin } from '../../../base/icons/svg';
import Button from '../../../base/ui/components/web/Button';

interface IProps {
    visible: boolean;
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

const PinUserButton = ({
    visible
}: IProps) => {
    const { classes } = useStyles();
    const _onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('123456', 'PinUserButton clicked');
    };

    return (
        visible
            ? <Button
                accessibilityLabel = 'Nutzer anpinnen'
                className = { classes.pinUserButton }
                icon = { IconPin }
                onClick = { _onClick }
                size = 'small' />
            : null
    );
};

function _mapStateToProps(state: IReduxState) {

    return {
    };
}

export default connect(_mapStateToProps)(PinUserButton);
