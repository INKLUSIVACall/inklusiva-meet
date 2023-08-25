import React, { Component } from 'react';
import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import { IReduxState, IStore } from '../../../app/types';
import { connect } from 'react-redux';

/**
 * The type of the React {@code Component} props of {@link FadeOutOverlay}.
 */
export interface IProps  {
    /**
     * Opacity of the overlay.
     */
    opacity: number;

    /**
     * Is local?
     */
    local: boolean;

    /**
     * Participant ID.
     */
    partcipantId?: string;

    /**
     * An object containing CSS classes.
     */
    classes: any;
}

const defaultStyles = (theme: Theme) => {
    return {
        containerFade: {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            borderRadius: '4px',
            backgroundColor: '#000000',
            zIndex: 1,
            opacity: 0
        }
    }
}

/**
 * Implements a fade out overlay.
 *
 * @augments Component
 */
class FadeOutOverlay extends Component<IProps> {
    /**
     * Initializes a new Thumbnail instance.
     *
     * @param {Object} props - The read-only React Component props with which
     * the new instance is to be initialized.
     */
    constructor(props: IProps) {
        super(props);
    }

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
            <div className = { classes.containerFade } style={{opacity: 1 - opacity}} />
        );
    }
}

/**
 * Maps (parts of) the redux state to the associated props for this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The own props of the component.
 * @private
 */
function _mapStateToProps(state: IReduxState, ownProps: any): any {
    const { participantId, local } = ownProps;

    const { participantsOpacity, localOpacity } = state['features/filmstrip'];

    let resultOpacity = 1;
    if (local) {
        resultOpacity = localOpacity ?? 1;
    } else {
        console.log(participantsOpacity);
        console.log(participantId);
        resultOpacity = participantsOpacity ? (participantsOpacity[participantId] ?? 1):1;
    }

    return {
        participantId: participantId,
        local: local,
        opacity: resultOpacity
    };
}

export default connect(_mapStateToProps)(withStyles(defaultStyles)(FadeOutOverlay));
