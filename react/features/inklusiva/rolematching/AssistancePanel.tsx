import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { IReduxState } from '../../app/types';
import { getCurrentConference } from '../../base/conference/functions';
import { ICRole, IC_ROLES } from '../../base/conference/icRoles';
import { IJitsiConference } from '../../base/conference/reducer';
import { getLocalParticipant, getRemoteParticipants, isParticipantModerator } from '../../base/participants/functions';
import { IParticipant } from '../../base/participants/types';
import Button from '../../base/ui/components/web/Button';

import { getParticipant, hideAssistancePanel, setParticipant } from './functions';

const styles = (theme: Theme) => {
    return {
        assisteesPanel: {
            maxWidth: '600px',
            height: 'auto',
            backgroundColor: theme.palette.ui01,
            position: 'absolute' as const,
            bottom: 'calc(50% - 140px)',
            left: 'calc(50% - 225px)',
            padding: theme.spacing(3),
            borderRadius: '10px'
        },
        header: {
            width: '100%',
            boxSizing: 'border-box' as const,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(3)
        },
        inputblockContainer: {
            margin: 0,
            display: 'flex',
            flexDirection: 'column' as const,
            gap: theme.spacing(3)
        },
        inputDescription: {
            fontSize: '1rem',
            display: 'inline-grid',
            alignContent: 'center'
        },
        inputblock: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: theme.spacing(3)
        },
        inputButton: {
            fontSize: '1rem',
            cursor: 'pointer',
            alignSelf: 'center',
            borderRadius: '20px',
            padding: '0.5rem 1rem !important'
        },
        closeButton: {
            position: 'absolute' as const,
            top: '5px',
            right: '15px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            background: 'transparent',
            border: 'none'
        },
        headline: {
            fontSize: '1.5rem',
            color: theme.palette.text01,
            marginBottom: theme.spacing(3),
            marginTop: 0
        },
        description: {
            fontSize: '1rem',
            marginBottom: theme.spacing(3)
        },
        list: {
            listStyleType: 'none',
            paddingLeft: '0px'
        },
        participantEntry: {
            display: 'flex',
            flexDirection: 'row' as const,
            marginBottom: '1rem'
        },
        participantName: {
            flexGrow: 1,
            fontSize: '1.2rem',
            color: theme.palette.text01,
            fontWeight: 500,
            alignSelf: 'center'
        },
        participantButton: {
            fontSize: '1.2rem',
            cursor: 'pointer',
            alignSelf: 'center',
            borderRadius: '30px',
            padding: '0.5rem 1rem !important'
        }
    };
};

interface IProps {

    /**
     * JitsiConference instance.
     */
    _conference?: IJitsiConference;

    /**
     * Whether I am an assistant.
     */
    _iAmAssistant: boolean;

    /**
     * Wether I am assisted or not.
     */
    _iAmAssisted: boolean;

    /**
     * The local participant.
     */
    _localParticipant?: IParticipant;

    /**
     * The participant to send the assistance message to.
     */
    _participant?: IParticipant;

    /**
     * Available participants to send an assistance message to.
     */
    _participantsList: IParticipant[];

    /**
     * Should the panel be visible or not.
     */
    _visible: boolean;

    /**
     * CSS classes object.
     */
    classes: any;
}

const AssistancePanel = ({
    classes,
    _conference,
    _localParticipant,
    _participant,
    _participantsList,
    _visible,
    _iAmAssisted,
    _iAmAssistant
}: IProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const _onClickClose = () => {
        dispatch(hideAssistancePanel());
    };

    const onClickRequest = (participant: IParticipant) => {
        dispatch(setParticipant(participant));
        _conference?.addLocalICRole(IC_ROLES.ASSISTED, participant?.id);
        dispatch(hideAssistancePanel());
    };

    const onClickRelease = () => {
        _conference?.removeLocalICRole(IC_ROLES.ASSISTED, _participant?.id);
        if (_localParticipant) {
            _conference?.removeICRole(_participant?.id, IC_ROLES.ASSISTANT, _localParticipant.id);
        }
        dispatch(hideAssistancePanel());
    };

    if (_visible) {
        if (!_iAmAssisted) {
            return (
                <div
                    aria-modal = 'true'
                    className = { classes.assisteesPanel }
                    role = 'dialog'>
                    <button
                        className = { classes.closeButton }
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick = { _onClickClose }
                        role = 'button'>
                        x
                    </button>
                    <h1 className = { classes.headline }>{t('assistancePanel.headline')}</h1>
                    <p className = { classes.description }>{t('assistancePanel.desc1')}</p>
                    <p className = { classes.description }>{t('assistancePanel.desc2')}</p>
                    <div className = { classes.inputblockContainer }>
                        {_participantsList.length > 0
                            && !_iAmAssistant
                            && _participantsList.map(participant => (
                                <div
                                    className = { classes.inputblock }
                                    key = { participant.id }>
                                    <div className = { classes.inputDescription }>{participant.name}</div>
                                    <Button
                                        accessibilityLabel = { t('toolbar.accessibility.assistanceRequest') }
                                        className = { classes.inputButton }
                                        label = { t('toolbar.assistanceRequest') }
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onClick = { () => onClickRequest(participant) } />
                                </div>
                            ))}
                        {(_participantsList.length <= 0 || _iAmAssistant) && (
                            <div className = { classes.inputblock }>
                                <div className = { classes.inputDescription }>
                                    {t('toolbar.assistanceParticipantsListEmpty')}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div
                aria-modal = 'true'
                className = { classes.assisteesPanel }
                role = 'dialog'>
                <button
                    className = { classes.closeButton }
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick = { _onClickClose }
                    role = 'button'>
                    x
                </button>
                <h1 className = { classes.headline }>{t('assistancePanel.headlineRelease')}</h1>
                <p className = { classes.description }>{t('assistancePanel.descRelease')}</p>
                <button
                    className = { [ classes.participantButton, 'primary' ].join(' ') }
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick = { onClickRelease }>
                    {t('assistancePanel.buttonRelease')}
                </button>
            </div>
        );
    }

    return <></>;
};

const mapStateToProps = (state: IReduxState) => {
    const conference = getCurrentConference(state);
    const localParticipant = getLocalParticipant(state);
    const remoteParticipants = Array.from(getRemoteParticipants(state).values());
    const assistancePanelVisible = state['features/inklusiva/rolematching'].assistancePanelVisible;

    let amIAssisted = false;
    let amIAssistant = false;

    localParticipant?.icRoles?.forEach((role: ICRole) => {
        if (role.name === IC_ROLES.ASSISTED) {
            amIAssisted = true;
        }
    });
    localParticipant?.icRoles?.forEach((role: ICRole) => {
        if (role.name === IC_ROLES.ASSISTANT) {
            amIAssistant = true;
        }
    });

    const remoteParticipantsList = remoteParticipants // no local participants
        .filter((participant: IParticipant) => !conference?.checkMemberHasRole(
            participant.id, IC_ROLES.ASSISTANT)) // no assistants
        .filter((participant: IParticipant) => !conference?.checkMemberHasRole(
            participant.id, IC_ROLES.ASSISTED)) // no assistees
        .filter((participant: IParticipant) => !isParticipantModerator(participant)); // no moderators

    return {
        _conference: conference,
        _iAmAssistant: amIAssistant,
        _iAmAssisted: amIAssisted,
        _localParticipant: localParticipant,
        _participant: getParticipant(state),
        _participantsList: remoteParticipantsList,
        _visible: assistancePanelVisible
    };
};

export default withStyles(styles)(connect(mapStateToProps)(AssistancePanel));
