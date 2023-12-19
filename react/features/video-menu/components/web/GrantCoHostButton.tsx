import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { openDialog } from '../../../base/dialog/actions';
import { IconModerator } from '../../../base/icons/svg';
import { PARTICIPANT_ROLE } from '../../../base/participants/constants';
import { getLocalParticipant, getParticipantById, isParticipantModerator, isParticipantHost, isParticipantCoHost } from '../../../base/participants/functions';
import ContextMenuItem from '../../../base/ui/components/web/ContextMenuItem';
import { NOTIFY_CLICK_MODE } from '../../../toolbox/constants';
import { IButtonProps } from '../../types';

import GrantCoHostDialog from './GrantCoHostDialog';
import { IC_ROLES } from '../../../base/conference/icRoles';

/**
 * Implements a React {@link Component} which displays a button for granting
 * Co Host to a participant.
 *
 * @returns {JSX.Element|null}
 */
const GrantCoHostButton = ({
    notifyClick,
    notifyMode,
    participantID
}: IButtonProps): JSX.Element | null => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const localParticipant = useSelector(getLocalParticipant);

    const targetParticipant = useSelector((state: IReduxState) => getParticipantById(state, participantID));
    const visible = useMemo(() => Boolean(localParticipant?.role === PARTICIPANT_ROLE.MODERATOR)
        && !isParticipantCoHost(targetParticipant) && !isParticipantHost(targetParticipant), [ isParticipantCoHost, isParticipantHost, localParticipant, targetParticipant ]);

    const handleClick = useCallback(() => {
        notifyClick?.();
        if (notifyMode === NOTIFY_CLICK_MODE.PREVENT_AND_NOTIFY) {
            return;
        }
        dispatch(openDialog(GrantCoHostDialog, { participantID }));
    }, [ dispatch, notifyClick, notifyMode, participantID ]);

    if (!visible) {
        return null;
    }

    return (
        <ContextMenuItem
            accessibilityLabel = { t('toolbar.accessibilityLabel.grantCoModerator') }
            className = 'grantcomoderatorlink'
            icon = { IconModerator }
            onClick = { handleClick }
            text = { t('videothumbnail.grantCoModerator') } />
    );
};

export default GrantCoHostButton;
