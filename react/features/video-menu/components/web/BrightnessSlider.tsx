import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import {
    IconBrightness
} from '../../../base/icons/svg';
import { inklusivaContextMenuStyles } from '../../../inklusiva/ui-constants';
import { BRIGHTNESS_SLIDER_MAXIMUM, BRIGHTNESS_SLIDER_MINIMUM } from '../../constants';

/**
 * The type of the React {@code Component} props of {@link OpacityAdjustSlider}.
 */
interface IProps {

    /**
     * The value of the Brightness Slider.
     */
    initialValue: number;

    /**
     * Label for the BrightnessSlider.
     */
    label: string;

    /**
     * The callback to invoke when the Brightness Slider value changes.
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

const BrightnessSlider = ({
    initialValue,
    label,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ brightness, setBrightness ] = useState(initialValue || 100);

    const _onBrightnessSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newBrightness = event.currentTarget.value;

        onChange(newBrightness);
        setBrightness(Number(newBrightness));

    }, [ onChange ]);

    return (
        <div
            aria-label = { t('brightnessSlider') }
            className = { classes.contextMenuSlider }>
            <label className = { classes.contextMenuSliderLabel } htmlFor = 'brightness-slider-input'>{ label }</label>
            <div
                className = { cx('popupmenu__contents', classes.contextMenuSliderInner) }
                onClick = { _onClick }>
                <span className = { classes.contextMenuSliderIcon }>
                    <Icon
                        size = { 22 }
                        src = { IconBrightness } />
                </span>
                <input
                    aria-label = { label }
                    id = 'brightness-slider-input'
                    aria-valuemax = { BRIGHTNESS_SLIDER_MAXIMUM }
                    aria-valuemin = { BRIGHTNESS_SLIDER_MINIMUM }
                    aria-valuenow = { brightness }
                    max = { BRIGHTNESS_SLIDER_MAXIMUM }
                    min = { BRIGHTNESS_SLIDER_MINIMUM }
                    onChange = { _onBrightnessSliderChange }
                    tabIndex = { 0 }
                    type = 'range'
                    value = { brightness } />
            </div>
        </div>
    );
};

export default BrightnessSlider;
