import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import {
    IconContrast
} from '../../../base/icons/svg';
import { inklusivaContextMenuStyles } from '../../../inklusiva/ui-constants';
import { CONTRAST_SLIDER_MAXIMUM, CONTRAST_SLIDER_MINIMUM } from '../../constants';

/**
 * The type of the React {@code Component} props of {@link OpacityAdjustSlider}.
 */
interface IProps {

    /**
     * The value of the Contrast Slider.
     */
    initialValue: number;

    /**
     * Label for the Contrast Slider.
     */
    label: string;

    /**
     * The callback to invoke when the Contrast Slider value changes.
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

const ContrastSlider = ({
    initialValue,
    label,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ contrast, setContrast ] = useState(initialValue || 1);

    const _onContrastSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newContrast = event.currentTarget.value;

        onChange(newContrast);
        setContrast(Number(newContrast));
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('contrastSlider') }
            className = { classes.contextMenuSlider }>
            <label className = { classes.contextMenuSliderLabel } htmlFor = 'contrast-slider-input'>{ label }</label>
            <div
                className = { cx('popupmenu__contents', classes.contextMenuSliderInner) }
                onClick = { _onClick }>
                <span className = { classes.contextMenuSliderIcon }>
                    <Icon
                        size = { 22 }
                        src = { IconContrast } />
                </span>
                <input
                    aria-label = { label }
                    id = 'contrast-slider-input'
                    aria-valuemax = { CONTRAST_SLIDER_MAXIMUM }
                    aria-valuemin = { CONTRAST_SLIDER_MINIMUM }
                    aria-valuenow = { contrast }
                    max = { CONTRAST_SLIDER_MAXIMUM }
                    min = { CONTRAST_SLIDER_MINIMUM }
                    onChange = { _onContrastSliderChange }
                    tabIndex = { 0 }
                    type = 'range'
                    value = { contrast } />
            </div>
        </div>
    );
};

export default ContrastSlider;
