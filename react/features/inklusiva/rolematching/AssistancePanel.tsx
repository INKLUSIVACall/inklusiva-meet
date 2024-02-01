import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { IReduxState } from '../../app/types';
import { getCurrentConference } from '../../base/conference/functions';
import { ICRole, IC_ROLES } from '../../base/conference/icRoles';
import { IJitsiConference } from '../../base/conference/reducer';
import { getLocalParticipant, getRemoteParticipants } from '../../base/participants/functions';
import { IParticipant } from '../../base/participants/types';

import { hideAssistancePanel } from './functions';

const styles = (theme: Theme) => {
    return {
        assisteesPanel: {
            maxWidth: '600px',
            height: 'auto',
            backgroundColor: theme.palette.ui01,
            position: 'absolute' as const,
            bottom: 'calc(50% - 140px)',
            left: 'calc(50% - 300px)',
            padding: theme.spacing(3),
            borderRadius: '10px'
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
     * The assistant.
     */
    _assistant?: IParticipant;

    /**
     * JitsiConference instance.
     */
    _conference?: IJitsiConference;

    /**
     * Wether I am assisted or not.
     */
    _iAmAssited: boolean;

    /**
     * Should the panel be visible or not.
     */
    _visible: boolean;

    /**
     * CSS classes object.
     */
    classes: any;
}

const AssistancePanel = ({ classes, _conference, _visible, _iAmAssited, _assistant }: IProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    console.log(_assistant);

    const _onClickRequestAssitance = () => {
        _conference?.addLocalICRole(IC_ROLES.ASSISTED);
        dispatch(hideAssistancePanel());
    };

    const _onClickReleaseAssistance = () => {
        _conference?.removeLocalICRole(IC_ROLES.ASSISTED);
        _conference?.removeICRole(_assistant?.id, IC_ROLES.ASSISTANT);
        dispatch(hideAssistancePanel());
    };

    const _onClickClose = () => {
        dispatch(hideAssistancePanel());
    };

    if (_visible) {
        if (!_iAmAssited) {
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
                    <button
                        className = { [ classes.participantButton, 'primary' ].join(' ') }
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick = { _onClickRequestAssitance }>
                        {t('assistancePanel.buttonAssist')}
                    </button>
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
                    onClick = { _onClickReleaseAssistance }>
                    {t('assistancePanel.buttonRelease')}
                </button>
            </div>
        );
    }

    return null;
};

const mapStateToProps = (state: IReduxState) => {
    const conference = getCurrentConference(state);
    const assistancePanelVisible = state['features/inklusiva/rolematching'].assistancePanelVisible;
    const localParticipant = getLocalParticipant(state);
    let amIAssisted = false;

    localParticipant?.icRoles?.forEach((role: ICRole) => {
        if (role.name === IC_ROLES.ASSISTED) {
            amIAssisted = true;
        }
    });

    const remoteParticipants = Array.from(getRemoteParticipants(state).values());
    const assistants = remoteParticipants.filter((participant: IParticipant) =>
        conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTANT)
    );

    const getAssistant = () => {
        let result: IParticipant | undefined;

        assistants.forEach((remoteAssistant: IParticipant) => {
            remoteAssistant.icRoles?.forEach((role: ICRole) => {
                if (role.partner === localParticipant?.id) {
                    result = remoteAssistant;
                }
            });
        });

        return result;
    };

    return {
        _conference: conference,
        _visible: assistancePanelVisible,
        _iAmAssited: amIAssisted,
        _assistant: getAssistant()
    };
};

export default withStyles(styles)(connect(mapStateToProps)(AssistancePanel));
