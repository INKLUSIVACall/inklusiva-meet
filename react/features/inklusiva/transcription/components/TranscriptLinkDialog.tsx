import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '../../../base/ui/components/web/Dialog';
import { getTranscriptionLink } from '../functions.web';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { updateTranscriptLink } from '../actions.web';
import { TextField } from '@mui/material';

const TranscriptLinkDialog = () => {
    let transcriptionLink = useSelector(getTranscriptionLink);
    const { conference } = useSelector(state => state['features/base/conference']);
    //const isCaptioner = conference.checkLocalHasRole(IC_ROLES.CAPTIONER);
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
                        type = 'text'
                        onChange={ event => transcriptionLink = event.target.value } />
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

export default TranscriptLinkDialog;
