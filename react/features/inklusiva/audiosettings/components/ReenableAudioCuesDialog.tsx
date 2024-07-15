import React from 'react';
import { useDispatch } from 'react-redux';

import { translate } from '../../../base/i18n/functions';
import Dialog from '../../../base/ui/components/web/Dialog';
import { setAudioCuesEnabledState } from '../../userdata/actions';


const ReenableAudioCuesDialog = () => {
    const dispatch = useDispatch();

    const _onSubmit = () => {
        dispatch(setAudioCuesEnabledState(true));
    };

    return (
        <Dialog
            cancel = {{ translationKey: 'Nein' }}
            ok = {{ translationKey: 'Ja' }}
            // eslint-disable-next-line react/jsx-no-bind
            onSubmit = { _onSubmit }
            size = { 'medium' }
            titleKey = 'Hörbare Signale' >
            <div>
                <p>
                    Sollen die hörbare Signale wieder eingeschaltet werden?
                </p>
            </div>
        </Dialog>
    );

};


export default translate(ReenableAudioCuesDialog);
