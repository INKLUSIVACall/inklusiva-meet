import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IC_ROLES } from '../../../base/conference/icRoles';
import Dialog from '../../../base/ui/components/web/Dialog';
import { updateTranscriptLink } from '../actions.web';
import { getTranscriptionLink } from '../functions.web';


const useStyles = makeStyles()(theme => {
    return {
        transcriptionLinkDialogText: {
            marginBottom: '1em'
        },
        transcriptionLinkDialogInput: {
            width: '100%'
        }
    };
});

const TranscriptLinkDialog = () => {
    let transcriptionLink = useSelector(getTranscriptionLink);
    const { conference } = useSelector(state => state['features/base/conference']);

    // const isCaptioner = conference.checkLocalHasRole(IC_ROLES.CAPTIONER);
    const isCaptioner = true;
    const dispatch = useDispatch();

    const { classes } = useStyles();

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
                    <p
                        className = { classes.transcriptionLinkDialogText } >
                        Hier können Sie den Link zum Transkript ändern.
                    </p>
                    <label
                        htmlFor = 'transcriptionLink'
                        id = 'transcriptionLinkLabel'>
                        Link zum Transkript
                    </label>
                    <input
                        className = { classes.transcriptionLinkDialogInput }
                        defaultValue = { transcriptionLink }
                        id = 'transcriptionLink'
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

export default TranscriptLinkDialog;
