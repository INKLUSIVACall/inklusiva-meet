import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';

import Icon from '../../../base/icons/components/Icon';
import {
    IconVolumeUp,
    IconContrast
} from '../../../base/icons/svg';

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

const ContrastSlider = ({
    initialValue,
    label,
    onChange
}: IProps) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();

    const [ contrast, setContrast ] = useState((initialValue || 1) * 100);

    const _onContrastSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newContrast = event.currentTarget.value;

        onChange(newContrast);
        setContrast(Number(newContrast));
    }, [ onChange ]);

    return (
        <div
            aria-label = { t('contrastSlider') }
            className = { classes.bigContainer }>
            <div>{ label }</div>
            <div
                className = { cx('popupmenu__contents', classes.container) }
                onClick = { _onClick }>
                <span className = { classes.icon }>
                    <Icon
                        size = { 22 }
                        src = { IconContrast } />
                </span>
                <div className = { classes.sliderContainer }>
                    <input
                        aria-label = { label }
                        aria-valuemax = { 150 }
                        aria-valuemin = { 50 }
                        aria-valuenow = { contrast }
                        className = { cx('popupmenu__volume-slider', classes.slider) }
                        max = { 150 }
                        min = { 50 }
                        onChange = { _onContrastSliderChange }
                        tabIndex = { 0 }
                        type = 'range'
                        value = { contrast } />
                </div>
                <br />
            </div>
        </div>
    );
};

export default ContrastSlider;
