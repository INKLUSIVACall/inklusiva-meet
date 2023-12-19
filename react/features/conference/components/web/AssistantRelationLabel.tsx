import React from 'react';

import { IconHandHoldingHand } from '../../../base/icons/svg';
import Label from '../../../base/label/components/web/Label';
import { COLORS } from '../../../base/label/constants';
import Tooltip from '../../../base/tooltip/components/Tooltip';

/*
const useStyles = makeStyles()(theme => {
    return {

    };
});
*/

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const AssistantRelationLabel = () => {

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
                    className = { 'test' }
                    color = { COLORS.white }
                    icon = { IconHandHoldingHand }
                    iconColor = '#fff'
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
                    className = { 'test' }
                    color = { COLORS.white }
                    icon = { IconHandHoldingHand }
                    iconColor = '#fff'
                    id = 'assistantRelationLabel'
                    text = { AssistedName } />
            </Tooltip>
        );
    }

    return null;
};

export default AssistantRelationLabel;
