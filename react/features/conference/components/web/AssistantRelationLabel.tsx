import React from 'react';
import { useSelector } from 'react-redux';

import { IconHandHoldingHand } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(theme => {
    return {
        assistantRelationLabel: {
            backgroundColor: 'transparent',
            borderColor: 'transparent'
        }
    };
});

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const AssistantRelationLabel = () => {
    // const subject = useSelector(getConferenceName);
    const { classes } = useStyles();

    const { conference } = useSelector(state => state['features/base/conference']);

    // const isCarer = conference.checkLocalHasRole(IC_ROLES.ASSISTANT);
    // const isCaree = conference.checkLocalHasRole(IC_ROLES.ASSISTED);

    const hasAssistant = true;
    const AssistantName = 'Assistant';

    const hasAssisted = false;
    const AssistedName = 'Assisted';

    if (hasAssistant) {
        return (
            <Tooltip
                content = { `${AssistantName} ist deine Begleitperson` }
                position = 'bottom'>
                <Label
                    accessibilityText = { `${AssistantName} ist deine Begleitperson` }
                    className = { classes.assistantRelationLabel }
                    icon = { IconHandHoldingHand }
                    iconColor = '#fff'
                    iconSize = { '24' }
                    id = 'assistantRelationLabel'
                    text = { AssistantName } />
            </Tooltip>
        );
    }

    if (hasAssisted) {
        return (
            <Tooltip
                content = { `${AssistedName} ist deine Begleitperson` }
                position = 'bottom'>
                <Label
                    accessibilityText = { `${AssistedName} ist deine Begleitperson` }
                    className = { classes.assistantRelationLabel }
                    color = { COLORS.white }
                    icon = { IconHandHoldingHand }
                    iconColor = '#fff'
                    iconSize = { '24' }
                    id = 'assistantRelationLabel'
                    text = { AssistedName } />
            </Tooltip>
        );
    }

    return null;
};

export default AssistantRelationLabel;
