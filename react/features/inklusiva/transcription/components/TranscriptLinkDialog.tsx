import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { IJitsiConference } from '../../../base/conference/reducer';
import Dialog from '../../../base/ui/components/web/Dialog';
import { updateTranscriptLink } from '../actions.web';
import { getTranscriptionLink } from '../functions.web';

/**
 * The type of the React {@code Component} props of
 * {@link ConnectedSettingsDialog}.
 */
interface IProps {
    _conference?: IJitsiConference;
}
const TranscriptLinkDialog = (props: IProps) => {
    let transcriptionLink = useSelector(getTranscriptionLink);

    const _conference = props._conference;

    const isCaptioner = true;
    const dispatch = useDispatch();

    const _onSubmit = () => {
        dispatch(updateTranscriptLink(transcriptionLink ?? ''));
    };

    if (isCaptioner) {
        return (
            <Dialog
                cancel = {{ translationKey: 'Abbrechen' }}
                ok = {{ translationKey: 'Speichern' }}
                onSubmit = { _onSubmit }
                size = { 'medium' }
                titleKey = 'Transkript-Link' >
                <div>
                    <p>
                        Hier können Sie den Link zum Transkript ändern:
                    </p>
                    <input
                        defaultValue = { transcriptionLink }
                        onChange = { event => transcriptionLink = event.target.value }
                        type = 'text' />
                </div>
            </Dialog>
        );
    }

    return (
        <Dialog
            cancel = {{ hidden: true }}
            ok = {{ hidden: true }}
            size = { 'medium' }
            titleKey = 'Transkript-Link' >
            <div>
                <p>
                    Unter folgendem Link können Sie das Transkript einsehen:
                </p>
                <a
                    href = { transcriptionLink }
                    rel = 'noreferrer'
                    target = '_blank' >
                    { transcriptionLink }
                </a>
            </div>
        </Dialog>
    );
};

const _mapStateToProps = (state: IReduxState) => {
    const { conference } = state['features/base/conference'];

    return {
        _conference: conference
    };
};

export default connect(_mapStateToProps)(TranscriptLinkDialog);
