import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { translate } from '../../../base/i18n/functions';
import Dialog from '../../../base/ui/components/web/Dialog';
import { updateTranscriptLink } from '../actions.web';
import { getTranscriptionLink } from '../functions.web';


const useStyles = makeStyles()(() => {
    return {
        transcriptionLinkDialogText: {
            marginBottom: '1em'
        },
        transcriptionLinkDialogInput: {
            width: '100%'
        }
    };
});

interface IProps {

    /**
     * Whether the current user is a captioner.
     *
     * @returns {boolean}
     */
    isCaptioner: boolean;

}
const TranscriptLinkDialog = (props: IProps) => {

    let transcriptionLink = useSelector(getTranscriptionLink);

    const dispatch = useDispatch();

    const { classes } = useStyles();

    const _onSubmit = () => {
        dispatch(updateTranscriptLink(transcriptionLink ?? ''));
    };

    if (props.isCaptioner) {
        return (
            <Dialog
                cancel = {{ translationKey: 'Abbrechen' }}
                ok = {{ translationKey: 'Speichern' }}
                // eslint-disable-next-line react/jsx-no-bind
                onSubmit = { _onSubmit }
                size = { 'medium' }
                titleKey = 'Lese-Link ändern' >
                <div>
                    <p
                        className = { classes.transcriptionLinkDialogText } >
                        Hier können Sie den Lese-Link anpassen.
                    </p>
                    <label
                        htmlFor = 'transcriptionLink'
                        id = 'transcriptionLinkLabel'>
                        Lese-Link
                    </label>
                    <input
                        className = { classes.transcriptionLinkDialogInput }
                        defaultValue = { transcriptionLink }
                        id = 'transcriptionLink'
                        // eslint-disable-next-line react/jsx-no-bind
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
            titleKey = 'Lese-Link' >
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
        isCaptioner: conference?.checkLocalHasRole(IC_ROLES.CAPTIONER) ?? false
    };
};

export default translate(connect(_mapStateToProps)(TranscriptLinkDialog));
