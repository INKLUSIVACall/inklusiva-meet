import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate } from 'react-window';

import { IReduxState } from '../../../app/types';
import { getLocalParticipant } from '../../../base/participants/functions';
import { getHideSelfView } from '../../../base/settings/functions.any';
import { LAYOUTS } from '../../../video-layout/constants';
import { getCurrentLayout } from '../../../video-layout/functions.web';
import { FILMSTRIP_TYPE, TILE_ASPECT_RATIO, TILE_HORIZONTAL_MARGIN } from '../../constants';
import { getActiveParticipantsIds, showGridInVerticalView } from '../../functions.web';

import Thumbnail from './Thumbnail';
import { IC_ROLES } from '../../../base/conference/icRoles';

/**
 * The type of the React {@code Component} props of {@link SignLangThumbnailWrapper}.
 */
interface IProps {
    /**
     * The horizontal offset in px for the thumbnail. Used to center the thumbnails in the last row in tile view.
     */
    _horizontalOffset?: number;

    /**
     * The ID of the participant associated with the Thumbnail.
     */
    _participantID?: string;

    /**
     * The width of the thumbnail. Used for expanding the width of the thumbnails on last row in case
     * there is empty space.
     */
    _thumbnailWidth?: number;    


    _initialPosition: { x:number, y:number };
    /**
     * The styles coming from react-window.
     */
    //style: Object;
}

/**
 * A wrapper Component for the Thumbnail that translates the react-window specific props
 * to the Thumbnail Component's props.
 */
class SignLangThumbnailWrapper extends Component<IProps> {
    shouldComponentUpdate: (p: any, s: any) => boolean;    

    _position: { x: number, y: number };

    /**
     * Creates new ThumbnailWrapper instance.
     *
     * @param {IProps} props - The props of the component.
     */
    constructor(props: IProps) {
        super(props);

        this._dragging = false;
        this._position = { x : props._initialPosition.x, y : props._initialPosition.y };

        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

        document.addEventListener('mouseup', (ev) => { return this._mouseUp(ev); });
        document.addEventListener('mousemove', (ev) => { return this._mouseMove(ev); });
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            _horizontalOffset = 0,
            _participantID,
            _thumbnailWidth                        
        } = this.props;

        if (typeof _participantID !== 'string') {
            return null;
        }        

        return (
            <div style= {{ position: "absolute", height: "80%", width: "35%", zIndex: 10, left: this._position.x, top: this._position.y }}>
                <div style= {{ position: "absolute", height: "5%", width: "100%", backgroundColor:"lightblue", cursor: "grab" }} 
                    onMouseDown={ (ev) => { return this._mouseDown(ev); } } >
                    &nbsp;
                </div>
                <div style= {{ position: "absolute", height: "95%", width: "100%", top: "5% "}}>
                    <Thumbnail
                        filmstripType = { FILMSTRIP_TYPE.MAIN }
                        horizontalOffset = { _horizontalOffset }
                        key = { `remote_${_participantID}` }
                        participantID = { _participantID }
                        width = { _thumbnailWidth } />
                </div>
            </div>
        );
    }

    _dragging: boolean = false;

    _dragMouseStart: {x: number, y: number};
    _dragPositionStart: {x: number, y: number};
    
    _mouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) : boolean {
        if (!this._dragging) {
            //Record mouse location
            this._dragMouseStart = {x: event.clientX, y: event.clientY };

            //Record object location
            this._dragPositionStart = { x: this._position.x, y: this._position.y };
        }

        this._dragging = true;

        return true;
    }

    _mouseUp(event: MouseEvent) : boolean {
        this._dragging = false;

        return true;
    }

    _mouseMove(event: MouseEvent) : boolean {
        if (this._dragging) {
            this._position = {
                x: this._dragPositionStart.x + (event.clientX - this._dragMouseStart.x),
                y: this._dragPositionStart.y + (event.clientY - this._dragMouseStart.y)
            };            

            this.forceUpdate();
        }

        return true;
    }
    
}

/**
 * Maps (parts of) the Redux state to the associated {@code SignLangThumbnailWrapper}'s props.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The props passed to the component.
 * @private
 * @returns {IProps}
 */
function _mapStateToProps(state: IReduxState, ownProps: { participantId: string }) {   
    const { participantId } = ownProps;

    return {
        _initialPosition: { x: 10, y: 10 },
        _participantID: participantId
    };
}

export default connect(_mapStateToProps)(SignLangThumbnailWrapper);
