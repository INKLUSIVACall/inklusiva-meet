import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import { IconVolumeUp } from '../../../base/icons/svg';
import { getUserVideoBrightnessValue } from '../../../inklusiva/uservideo/functions';

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

const BrightnessSlider = ({
    initialValue,
    label,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ brightness, setBrightness ] = useState((initialValue || 100));

    const _onBrightnessSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newBrightness = event.currentTarget.value;

        onChange(newBrightness);
        setBrightness(Number(newBrightness));
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('brightnessSlider') }
            className = { classes.bigContainer }>
            <div>{ label }</div>
            <div
                className = { cx('popupmenu__contents', classes.container) }
                onClick = { _onClick }>
                <span className = { classes.icon }>
                    <Icon
                        size = { 22 }
                        src = { IconVolumeUp } />
                </span>
                <div className = { classes.sliderContainer }>
                    <input
                        aria-label = { label }
                        aria-valuemax = { 200 }
                        aria-valuemin = { 100 }
                        aria-valuenow = { brightness }
                        className = { cx('popupmenu__volume-slider', classes.slider) }
                        max = { 200 }
                        min = { 100 }
                        onChange = { _onBrightnessSliderChange }
                        tabIndex = { 0 }
                        type = 'range'
                        value = { brightness } />
                </div>
                <br />
            </div>
        </div>
    );
};

export default BrightnessSlider;
