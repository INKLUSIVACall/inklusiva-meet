import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useState } from 'react';
import { FocusOn } from 'react-focus-on';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';

import { IReduxState } from '../../app/types';
import { getCurrentConference } from '../../base/conference/functions';
import { ICRole, IC_ROLES } from '../../base/conference/icRoles';
import { IJitsiConference } from '../../base/conference/reducer';
import { getLocalParticipant, getRemoteParticipants, isParticipantModerator } from '../../base/participants/functions';
import { IJitsiParticipant, IParticipant } from '../../base/participants/types';
import { isElementInTheViewport } from '../../base/ui/functions.web';

import { getParticipant } from './functions';

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
        },
        divider: {
            borderStyle: 'dashed',
            marginBottom: '1.2rem',
            marginTop: '1.2rem'
        },
        focusLock: {
            zIndex: 1
        }
    };
};

interface IProps {

    /**
     * Participant who needs assistance from local participant.
     */
    _assistancePartner: IParticipant[];

    /**
     * List of assistees.
     */
    _assistees: IParticipant[];

    /**
     * JitsiConference instance.
     */
    _conference?: IJitsiConference;

    /**
     * Displayes if loal participant is moderator.
     */
    _isLocalParticipantModerator: boolean;

    /**
     * The local participant.
     */
    _localParticipant?: IParticipant;

    /**
     * The participant to show the Assistees Panel.
     */
    _participant?: IParticipant;

    /**
     * Should the panel be visible or not.
     */
    _visible: boolean;

    /**
     * CSS classes object.
     */
    classes: any;
}

const AssisteesPanel = ({
    classes,
    _assistancePartner,
    _assistees,
    _conference,
    _localParticipant,
    _participant,
    _visible,
    _isLocalParticipantModerator
}: IProps) => {
    const { t } = useTranslation();

    const [ localClose, setLocalClose ] = useState(false);

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

    const _onClickClose = () => {
        setLocalClose(true);
        _assistancePartner?.forEach(partner => {
            _conference?.removeICRole(partner.id, IC_ROLES.ASSISTED, _localParticipant?.id);
        });
    };

    let isAssistancePartner = false;

    _assistancePartner.forEach(partner => {
        if (_conference?.checkMemberHasRole(partner.id, IC_ROLES.ASSISTED, _localParticipant?.id)) {
            isAssistancePartner = true;
        }
    });

    const showDialog = _visible && !localClose && isAssistancePartner;

    return showDialog ? (
        <FocusOn
            className = { classes.focusLock }
            returnFocus = {

                // If we return the focus to an element outside the viewport the page will scroll to
                // this element which in our case is undesirable and the element is outside of the
                // viewport on purpose (to be hidden). For example if we return the focus to the toolbox
                // when it is hidden the whole page will move up in order to show the toolbox. This is
                // usually followed up with displaying the toolbox (because now it is on focus) but
                // because of the animation the whole scenario looks like jumping large video.
                isElementInTheViewport
            }>
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
                <h1
                    className = { classes.headline }
                    id = 'assisteesHeadline'>
                    {t('assisteesPanel.headline')}
                </h1>
                <p className = { classes.description }>{t('assisteesPanel.desc1')}</p>
                <p className = { classes.description }>{t('assisteesPanel.desc2')}</p>
                <hr className = { classes.divider } />
                <ul className = { classes.list }>{_assistees.map((data: any, i: number) => _renderAssistees(data, i))}</ul>
            </div>
        </FocusOn>
    ) : null;
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

    const assistancePartner = participants.filter((participant: IParticipant) =>
        conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTED, localParticipant?.id)
    );

    return {
        _assistancePartner: assistancePartner,
        _assistees: nonAssistet ?? [],
        _conference: conference,
        _isLocalParticipantModerator: isParticipantModerator(localParticipant),
        _localParticipant: localParticipant,
        _participant: getParticipant(state),
        _remoteParticipants: remoteParticipants,
        _visible: nonAssistet.length > 0
    };
};

export default withStyles(styles)(connect(mapStateToProps)(AssisteesPanel));
