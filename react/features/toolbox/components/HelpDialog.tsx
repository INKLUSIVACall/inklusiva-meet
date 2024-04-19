import React from 'react';
import { WithTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../app/types';
import { translate } from '../../base/i18n/functions';
import Dialog from '../../base/ui/components/web/Dialog';
import { toggleHelpDialogVisibility } from '../actions.web';


/**
 * The type of the React {@code Component} props
 */
interface IProps extends WithTranslation {

    /**
     * The visibility of the help dialog.
     */
    _helpDialogVisibility: boolean;
}

/* const useStyles = makeStyles()(() => {

}); */

const _onClose = () => {
    const dispatch = useDispatch();

    dispatch(toggleHelpDialogVisibility());
};

const HelpDialog = ({ _helpDialogVisibility }: IProps) => {
    // const { classes } = useStyles();

    if (_helpDialogVisibility) {
        return (
            <Dialog
                onClose = { _onClose }
                titleKey = 'toolbar.helpDialogTitle'>
                <iframe
                    src = 'https://www.google.de'
                    title = 'Test' />
            </Dialog>
        );
    }

    return (
        <></>
    );
};

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code ConnectedSettingsDialog} component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The props passed to the component.
 * @private
 * @returns {{
 *
 * }}
 */
function _mapStateToProps(state: IReduxState) {
    const { helpDialogVisibility } = state['features/toolbox'];

    return {
        _helpDialogVisibilit: helpDialogVisibility
    };
}

export default translate(connect(_mapStateToProps)(HelpDialog));
