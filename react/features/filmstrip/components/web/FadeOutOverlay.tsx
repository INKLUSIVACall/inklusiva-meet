import { withStyles } from '@mui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';

/**
 * The type of the React {@code Component} props of {@link FadeOutOverlay}.
 */
export interface IProps {

    /**
     * An object containing CSS classes.
     */
    classes: any;

    /**
     * Large Video Opacity.
     */
    largeVideoOpacity: number;

    /**
     * Opacity of the overlay.
     */
    opacity: number;

}

const defaultStyles = () => {
    return {
        containerFade: {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            borderRadius: '4px',
            backgroundColor: '#000000',
            zIndex: 2,
            opacity: 0
        }
    };
};

/**
 * Implements a fade out overlay.
 *
 * @augments Component
 */
class FadeOutOverlay extends Component<IProps> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            classes, opacity
        } = this.props;

        return (
            <div
                className = { classes.containerFade }
                style = {{ opacity }} />
        );
    }
}

function _mapStateToProps(state: IReduxState, ownProps: any): any {
    const { opacity } = ownProps;

    return {
        opacity
    };
}

export default connect(_mapStateToProps)(withStyles(defaultStyles)(FadeOutOverlay));
