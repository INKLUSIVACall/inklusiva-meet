import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { getCurrentConference } from '../../../base/conference/functions';
import { ICRole, IC_ROLES } from '../../../base/conference/icRoles';
import { IJitsiConference } from '../../../base/conference/reducer';
import { translate } from '../../../base/i18n/functions';
import { IconCloseLarge } from '../../../base/icons/svg';
import {
    getLocalParticipant,
    getRemoteParticipants,
    isParticipantModerator
} from '../../../base/participants/functions';
import { IParticipant } from '../../../base/participants/types';
import Button from '../../../base/ui/components/web/Button';
import ClickableIcon from '../../../base/ui/components/web/ClickableIcon';
import { toggleAssistancePanel } from '../../../inklusiva/rolematching/functions';
import { toggleRoleMatchingPanel } from '../../actions.web';
import { getRoleMatchingPanelVisibility } from '../../functions.web';

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
        headline: {
            fontSize: '1.5rem',
            color: theme.palette.text01,
            marginBottom: theme.spacing(3),
            marginTop: 0,
            marginRight: theme.spacing(3)
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
        }
    };
};

interface IProps extends WithTranslation {

    /**
     * The assistant.
     */
    _assistant?: IParticipant;

    /**
     * JitsiConference instance.
     */
    _conference?: IJitsiConference;

    _iAmAssistant: boolean;

    /**
     * Wether I am assisted or not.
     */
    _iAmAssisted: boolean;

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

const AssistanceParticipantsPanel = ({
    classes,
    _conference,
    _localParticipant,
    _participant,
    _participantsList,
    _visible,
    _iAmAssistant,
    _iAmAssisted,
    t
}: IProps) => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(toggleRoleMatchingPanel());
    };

    const onClickRequest = (participant: IParticipant) => {
        dispatch(toggleAssistancePanel(participant));
        dispatch(toggleRoleMatchingPanel());
    };

    const onClickRelease = () => {
        _conference?.removeLocalICRole(IC_ROLES.ASSISTED, _participant?.id);
        if (_localParticipant) {
            _conference?.removeICRole(_participant?.id, IC_ROLES.ASSISTANT, _localParticipant.id);
        }
        dispatch(toggleRoleMatchingPanel());
    };

    if (_visible) {
        return (
            <div
                aria-modal = 'true'
                className = { classes.assisteesPanel }
                role = 'dialog'>
                <div className = { classes.header }>
                    <h1 className = { classes.headline }>{t('toolbar.assistanceParticipantsHeader')}</h1>
                    <ClickableIcon
                        accessibilityLabel = { t('dialog.accessibilityLabel.close') }
                        icon = { IconCloseLarge }
                        id = 'modal-header-close-button'
                        onClick = { onClose } />
                </div>
                <div className = { classes.inputblockContainer }>
                    {!_iAmAssisted
                        && _participantsList.length > 0
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
                                    onClick = { () => onClickRequest(participant) } />
                            </div>
                        ))}
                    {!_iAmAssisted && (_participantsList.length <= 0 || _iAmAssistant) && (
                        <div className = { classes.inputblock }>
                            <div className = { classes.inputDescription }>
                                {t('toolbar.assistanceParticipantsListEmpty')}
                            </div>
                        </div>
                    )}
                    {_iAmAssisted && (
                        <div className = { classes.inputblock }>
                            <Button
                                accessibilityLabel = { t('toolbar.accessibilityLabel.releaseAssistance') }
                                className = { classes.inputButton }
                                label = { t('toolbar.releaseAssistance') }
                                onClick = { onClickRelease } />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return <></>;
};

const mapStateToProps = (state: IReduxState) => {
    const conference = getCurrentConference(state);
    const localParticipant = getLocalParticipant(state);
    const remoteParticipants = Array.from(getRemoteParticipants(state).values());
    const participantToRequestFrom = state['features/inklusiva/rolematching'].participant;

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
        .filter((participant: IParticipant) => !conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTANT)) // no assistants
        .filter((participant: IParticipant) => !conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTED)) // no assistees
        .filter((participant: IParticipant) => !isParticipantModerator(participant)); // no moderators

    return {
        _conference: conference,
        _iAmAssistant: amIAssistant,
        _iAmAssisted: amIAssisted,
        _localParticipant: localParticipant,
        _participant: participantToRequestFrom,
        _participantsList: remoteParticipantsList,
        _visible: getRoleMatchingPanelVisibility(state)
    };
};

export default withStyles(styles)(translate(connect(mapStateToProps)(AssistanceParticipantsPanel)));
