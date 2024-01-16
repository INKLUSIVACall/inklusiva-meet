import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { IReduxState } from '../../app/types';
import { getCurrentConference } from '../../base/conference/functions';
import { ICRole, IC_ROLES } from '../../base/conference/icRoles';
import { IJitsiConference } from '../../base/conference/reducer';
import { getLocalParticipant, getRemoteParticipants } from '../../base/participants/functions';
import { IParticipant } from '../../base/participants/types';

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
        headline: {
            fontSize: '1.5rem',
            color: theme.palette.text01,
            marginBottom: theme.spacing(3)
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
            alignSelf: 'center'
        }
    };
};

interface IProps {

    /**
     * List of assistees.
     */
    _assistees: IParticipant[];

    /**
     * JitsiConference instance.
     */
    _conference?: IJitsiConference;

    /**
     * Should the panel be visible or not.
     */
    _visible: boolean;

    /**
     * CSS classes object.
     */
    classes: any;
}

const AssisteesPanel = ({ classes, _assistees, _conference, _visible }: IProps) => {
    const { t } = useTranslation();

    const _renderAssistees = (data: any, i: number) => {
        const _onClickOfferAssistance = () => {
            _conference?.addLocalICRole(IC_ROLES.ASSISTANT, data.participantId);
        };

        return (
            <li key = { i }>
                <div className = { classes.participantEntry }>
                    <div className = { classes.participantName }>{data.name}</div>
                    <div>
                        <button
                            className = { [ classes.participantButton, 'primary' ].join(' ') }
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick = { _onClickOfferAssistance }>
                            {t('assisteesPanel.buttonAssist')}
                        </button>
                    </div>
                </div>
            </li>
        );
    };

    return (
        _visible ? (
            <div className = { classes.assisteesPanel }>
                <h1 className = { classes.headline }>{t('assisteesPanel.headline')}</h1>
                <p className = { classes.description }>{t('assisteesPanel.desc1')}</p>
                <p className = { classes.description }>{t('assisteesPanel.desc2')}</p>
                <ul className = { classes.list }>
                    {_assistees.map((data: any, i: number) => _renderAssistees(data, i))}
                </ul>
            </div>
        ) : null
    );
};

const mapStateToProps = (state: IReduxState) => {
    const conference = getCurrentConference(state);
    const remoteParticipants = getRemoteParticipants(state);
    const localParticipant = getLocalParticipant(state);
    const participants = Array.from(remoteParticipants?.values() ?? []);

    participants.push(localParticipant as IParticipant);

    const alreadyAssisted: Array<string> = participants
        .filter(participant => conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTANT))
        .reduce((acc: string[], participant) => {
            conference?.getMemberICRoles(participant.id).forEach((role: ICRole) => {
                if (role.name === IC_ROLES.ASSISTANT) {
                    if (role.partner !== null) {
                        acc.push(role.partner);
                    }
                }
            });

            return acc;
        }, []);

    // Get list of users seeking assistances
    const nonAssistet = participants
        .filter((participant: IParticipant) => participant.id !== localParticipant?.id)
        .filter((participant: IParticipant) => !conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTANT))
        .filter((participant: IParticipant) => conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTED))
        .filter((participant: IParticipant) => !alreadyAssisted.includes(participant.id))
        .map((participant: IParticipant) => {
            return {
                id: participant.id,
                name: participant.name,
                participantId: participant.id
            };
        });

    return {
        _assistees: nonAssistet ?? [],
        _conference: conference,
        _visible: nonAssistet.length > 0
    };
};

export default withStyles(styles)(connect(mapStateToProps)(AssisteesPanel));
