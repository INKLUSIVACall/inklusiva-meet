import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { IC_ROLES } from '../../../base/conference/icRoles';
import { openDialog } from '../../../base/dialog/actions';
import { IconGear } from '../../../base/icons/svg';
import Button from '../../../base/ui/components/web/Button';
import { BUTTON_TYPES } from '../../../base/ui/constants.any';
import TranscriptLinkDialog from '../../../inklusiva/transcription/components/TranscriptLinkDialog';

import { translate } from '../../../base/i18n/functions';
import { WithTranslation } from 'react-i18next';

const useStyles = makeStyles()(() => {
    return {
        transcriptionLinkLabelForCaptioner: {
            pointerEvents: 'auto'
        }
    };
});

interface IProps extends WithTranslation {

    _isCaptioner: boolean;
}

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const TranscriptLinkEdit = ({
    _isCaptioner,
    t
}: IProps
) => {
    const { classes } = useStyles();

    const conference = useSelector((state: IReduxState) => state['features/base/conference'].conference);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(openDialog(TranscriptLinkDialog, { conference }));
    };

    if (_isCaptioner) {
        return (
            <Button
                accessibilityLabel = { t('transcribing.accessibility.editTranscriptLink') }
                className = { 'infobarButton ml-05 mr-05' }
                icon = { IconGear }
                label = { t('transcribing.editTranscriptLink') }
                // eslint-disable-next-line react/jsx-no-bind
                onClick = { onClick }
                size = 'small'
                type = { BUTTON_TYPES.SECONDARY } />
        );
    }

    return null;

};

const mapStateToProps = (state: IReduxState) => {
    return {
        _isCaptioner: state['features/base/conference'].conference?.checkLocalHasRole(IC_ROLES.CAPTIONER)
    };
};

export default translate(connect(mapStateToProps)(TranscriptLinkEdit));
