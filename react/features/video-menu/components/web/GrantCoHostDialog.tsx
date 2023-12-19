import React from 'react';
import { connect } from 'react-redux';

import { translate } from '../../../base/i18n/functions';
import Dialog from '../../../base/ui/components/web/Dialog';
import AbstractGrantCoHostDialog, { abstractMapStateToProps } from '../AbstractGrantCoHostDialog';

/**
 * Dialog to confirm a grant moderator action.
 */
class GrantCoHostDialog extends AbstractGrantCoHostDialog {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Dialog
                ok = {{ translationKey: 'dialog.Yes' }}
                onSubmit = { this._onSubmit }
                titleKey = 'dialog.grantCoModeratorTitle'>
                <div>
                    { this.props.t('dialog.grantCoModeratorDialog', { participantName: this.props.participantName }) }
                </div>
            </Dialog>
        );
    }

    _onSubmit: () => boolean;
}

export default translate(connect(abstractMapStateToProps)(GrantCoHostDialog));
