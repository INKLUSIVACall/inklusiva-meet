import React from 'react';
import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { IconChatUnread } from '../../../base/icons/svg';
import Button from '../../../base/ui/components/web/Button';
import { BUTTON_TYPES } from '../../../base/ui/constants.any';
import { getTranscriptionLink } from '../../../inklusiva/transcription/functions.web';

interface IProps {
    _transcriptionLink?: string;
}

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const TranscriptLink = ({
    _transcriptionLink
}: IProps) => {

    const onClick = () => {
        window.open(_transcriptionLink, '_blank');
    };

    if (_transcriptionLink && _transcriptionLink !== '') {
        return (
            <Button
                accessibilityLabel = { 'Nur-Lese-Link öffnen' }
                className = { 'ml-05' }
                icon = { IconChatUnread }
                label = { 'Nur-Lese-Link öffnen' }
                // eslint-disable-next-line react/jsx-no-bind
                onClick = { onClick }
                size = 'small'
                type = { BUTTON_TYPES.SECONDARY } />
        );
    }

    return null;

};

const mapStateToProps = (state: IReduxState) => {
    return {
        _transcriptionLink: getTranscriptionLink(state)
    };
};

export default connect(mapStateToProps)(TranscriptLink);