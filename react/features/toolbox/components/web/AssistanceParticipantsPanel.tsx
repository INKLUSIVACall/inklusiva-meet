import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { WithTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { getCurrentConference } from '../../../base/conference/functions';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { IJitsiConference } from '../../../base/conference/reducer';
import { getRemoteParticipants, isParticipantModerator } from '../../../base/participants/functions'; 
import { IParticipant } from '../../../base/participants/types'; 

import { getRoleMatchingPanelVisibility } from '../../functions.web';
import Button from '../../../base/ui/components/web/Button';
import { translate } from '../../../base/i18n/functions';
import { toggleAssistancePanel } from '../../../inklusiva/rolematching/functions';
import { toggleRoleMatchingPanel } from '../../actions.web';
import ClickableIcon from '../../../base/ui/components/web/ClickableIcon';
import { IconCloseLarge } from '../../../base/icons/svg';

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
            boxSizing: 'border-box',
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
            flexDirection: 'column',
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

    /**
     * Wether I am assisted or not.
     */
    _iAmAssited: boolean;
    
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

const AssistanceParticipantsPanel = ({ classes, _conference, _participant, _participantsList, _visible, _iAmAssited, _assistant, t }: IProps) => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(toggleRoleMatchingPanel());
    };

    const onClick = (participant: IParticipant) => {
        dispatch(toggleAssistancePanel(participant));
        dispatch(toggleRoleMatchingPanel())
    }

    if (_visible) {
        return (
            <div
                aria-modal = 'true'
                className = { classes.assisteesPanel }
                role = 'dialog'>
                <div className = { classes.header }>
                    <h1 className = { classes.headline }>
                        { t('toolbar.assistanceParticipantsHeader') }
                    </h1>
                    <ClickableIcon
                        accessibilityLabel = { t('dialog.accessibilityLabel.close') }
                        icon = { IconCloseLarge }
                        id = 'modal-header-close-button'
                        onClick = { onClose } />
                </div>
                <div className = { classes.inputblockContainer }>
                    { _participantsList.length > 0 && _participantsList.map(participant => (
                        <div key = { participant.id } className = { classes.inputblock }>
                            <div className = { classes.inputDescription }>{ participant.name }</div>
                            <Button
                                accessibilityLabel = { t('toolbar.accessibility.assistanceRequest')}
                                className = { classes.inputButton }
                                label = { t('toolbar.assistanceRequest') }
                                onClick = { () => onClick(participant) }/>
                        </div>
                    )) }
                    { _participantsList.length == 0 && (
                        <div className = { classes.inputblock }>
                            <div className = { classes.inputDescription }>{ t('toolbar.assistanceParticipantsListEmpty') }</div>
                        </div>
                    ) }
                </div>                
            </div>
        );
    }

    return null;
};

const mapStateToProps = (state: IReduxState) => {
    const conference = getCurrentConference(state);
    const remoteParticipants = Array.from(getRemoteParticipants(state).values());

    const remoteParticipantsList = remoteParticipants                                                                // no local participants
        .filter((participant: IParticipant) => !conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTANT))  // no assistants
        .filter((participant: IParticipant) => !conference?.checkMemberHasRole(participant.id, IC_ROLES.ASSISTED))   // no assistees
        .filter((participant: IParticipant) => !isParticipantModerator(participant));                                // no moderators

    return {
        _conference: conference,
        _participantsList: remoteParticipantsList,
        _visible: getRoleMatchingPanelVisibility(state)
    }
};

export default withStyles(styles)(translate(connect(mapStateToProps)(AssistanceParticipantsPanel)));
