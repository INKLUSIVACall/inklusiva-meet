import React from 'react';
import { connect, connectAdvanced, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IconChatUnread, IconLink } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { getTranscriptionLink } from '../../../inklusiva/transcription/functions.web';
import Button from '../../../base/ui/components/web/Button';
import { BUTTON_TYPES } from '../../../base/ui/constants.any';
import { IReduxState } from '../../../app/types';

const useStyles = makeStyles()(() => {
    return {
        transcriptionLinkLabelForUser: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: '#fff',
            textDecoration: 'underline'
        }
    };
});

interface IProps {
    _transcriptionLink: string;
}

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const TranscriptLink = ({
    _transcriptionLink
}: IProps) => {
    const { classes } = useStyles();

    const onClick = () => {
        window.open(_transcriptionLink, '_blank');
    };

    if (_transcriptionLink && _transcriptionLink !== '') {
        return (
            <Button
                accessibilityLabel = { 'Nur-Lese-Link öffnen' }
                className = { 'mr-05' }
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
