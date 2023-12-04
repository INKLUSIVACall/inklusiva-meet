import React from 'react';
import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { getToolbarButtons } from '../../../base/config/functions.web';
import { isMobileBrowser } from '../../../base/environment/utils';
import { LAYOUTS } from '../../../video-layout/constants';
import { getCurrentLayout } from '../../../video-layout/functions.web';
import { IC_ROLES } from '../../../base/conference/icRoles';
import {
    ASPECT_RATIO_BREAKPOINT,
    FILMSTRIP_BREAKPOINT,
    FILMSTRIP_BREAKPOINT_OFFSET,
    FILMSTRIP_TYPE,
    TOOLBAR_HEIGHT,
    TOOLBAR_HEIGHT_MOBILE } from '../../constants';
import { isFilmstripResizable, showGridInVerticalView } from '../../functions.web';

import Filmstrip from './Filmstrip';
import { IJitsiParticipant } from '../../../base/participants/types';
import SignLangThumbnailWrapper from './SignLangThumbnailWrapper';

interface IProps {
    /**
     * The participants in the call.
     */
    _remoteParticipants: Array<Object>;

    /**
     * The length of the remote participants array.
     */
    _remoteParticipantsLength: number;

    /**
     * The height of the thumbnail.
     */
    _thumbnailHeight?: number;

    /**
     * The width of the thumbnail.
     */
    _thumbnailWidth?: number;

    /**
     * Additional CSS class names to add to the container of all the thumbnails.
     */
    _videosClassName: string;
}

const SignLangTranslatorFilmStrip = (props: IProps) => (
    <span className="signlang-filmstrip">
        {
            props._remoteParticipants.map((participant, i) => {
                const participantId : string = participant;

                return (<SignLangThumbnailWrapper participantId={participantId} { ...props } />)                    
            })
        }
    </span>
);

/**
 * Maps (parts of) the Redux state to the associated {@code Filmstrip}'s props.
 *
 * @param {Object} state - The Redux state.
 * @param {any} _ownProps - Components' own props.
 * @private
 * @returns {IProps}
 */
function _mapStateToProps(state: IReduxState, _ownProps: any) {
    const toolbarButtons = getToolbarButtons(state);
    const { remoteParticipants: remoteParticipantsOriginal, width: verticalFilmstripWidth } = state['features/filmstrip'];
    
    const { assistant } = state['features/inklusiva/userdata'];
    let remoteParticipants:string[] = [];
    if (assistant.signLang.display === "window") {
        const { conference } = state['features/base/conference'];
        remoteParticipantsOriginal?.forEach((participantId: string) => {
            if ( (conference?.checkMemberHasRole(participantId, IC_ROLES.SIGN_LANG_TRANSLATOR))) {
                remoteParticipants.push(participantId);
            }
        });
    } else {
        remoteParticipants = [];
    }

    const { clientHeight, clientWidth } = state['features/base/responsive-ui'];
    let availableSpace = clientHeight;
    let filmstripPadding = 0;

    if (isMobileBrowser()) {
        availableSpace -= TOOLBAR_HEIGHT_MOBILE;
    } else {
        availableSpace -= TOOLBAR_HEIGHT;
    }    

    return {
        _filmstripHeight: clientHeight,
        _filmstripWidth: clientWidth,
        _remoteParticipants: remoteParticipants,        
        _remoteParticipantsLength: remoteParticipants.length
    };
}

export default connect(_mapStateToProps)(SignLangTranslatorFilmStrip);
