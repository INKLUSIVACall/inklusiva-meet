import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { getParticipantById } from '../../../base/participants/functions';
import { IParticipant } from '../../../base/participants/types';
import ContextMenuItemGroup from '../../../base/ui/components/web/ContextMenuItemGroup';
import {
    setFrequencyFilterSetting,
    setParticipantBrightness,
    setParticipantContrast,
    setParticipantOpacitySetting,
    setParticipantSaturation,
    setParticipantZoomLevel,
    setVolume
} from '../../../filmstrip/actions.web';
import {
    getParticipantsBrightnessByParticipantId,
    getParticipantsContrastByParticipantId,
    getParticipantsFrequencySettingByParticipantId,
    getParticipantsOpacityByParticipantId,
    getParticipantsSaturationByParticipantId,
    getParticipantsVolumeByParticipantId,
    getParticipantsZoomByParticipantId
} from '../../../filmstrip/functions.web';

import BrightnessSlider from './BrightnessSlider';
import ContrastSlider from './ContrastSlider';
import FrequencyFilterSlider from './FrequencyFilterSlider';
import OpacityAdjustSlider from './OpacityAdjustSlider';
import SaturationSlider from './SaturationSlider';
import VolumeSlider from './VolumeSlider';
import ZoomSlider from './ZoomSlider';

interface IProps {

    /**
     * Value of brightness slider.fo.
     */
    brightness?: number;

    /**
     * Value of contrast slider.
     */
    contrast?: number;

    /**
     * Value of frequency slider.
     */
    frequency?: number;

    /**
     * Value of opacity slider.
     */
    opacity?: number;

    /**
     * Participant reference.
     */
    participant?: IParticipant;

    /**
     * Participant-ID.
     */
    participantId: string;

    /**
     * Value of saturation slider.
     */
    saturation?: number;

    /**
     * Should sound controls be visisble or not.
     */
    soundControl: boolean;

    /**
     * Value of zoom slider.
     */
    volume?: number;

    /**
     * Value of zoom slider.
     */
    zoom?: number;
}

const VideoSettingsContextMenu = ({
    participant,
    opacity,
    soundControl,
    brightness,
    zoom,
    saturation,
    volume,
    contrast,
    frequency
}: IProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const _onVolumeChange = (value: number) => {
        if (participant) {
            dispatch(setVolume(participant.id, value));
        }
    };

    const _onFrequencyAdjustChange = (value: number) => {
        if (participant) {
            dispatch(setFrequencyFilterSetting(participant.id, value));
        }
    };

    const _onBrightnessChange = (value: number) => {
        if (participant) {
            dispatch(setParticipantBrightness(participant.id, value));
        }
    };

    const _onContrastChange = (value: number) => {
        if (participant) {
            dispatch(setParticipantContrast(participant.id, value));
        }
    };

    const _onParticipantOpacityAdjustChange = (value: number) => {
        if (participant) {
            dispatch(setParticipantOpacitySetting(participant.id, value));
        }
    };

    const _onSaturationChange = (value: number) => {
        if (participant) {
            dispatch(setParticipantSaturation(participant.id, value));
        }
    };

    const _onZoomLevelChange = (value: number) => {
        if (participant) {
            dispatch(setParticipantZoomLevel(participant.id, value));
        }
    };

    return (
        <>
            {soundControl && (
                <ContextMenuItemGroup>
                    <VolumeSlider
                        initialValue = { volume ?? 0 }
                        key = 'volume-slider'
                        label = { t('volumeSlider') }
                        onChange = { _onVolumeChange } />
                    <FrequencyFilterSlider
                        initialValue = { frequency ?? 0 }
                        key = 'frequency-adjust-slider'
                        label = { t('settings.audioSettings.highFrequencies') }
                        onChange = { _onFrequencyAdjustChange } />
                </ContextMenuItemGroup>
            )}
            <ContextMenuItemGroup>
                <ContrastSlider
                    initialValue = { contrast ?? 0 }
                    key = 'cotrast-slider'
                    label = { t('contrastSlider') }
                    onChange = { _onContrastChange } />
                <BrightnessSlider
                    initialValue = { brightness ?? 0 }
                    key = 'brightness-slider'
                    label = { t('brightnessSlider') }
                    onChange = { _onBrightnessChange } />
                <OpacityAdjustSlider
                    initialValue = { opacity ?? 0 }
                    key = 'opacity-adjust-slider'
                    label = { t('opacityAdjustSlider') }
                    onChange = { _onParticipantOpacityAdjustChange } />
                <SaturationSlider
                    initialValue = { saturation ?? 0 }
                    key = 'saturation-slider'
                    label = { t('saturationSlider') }
                    onChange = { _onSaturationChange } />
                <ZoomSlider
                    initialValue = { zoom ?? 0 }
                    key = 'zoom-slider'
                    label = { t('zoomSlider') }
                    onChange = { _onZoomLevelChange } />
            </ContextMenuItemGroup>
        </>
    );
};

const mapStateToProps = (state: IReduxState, ownProps: Partial<IProps>) => {
    const { participantId } = ownProps;
    const participant = getParticipantById(state, participantId ?? '');

    return {
        participant,
        brightness: participant ? getParticipantsBrightnessByParticipantId(state, participant?.id) : 0,
        contrast: participant ? getParticipantsContrastByParticipantId(state, participant?.id) : 0,
        saturation: participant ? getParticipantsSaturationByParticipantId(state, participant?.id) : 0,
        opacity: participant ? getParticipantsOpacityByParticipantId(state, participant?.id) : 0,
        zoom: participant ? getParticipantsZoomByParticipantId(state, participant?.id) : 0,
        frequency: participant ? getParticipantsFrequencySettingByParticipantId(state, participant?.id) : 0,
        volume: participant ? getParticipantsVolumeByParticipantId(state, participant?.id) : 0
    };
};

export default connect(mapStateToProps)(VideoSettingsContextMenu);
