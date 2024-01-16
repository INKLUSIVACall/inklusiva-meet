import { Theme } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { IReduxState } from '../../app/types';
import { getCurrentConference } from '../../base/conference/functions';
import { IC_ROLES } from '../../base/conference/icRoles';
import { IJitsiConference } from '../../base/conference/reducer';

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

const AssistancePanel = ({ classes, _conference, _visible }: IProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const _onClickRequestAssitance = () => {
        _conference?.addLocalICRole(IC_ROLES.ASSISTED);
        dispatch(hideAssistancePanel());
    };

    return _visible ? (
        <div className = { classes.assisteesPanel }>
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
    ) : null;
};

const mapStateToProps = (state: IReduxState) => {
    const conference = getCurrentConference(state);
    const assistancePanelVisible = state['features/inklusiva/rolematching'].assistancePanelVisible;

    return {
        _conference: conference,
        _visible: assistancePanelVisible
    };
};

export default withStyles(styles)(connect(mapStateToProps)(AssistancePanel));
