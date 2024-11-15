import React from 'react';
import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { IJitsiConference } from '../../../base/conference/reducer';
import { IconChatUnread } from '../../../base/icons/svg';
import { translate } from '../../../base/i18n/functions';
import Button from '../../../base/ui/components/web/Button';
import { BUTTON_TYPES } from '../../../base/ui/constants.any';
import { WithTranslation } from 'react-i18next';

interface IProps extends WithTranslation {

    _conference?: IJitsiConference;

    _transcriptionLink?: string;
}

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const TranscriptLink = ({
    _transcriptionLink,
    _conference,
    t
}: IProps) => {

    const onClick = () => {
        window.open(_transcriptionLink, '_blank');
    };

    if (_transcriptionLink && _transcriptionLink !== '') {
        return (
            <Button
                accessibilityLabel = { t('transcribing.accessibility.openTranscriptLink') }
                className = { 'ml-05 infobar-interactable infobarButton' }
                icon = { IconChatUnread }
                label = { t('transcribing.accessibility.openTranscriptLink') }
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
        _transcriptionLink: state['features/base/conference'].conference?.transcriptionLink,
        _conference: state['features/base/conference'].conference
    };
};

export default translate(connect(mapStateToProps)(TranscriptLink));
