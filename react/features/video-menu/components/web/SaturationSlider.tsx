import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import {
    IconSaturation
} from '../../../base/icons/svg';
import { inklusivaContextMenuStyles } from '../../../inklusiva/ui-constants';
import { SATURATION_SLIDER_MAXIMUM, SATURATION_SLIDER_MINIMUM } from '../../constants';

/**
 * The type of the React {@code Component} props of {@link OpacityAdjustSlider}.
 */
interface IProps {

    /**
     * The value of the Saturation Slider.
     */
    initialValue: number;

    /**
     * Label for the Saturation Slider.
     */
    label: string;

    /**
     * The callback to invoke when the Saturation Slider value changes.
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

const SaturationSlider = ({
    initialValue,
    label,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ saturation, setSaturation ] = useState(initialValue || 1);

    const _onSaturationSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newSaturation = event.currentTarget.value;

        onChange(newSaturation);
        setSaturation(Number(newSaturation));
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('saturationSlider') }
            className = { classes.contextMenuSlider }>
            <label className = { classes.contextMenuSliderLabel } htmlFor = 'saturation-slider-input'>{ label }</label>
            <div
                className = { cx('popupmenu__contents', classes.contextMenuSliderInner) }
                onClick = { _onClick }>
                <span className = { classes.contextMenuSliderIcon }>
                    <Icon
                        size = { 22 }
                        src = { IconSaturation } />
                </span>
                <input
                    aria-label = { label }
                    id = 'saturation-slider-input'
                    aria-valuemax = { SATURATION_SLIDER_MAXIMUM }
                    aria-valuemin = { SATURATION_SLIDER_MINIMUM }
                    aria-valuenow = { saturation }
                    max = { SATURATION_SLIDER_MAXIMUM }
                    min = { SATURATION_SLIDER_MINIMUM }
                    onChange = { _onSaturationSliderChange }
                    tabIndex = { 0 }
                    type = 'range'
                    value = { saturation } />
            </div>
        </div>
    );
};

export default SaturationSlider;
