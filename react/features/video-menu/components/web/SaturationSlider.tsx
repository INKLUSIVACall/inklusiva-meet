import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import {
    IconVolumeUp,
    IconSaturation
} from '../../../base/icons/svg';
import { getUserVideoSaturationValue } from '../../../inklusiva/uservideo/functions';

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
        bigContainer: {
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 16px',

            '&:hover': {
                backgroundColor: theme.palette.ui02
            }
        },

        container: {
            minHeight: '40px',
            minWidth: '180px',
            width: '100%',
            boxSizing: 'border-box',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
        },

        icon: {
            minWidth: '20px',
            marginRight: '16px',
            position: 'relative'
        },

        sliderContainer: {
            position: 'relative',
            width: '100%'
        },

        slider: {
            position: 'absolute',
            width: '100%',
            top: '50%',
            transform: 'translate(0, -50%)'
        }
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

    const [ saturation, setSaturation ] = useState((initialValue || 1) * 100);

    const _onSaturationSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newSaturation = event.currentTarget.value;

        onChange(newSaturation);
        setSaturation(Number(newSaturation));
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('saturationSlider') }
            className = { classes.bigContainer }>
            <div>{ label }</div>
            <div
                className = { cx('popupmenu__contents', classes.container) }
                onClick = { _onClick }>
                <span className = { classes.icon }>
                    <Icon
                        size = { 22 }
                        src = { IconSaturation } />
                </span>
                <div className = { classes.sliderContainer }>
                    <input
                        aria-label = { label }
                        aria-valuemax = { 150 }
                        aria-valuemin = { 50 }
                        aria-valuenow = { saturation }
                        className = { cx('popupmenu__volume-slider', classes.slider) }
                        max = { 150 }
                        min = { 50 }
                        onChange = { _onSaturationSliderChange }
                        tabIndex = { 0 }
                        type = 'range'
                        value = { saturation } />
                </div>
                <br />
            </div>
        </div>
    );
};

export default SaturationSlider;
