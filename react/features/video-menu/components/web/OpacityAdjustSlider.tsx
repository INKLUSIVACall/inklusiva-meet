import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import {
    IconDimming
} from '../../../base/icons/svg';
import { inklusivaContextMenuStyles } from '../../../inklusiva/ui-constants';
import { OPACITY_SLIDER_MAXIMUM, OPACITY_SLIDER_MINIMUM } from '../../constants';

/**
 * The type of the React {@code Component} props of {@link OpacityAdjustSlider}.
 */
interface IProps {

    /**
     * The value of the frequency filter slider should display at when the
     * component first mounts. Changes will be stored in state. The value
     * should be an integer between 0 and 5.
     */
    initialValue: number;

    /**
     * Label of the Opacity Slider.
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

const OpacityAdjustSlider = ({
    initialValue,
    label,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ opacity, setOpacity ] = useState(initialValue);

    const _onFrequencyAdjustChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = event.currentTarget.value;

        onChange(newOpacity);
        setOpacity(Number(newOpacity));
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('opacityAdjustSlider') }
            className = { classes.contextMenuSlider }>
            <label className = { classes.contextMenuSliderLabel } for = {label }>{ label }</label>
            <div
                className = { cx('popupmenu__contents', classes.contextMenuSliderInner) }
                onClick = { _onClick }>
                <span className = { classes.contextMenuSliderIcon }>
                    <Icon
                        size = { 22 }
                        src = { IconDimming } />
                </span>
                <input
                    aria-label = { label }
                    id = {label }
                    aria-valuemax = { OPACITY_SLIDER_MAXIMUM }
                    aria-valuemin = { OPACITY_SLIDER_MINIMUM }
                    aria-valuenow = { opacity }
                    max = { OPACITY_SLIDER_MAXIMUM }
                    min = { OPACITY_SLIDER_MINIMUM }
                    onChange = { _onFrequencyAdjustChange }
                    tabIndex = { 0 }
                    type = 'range'
                    value = { opacity } />
            </div>
        </div>
    );
};

export default OpacityAdjustSlider;
