import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import { IconVolumeUp } from '../../../base/icons/svg';
import { inklusivaContextMenuStyles } from '../../../inklusiva/ui-constants';
import { VOLUME_SLIDER_SCALE } from '../../constants';

/**
 * The type of the React {@code Component} props of {@link VolumeSlider}.
 */
interface IProps {

    /**
     * The value of the audio slider should display at when the component first
     * mounts. Changes will be stored in state. The value should be a number
     * between 0 and 1.
     */
    initialValue: number;

    /**
     * Label for the Contrast Slider.
     */
    label: string;

    /**
     * The callback to invoke when the audio slider value changes.
     */
    onChange: Function;
}

const useStyles = makeStyles()(theme => {
    return {
        ...inklusivaContextMenuStyles(theme)
    };
});

const _onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
};

const VolumeSlider = ({
    initialValue,
    onChange,
    label
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ volumeLevel, setVolumeLevel ] = useState((initialValue || 0) * VOLUME_SLIDER_SCALE);

    const _onVolumeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolumeLevel = Number(event.currentTarget.value);

        onChange(newVolumeLevel / VOLUME_SLIDER_SCALE);
        setVolumeLevel(newVolumeLevel);
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('volumeSlider') }
            className = { classes.contextMenuSlider }>
            <label className = { classes.contextMenuSliderLabel }>{ label }</label>
            <div
                className = { cx('popupmenu__contents', classes.contextMenuSliderInner) }
                onClick = { _onClick }>
                <span className = { classes.contextMenuSliderIcon }>
                    <Icon
                        size = { 22 }
                        src = { IconVolumeUp } />
                </span>
                <input
                    aria-valuemax = { VOLUME_SLIDER_SCALE }
                    aria-valuemin = { 1 }
                    aria-valuenow = { volumeLevel }
                    max = { VOLUME_SLIDER_SCALE }
                    min = { 1 }
                    onChange = { _onVolumeChange }
                    tabIndex = { 0 }
                    type = 'range'
                    value = { volumeLevel } />
            </div>
        </div>
    );
};

export default VolumeSlider;
