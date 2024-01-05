import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import { IconNoiseSuppressionOn } from '../../../base/icons/svg';
import { inklusivaContextMenuStyles } from '../../../inklusiva/ui-constants';
import { FREQUENCY_FILTER_SLIDER_MAXIMUM, FREQUENCY_FILTER_SLIDER_MINIMUM } from '../../constants';

/**
 * The type of the React {@code Component} props of {@link FrequencyFilterSlider}.
 */
interface IProps {

    /**
     * The value of the frequency filter slider should display at when the
     * component first mounts. Changes will be stored in state. The value
     * should be an integer between 0 and 5.
     */
    initialValue: number;

    /**
     * Label for the Contrast Slider.
     */
    label: string;

    /**
     * The callback to invoke when the frequency filter slider value changes.
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

const FrequencyFilterSlider = ({
    initialValue,
    onChange,
    label
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ frequencySetting, setFrequencySetting ] = useState(initialValue);

    const _onFrequencyAdjustChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newFrequencySetting = Math.floor(Number(event.currentTarget.value));

        onChange(newFrequencySetting);
        setFrequencySetting(newFrequencySetting);
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('frequencyFilterSlider') }
            className = { cx('popupmenu__contents', classes.contextMenuSlider) }>
            <label className = { classes.contextMenuSliderLabel }>{ label }</label>
            <div
                className = { cx('popupmenu__contents', classes.contextMenuSliderInner) }
                onClick = { _onClick }>
                <span className = { classes.contextMenuSliderIcon }>
                    <Icon
                        size = { 22 }
                        src = { IconNoiseSuppressionOn } />
                </span>
                <input
                    aria-valuemax = { FREQUENCY_FILTER_SLIDER_MAXIMUM }
                    aria-valuemin = { FREQUENCY_FILTER_SLIDER_MINIMUM }
                    aria-valuenow = { frequencySetting }
                    max = { FREQUENCY_FILTER_SLIDER_MAXIMUM }
                    min = { FREQUENCY_FILTER_SLIDER_MINIMUM }
                    onChange = { _onFrequencyAdjustChange }
                    tabIndex = { 0 }
                    type = 'range'
                    value = { frequencySetting } />
            </div>
        </div>
    );
};

export default FrequencyFilterSlider;
